// Netlify Function: Handles Netlify Forms submission-created event.
// Sends confirmation email to the user (via Resend) and optionally forwards to owner.
// Environment variables required (set in Netlify UI):
//   RESEND_API_KEY - API key from https://resend.com (free tier available)
//   SITE_OWNER_EMAIL - Your email address to receive a copy (optional)
//   SITE_FROM_EMAIL - Verified sender email in Resend (e.g., no-reply@yourdomain.com)

const RESEND_API = "https://api.resend.com/emails";

async function sendEmail({ to, from, subject, html }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not configured; skipping email send.");
    return { skipped: true };
  }
  const res = await fetch(RESEND_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ to, from, subject, html }),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error("Resend send failed:", res.status, text);
    throw new Error("Email send failed");
  }
  return res.json();
}

exports.handler = async (event) => {
  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const submission = body?.payload?.data || {};

    const name = String(submission.name || "").trim();
    const email = String(submission.email || "").trim();
    const subject = String(submission.subject || "").trim() || "Thanks for contacting us";
    const message = String(submission.message || "").trim();

    const fromEmail = process.env.SITE_FROM_EMAIL || "no-reply@example.com";
    const ownerEmail = process.env.SITE_OWNER_EMAIL;

    if (email) {
      const html = `
        <div style="font-family:Inter,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:640px;margin:auto;padding:24px;">
          <h2>Hi ${name || "there"},</h2>
          <p>Thanks for reaching out. We received your message and will get back to you soon.</p>
          <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />
          <p><strong>Your message:</strong></p>
          <p style="white-space:pre-wrap;">${message}</p>
          <p style="margin-top:24px;color:#64748b;font-size:12px;">This is an automated confirmation.</p>
        </div>
      `;
      await sendEmail({ to: email, from: fromEmail, subject, html });
    }

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
      await sendEmail({ to: ownerEmail, from: fromEmail, subject: `Contact: ${subject}`, html });
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error("submission-created handler error", err);
    return { statusCode: 200, body: JSON.stringify({ ok: false }) };
  }
};
