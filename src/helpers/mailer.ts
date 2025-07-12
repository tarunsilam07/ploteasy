import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

interface Details {
  email: string;
  emailType: "RESET" | "VERIFY";
  userId: string;
}

export default async function sendEmail({ email, emailType, userId }: Details) {
  try {
    // Generate hashed token and email
    let hashedToken = await bcryptjs.hash(userId.toString(), 10);
    let hashedEmail = await bcryptjs.hash(email, 10);

    // Sanitize the hashed values
    hashedToken = hashedToken.replace(/[^a-zA-Z0-9]/g, "");
    hashedEmail = hashedEmail.replace(/[^a-zA-Z0-9]/g, "");

    // Update user document based on emailType
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hour
        hashedEmail: hashedEmail,
      });
      console.log("Verification token updated for user:", userId);
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour
        hashedEmail: hashedEmail,
      });
      console.log("Password reset token updated for user:", userId);
    }

    const transport = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false, 
      auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_API_KEY,
      },
    });

   
    await transport.verify();
    console.log("SMTP transporter verified successfully.");

   
    const verificationLink = `${process.env.DOMAIN}/auth/${
      emailType === "VERIFY" ? "verifyemail" : "resetpassword"
    }/?token=${encodeURIComponent(hashedToken)}&id=${encodeURIComponent(
      hashedEmail
    )}`;


    const mailOptions = {
      from: "tarun79767@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${
    emailType === "VERIFY" ? "Email Verification" : "Password Reset"
  }</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f1f5f9;
      font-family: 'Inter', sans-serif;
      color: #1f2937;
    }

    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
      border: 1px solid #e5e7eb;
    }

    .header {
      background: linear-gradient(135deg, #3b82f6, #1e40af);
      padding: 32px;
      color: white;
      text-align: center;
    }

    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
    }

    .content {
      padding: 30px 32px;
      text-align: left;
    }

    .content p {
      margin: 16px 0;
      font-size: 16px;
      line-height: 1.6;
    }

    .cta-button {
      display: inline-block;
      margin: 24px 0;
      background: linear-gradient(135deg, #2563eb, #3b82f6);
      color: white !important;
      text-decoration: none;
      padding: 14px 28px;
      border-radius: 10px;
      font-weight: 600;
      font-size: 16px;
      transition: all 0.3s ease;
    }

    .cta-button:hover {
      background: linear-gradient(135deg, #3b82f6, #2563eb);
    }

    .link {
      color: #2563eb;
      font-weight: 600;
      text-decoration: none;
      word-break: break-all;
    }

    .footer {
      padding: 20px;
      background-color: #f9fafb;
      font-size: 14px;
      color: #6b7280;
      text-align: center;
    }

    .footer a {
      color: #2563eb;
      font-weight: 600;
      text-decoration: none;
    }

    .footer a:hover {
      text-decoration: underline;
    }

    @media (max-width: 600px) {
      .content {
        padding: 24px 20px;
      }

      .header {
        padding: 24px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${
        emailType === "VERIFY" ? "Welcome to JuyoJisho!" : "Reset Your Password"
      }</h1>
    </div>
    <div class="content">
      <p>Dear User,</p>
      <p>
        ${
          emailType === "VERIFY"
            ? "Thanks for signing up! Please verify your email to get started using JuyoJisho."
            : "We received a request to reset your password. You can use the button below to proceed."
        }
      </p>
      <p style="text-align: center;">
        <a href="${verificationLink}" class="cta-button" target="_blank">
          ${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}
        </a>
      </p>
      <p>If the button above doesn’t work, copy and paste the following link into your browser:</p>
      <p><a href="${verificationLink}" class="link" target="_blank">${verificationLink}</a></p>
    </div>
    <div class="footer">
      <p>&copy; 2025 JuyoJisho. All rights reserved.</p>
      <p>
        <a href="https://watashino-bloggy.vercel.app" target="_blank">Visit our website</a>
      </p>
    </div>
  </div>
</body>
</html>

      `,
    };

    // Send the email
    const mailResponse = await transport.sendMail(mailOptions);
    console.log("Email sent successfully:", mailResponse);
    return mailResponse;
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
