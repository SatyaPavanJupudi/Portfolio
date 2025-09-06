'use strict';

// Netlify Function: Handles Netlify Forms submission-created event.
// Sends confirmation email to the user and a copy to the site owner.
// Providers: Gmail (preferred when configured) or Resend (fallback).

const RESEND_API = 'https://api.resend.com/emails';

async function sendWithResend({ to, from, subject, html, replyTo }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('RESEND_API_KEY not configured; skipping Resend send.');
    return { skipped: true };
  }
  const res = await fetch(RESEND_API, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ to, from, subject, html, reply_to: replyTo }),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error('Resend send failed:', res.status, text);
    throw new Error('Email send failed');
  }
  return res.json();
}

async function sendWithGmail({ to, subject, html, replyTo }) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    console.warn('GMAIL_USER or GMAIL_APP_PASSWORD not configured; skipping Gmail send.');
    return { skipped: true };
  }
  const nodemailer = require('nodemailer');
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });
  const fromName = process.env.GMAIL_FROM_NAME || 'Portfolio';
  const info = await transporter.sendMail({
    from: `${fromName} <${user}>`,
    to,
    subject,
    html,
    replyTo,
  });
  return { ok: true, id: info.messageId };
}

function isOnboardingFrom(fromEmail) {
  return fromEmail.toLowerCase().endsWith('@resend.dev');
}

exports.handler = async (event) => {
  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const submission = (body && body.payload && body.payload.data) || {};

    const name = String(submission.name || '').trim();
    const email = String(submission.email || '').trim();
    const subject = String(submission.subject || '').trim() || 'Thanks for contacting us';
    const message = String(submission.message || '').trim();

    const ownerEmail = process.env.SITE_OWNER_EMAIL || '';
    const resendFrom = (process.env.SITE_FROM_EMAIL || 'onboarding@resend.dev').trim();
    const useGmail = Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);

    // Send confirmation to submitter
    if (email) {
      const html = `
        <div style="font-family:Inter,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:640px;margin:auto;padding:24px;">
          <h2>Hi ${name || 'there'},</h2>
          <p>Thanks for reaching out. We received your message and will get back to you soon.</p>
          <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />
          <p><strong>Your message:</strong></p>
          <p style="white-space:pre-wrap;">${message}</p>
          <p style="margin-top:24px;color:#64748b;font-size:12px;">This is an automated confirmation.</p>
        </div>
      `;
      if (useGmail) {
        await sendWithGmail({ to: email, subject, html, replyTo: ownerEmail || process.env.GMAIL_USER });
      } else if (!isOnboardingFrom(resendFrom)) {
        await sendWithResend({ to: email, from: resendFrom, subject, html, replyTo: ownerEmail || resendFrom });
      } else {
        console.info('Using Resend onboarding sender; skipping user confirmation until a domain is verified in Resend.');
      }
    }

    // Send copy to owner
    if (ownerEmail) {
      const html = `
        <div style="font-family:Inter,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:640px;margin:auto;padding:24px;">
          <h3>New contact submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space:pre-wrap;">${message}</p>
        </div>
      `;
      if (useGmail) {
        await sendWithGmail({ to: ownerEmail, subject: `Contact: ${subject}`, html, replyTo: email || process.env.GMAIL_USER });
      } else {
        await sendWithResend({ to: ownerEmail, from: resendFrom, subject: `Contact: ${subject}`, html, replyTo: email || undefined });
      }
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error('submission-created handler error', err);
    return { statusCode: 200, body: JSON.stringify({ ok: false }) };
  }
};
