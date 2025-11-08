// Netlify Function: Handles Netlify Forms submission-created event.
// Sends confirmation email to the user and forwards to owner via Gmail
// Environment variables required (set in Netlify UI):
//   GMAIL_USER - Gmail address (e.g., jupudisatyapavan@gmail.com)
//   GMAIL_APP_PASSWORD - Gmail app password (16 characters)
//   SITE_OWNER_EMAIL - Your email address to receive submissions

const nodemailer = require("nodemailer");

console.log("submission-created function loaded");

// Gmail sender via nodemailer
async function sendEmailGmail({ to, subject, html, replyTo }) {
  try {
    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;
    
    if (!user || !pass) {
      console.error("GMAIL_USER or GMAIL_APP_PASSWORD not configured");
      return { skipped: true, error: "Gmail credentials missing" };
    }

    console.log(`Attempting to send email to: ${to} from: ${user}`);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    const fromName = process.env.GMAIL_FROM_NAME || "Satya Pavan";
    const mailOptions = {
      from: `${fromName} <${user}>`,
      to,
      subject,
      html,
      replyTo: replyTo || user,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${to}:`, info.messageId);
    return { ok: true, id: info.messageId };
  } catch (e) {
    console.error("Gmail send failed:", e.message, e);
    return { ok: false, error: e.message };
  }
}

exports.handler = async (event) => {
  console.log("Handler called with event:", JSON.stringify(event, null, 2));
  
  try {
    // Parse the event body
    let submission = {};
    
    if (event.body) {
      try {
        const body = JSON.parse(event.body);
        submission = body?.payload?.data || body || {};
      } catch (e) {
        console.error("Failed to parse event body:", e);
        submission = event.body;
      }
    }

    console.log("Submission data:", submission);

    const name = String(submission.name || "").trim();
    const email = String(submission.email || "").trim();
    const subject = String(submission.subject || "").trim() || "New Message";
    const message = String(submission.message || "").trim();

    const ownerEmail = process.env.SITE_OWNER_EMAIL;
    const gmailUser = process.env.GMAIL_USER;

    console.log(`Processing submission - Name: ${name}, Email: ${email}, Subject: ${subject}`);
    console.log(`Owner Email: ${ownerEmail}, Gmail User: ${gmailUser}`);

    // Send confirmation email to user
    if (email) {
      console.log(`Sending confirmation email to user: ${email}`);
      const userHtml = `
        <div style="font-family:Inter,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:640px;margin:auto;padding:24px;background:#f9fafb;border-radius:8px;">
          <h2 style="color:#1f2937;">Hi ${name || "there"},</h2>
          <p style="color:#4b5563;line-height:1.6;">Thanks for reaching out. We received your message and will get back to you soon.</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
          <p style="color:#1f2937;font-weight:600;">Your message:</p>
          <div style="background:#fff;padding:16px;border-left:4px solid #3b82f6;margin:16px 0;border-radius:4px;">
            <p style="white-space:pre-wrap;color:#4b5563;margin:0;">${message}</p>
          </div>
          <p style="margin-top:24px;color:#9ca3af;font-size:12px;">This is an automated confirmation. Please do not reply to this email.</p>
        </div>
      `;
      
      const userResult = await sendEmailGmail({
        to: email,
        subject: "We received your message",
        html: userHtml,
        replyTo: ownerEmail || gmailUser,
      });
      console.log("User email result:", userResult);
    }

    // Send notification email to owner
    if (ownerEmail) {
      console.log(`Sending notification email to owner: ${ownerEmail}`);
      const ownerHtml = `
        <div style="font-family:Inter,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:640px;margin:auto;padding:24px;background:#f9fafb;border-radius:8px;">
          <h2 style="color:#1f2937;">📬 New Contact Form Submission</h2>
          <div style="background:#fff;padding:16px;border-radius:8px;margin:16px 0;border:1px solid #e5e7eb;">
            <p style="margin:8px 0;"><strong style="color:#1f2937;">Name:</strong> <span style="color:#4b5563;">${name}</span></p>
            <p style="margin:8px 0;"><strong style="color:#1f2937;">Email:</strong> <span style="color:#4b5563;"><a href="mailto:${email}">${email}</a></span></p>
            <p style="margin:8px 0;"><strong style="color:#1f2937;">Subject:</strong> <span style="color:#4b5563;">${subject}</span></p>
          </div>
          <p style="color:#1f2937;font-weight:600;margin-top:16px;">Message:</p>
          <div style="background:#fff;padding:16px;border-left:4px solid #10b981;margin:16px 0;border-radius:4px;">
            <p style="white-space:pre-wrap;color:#4b5563;margin:0;">${message}</p>
          </div>
          <p style="margin-top:24px;color:#9ca3af;font-size:12px;">You can reply directly to this email to contact them.</p>
        </div>
      `;
      
      const ownerResult = await sendEmailGmail({
        to: ownerEmail,
        subject: `Contact: ${subject}`,
        html: ownerHtml,
        replyTo: email || gmailUser,
      });
      console.log("Owner email result:", ownerResult);
    }

    console.log("Handler completed successfully");
    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, message: "Emails sent" }),
    };
  } catch (err) {
    console.error("submission-created handler error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: err.message }),
    };
  }
};
