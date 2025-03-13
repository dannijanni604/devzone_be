export const passwordResetTemplate = (name, resetLink) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
    
    <p>Hello <strong>${name}</strong>,</p>

    <p>We received a request to reset your password. No worries, we've got you covered!</p>

    <p style="margin-bottom: 20px;">Click the button below to reset your password:</p>

    <div style="text-align: center; margin-bottom: 20px;">
      <a href="${resetLink}" 
         style="background-color: #007bff; color: white; padding: 8px 16px; text-decoration: none; border-radius: 5px; font-size: 14px; display: inline-block;">
        Reset Password
      </a>
    </div>

    <p>If the button above doesn’t work, click the link below:</p>

    <a href="${resetLink}" style="color: #007bff; text-decoration: underline;">${resetLink}</a>

    <p>If you didn't request this, you can safely ignore this email.</p>

    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">

    <p>Stay secure,</p>
    <p><strong>Whitebox</strong></p>

  </div>
`;
