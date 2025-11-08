const nodemailer = require("nodemailer");

// Gmail sender via nodemailer
async function sendEmailGmail({ to, subject, html, replyTo }) {
  try {
    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;
    
    if (!user || !pass) {
      console.error("GMAIL_USER or GMAIL_APP_PASSWORD not configured");
      return { skipped: true, error: "Gmail credentials missing" };
    }

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
    return { ok: true, id: info.messageId };
  } catch (e) {
    console.error("Gmail send failed:", e.message, e);
    return { ok: false, error: e.message };
  }
}

exports.handler = async (event) => {
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


    const name = String(submission.name || "").trim();
    const email = String(submission.email || "").trim();
    const subject = String(submission.subject || "").trim() || "New Message";
    const message = String(submission.message || "").trim();

    const ownerEmail = process.env.SITE_OWNER_EMAIL;
    const gmailUser = process.env.GMAIL_USER;

    // Send confirmation email to user
    if (email) {
      const userHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
          <div style="max-width: 600px; margin: 0 auto;">
            <!-- Header with gradient -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">✓ Message Received</h1>
              <p style="color: rgba(255, 255, 255, 0.9); margin: 8px 0 0 0; font-size: 14px;">Thank you for reaching out to us</p>
            </div>

            <!-- Main content -->
            <div style="background-color: #ffffff; padding: 40px 30px; margin: 0;">
              <p style="color: #1f2937; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                Hi <strong style="color: #667eea;">${name || "there"}</strong>,
              </p>
              
              <p style="color: #4b5563; font-size: 15px; line-height: 1.8; margin: 0 0 32px 0;">
                Thank you for reaching out! We've received your message and appreciate you taking the time to connect with us. Your inquiry is important to us, and we'll get back to you as soon as possible.
              </p>

              <!-- Message summary box -->
              <div style="background: linear-gradient(135deg, #f5f7fa 0%, #f9fafb 100%); border-left: 4px solid #667eea; padding: 24px; border-radius: 8px; margin: 32px 0;">
                <p style="color: #667eea; font-weight: 600; font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; margin: 0 0 16px 0;">
                  📋 Message Summary
                </p>
                
                <div style="margin: 0 0 20px 0;">
                  <p style="color: #9ca3af; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 6px 0;">Subject</p>
                  <p style="color: #1f2937; font-size: 15px; font-weight: 500; margin: 0;">${subject}</p>
                </div>
                
                <div>
                  <p style="color: #9ca3af; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 6px 0;">Your Message</p>
                  <p style="color: #374151; font-size: 14px; line-height: 1.7; margin: 0; white-space: pre-wrap; word-break: break-word;">${message}</p>
                </div>
              </div>

              <!-- Info box -->
              <div style="background-color: #ecf0ff; border-radius: 8px; padding: 16px 20px; margin: 32px 0; border: 1px solid #dbeafe;">
                <p style="color: #4c51bf; font-size: 13px; line-height: 1.6; margin: 0;">
                  <strong>💡 Tip:</strong> Keep this email for your reference. We may mention details from your message in our reply.
                </p>
              </div>

              <!-- Closing -->
              <p style="color: #4b5563; font-size: 15px; line-height: 1.8; margin: 32px 0 0 0;">
                Best regards,<br>
                <strong style="color: #1f2937; font-size: 16px;">Satya Pavan Jupudi</strong><br>
                <span style="color: #9ca3af; font-size: 13px;">Full-Stack Developer</span>
              </p>
            </div>

            <!-- Footer -->
            <div style="background-color: #f9fafb; padding: 30px 20px; text-align: center; border-top: 1px solid #e5e7eb; border-radius: 0 0 12px 12px;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0 0 8px 0;">
                This is an automated confirmation message.
              </p>
              <p style="color: #d1d5db; font-size: 11px; margin: 0;">
                © 2025 Satya Pavan Jupudi. All rights reserved.
              </p>
            </div>
          </div>
        </body>
        </html>
      `;
      
      const userResult = await sendEmailGmail({
        to: email,
        subject: "✓ We received your message",
        html: userHtml,
        replyTo: ownerEmail || gmailUser,
      });
      console.log("User email result:", userResult);
    }

    // Send notification email to owner
    if (ownerEmail) {
      const ownerHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
          <div style="max-width: 600px; margin: 0 auto;">
            <!-- Header with gradient -->
            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">📬 New Message</h1>
              <p style="color: rgba(255, 255, 255, 0.9); margin: 8px 0 0 0; font-size: 14px;">You have a new contact form submission</p>
            </div>

            <!-- Main content -->
            <div style="background-color: #ffffff; padding: 40px 30px; margin: 0;">
              <p style="color: #1f2937; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                Hey Satya,
              </p>
              
              <p style="color: #4b5563; font-size: 15px; line-height: 1.8; margin: 0 0 28px 0;">
                You have a new message from your contact form. See the details below:
              </p>

              <!-- Contact Details Card -->
              <div style="background: linear-gradient(135deg, #f0fdf4 0%, #f7fee7 100%); border: 1px solid #dcfce7; border-radius: 8px; padding: 24px; margin: 28px 0;">
                <div style="margin: 0 0 18px 0;">
                  <p style="color: #9ca3af; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 6px 0;">From</p>
                  <p style="color: #1f2937; font-size: 15px; font-weight: 600; margin: 0;">${name}</p>
                </div>
                
                <div style="margin: 0 0 18px 0;">
                  <p style="color: #9ca3af; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 6px 0;">Email</p>
                  <p style="margin: 0;"><a href="mailto:${email}" style="color: #10b981; font-size: 15px; font-weight: 500; text-decoration: none;">${email}</a></p>
                </div>

                <div>
                  <p style="color: #9ca3af; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 6px 0;">Subject</p>
                  <p style="color: #1f2937; font-size: 15px; font-weight: 600; margin: 0; background-color: #ffffff; padding: 12px 16px; border-radius: 6px; border-left: 3px solid #10b981;">${subject}</p>
                </div>
              </div>

              <!-- Message Content -->
              <div style="margin: 32px 0;">
                <p style="color: #9ca3af; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 12px 0;">📝 Message</p>
                <div style="background: linear-gradient(135deg, #f5f7fa 0%, #f9fafb 100%); border-left: 4px solid #10b981; padding: 24px; border-radius: 8px;">
                  <p style="color: #374151; font-size: 14px; line-height: 1.8; margin: 0; white-space: pre-wrap; word-break: break-word;">${message}</p>
                </div>
              </div>

              <!-- Action Box -->
              <div style="background-color: #fef3c7; border-radius: 8px; padding: 16px 20px; margin: 28px 0; border: 1px solid #fce7b6;">
                <p style="color: #92400e; font-size: 13px; line-height: 1.6; margin: 0;">
                  <strong>💬 Quick Reply:</strong> You can reply directly to this email and your message will be sent back to <strong>${name}</strong>.
                </p>
              </div>

              <!-- Footer Info -->
              <p style="color: #4b5563; font-size: 13px; line-height: 1.6; margin: 32px 0 0 0;">
                <span style="color: #9ca3af;">Received on:</span> <strong style="color: #1f2937;">${new Date().toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</strong>
              </p>
            </div>

            <!-- Footer -->
            <div style="background-color: #f9fafb; padding: 30px 20px; text-align: center; border-top: 1px solid #e5e7eb; border-radius: 0 0 12px 12px;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0 0 8px 0;">
                This is an automated notification from your contact form.
              </p>
              <p style="color: #d1d5db; font-size: 11px; margin: 0;">
                © 2025 Satya Pavan Jupudi. All rights reserved.
              </p>
            </div>
          </div>
        </body>
        </html>
      `;
      
      const ownerResult = await sendEmailGmail({
        to: ownerEmail,
        subject: `📬 New Message: ${subject}`,
        html: ownerHtml,
        replyTo: email || gmailUser,
      });
      console.log("Owner email result:", ownerResult);
    }

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
