const User = require("../models/User");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const crypto = require("crypto"); // Import the crypto module
const path = require("path");
const fs = require("fs");
require("dotenv").config();
//dont use formData in frontend when there is no any media attached with req in frontend

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const newUser = new User({
        fullName: "Admin",
        title: "Admin",
        twitter: "",
        linkedIn: "",
        email,
        phone: "",
        password,
        location: "",
        category: "admin",
        verified: true,
        code: "0000",
      });

      await newUser.save();
      res
        .status(200)
        .json({ success: true, message: "Registration Successful." });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Sorry, Account already exists." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Registration failed" });
  }
};
const forgotPassword = async (req, res) => {
  console.log("forgot password");
  const BASE_URL = process.env.BASE_URL;
  const { email } = req.body;
  const baseUrl = `${BASE_URL}/user/reset/password`;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("came here");
      return res.status(201).json({ message: "User not found" });
    }

    console.log("in1");
    const token = crypto.randomBytes(20).toString("hex");
    console.log("in3");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    console.log("here");
    await user.save();
    console.log(user);

    const resetLink = `${baseUrl}/?token=${token}`; // Resetting  password link with token as query parameter
    const emailIs = user.email;
    const subjectIs = "Reset Password Link From TheCryptoHub";

    const msgIs = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f4f4f4;
          padding: 20px;
        }
        .container {
          background-color: #ffffff;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
        }
        .header {
          background: linear-gradient(45deg, #248a8c, #9ea5a1);
          color: #ffffff;
          padding: 15px;
          text-align: center;
          border-radius: 8px 8px 0 0;
          font-size: 24px;
          font-weight: bold;
        }
        .content {
          padding: 20px;
          color: #333333;
          font-size: 16px;
        }
        .footer {
          color: white !important;
          font-size: 17px;
          background: linear-gradient(45deg, #248a8c, #9ea5a1);
          padding: 15px;
          text-align: center;
          border-radius: 0 0 8px 8px;
          font-weight: bold;
        }
        .button {
          color: #ffffff;
          background: linear-gradient(45deg, #248a8c, #9ea5a1);

          padding: 12px 24px;
          text-align: center;
          display: inline-block;
          border-radius: 5px;
          text-decoration: none;
          margin-top: 20px;
          font-size: 18px;
          font-weight: bold;
          transition: background-color 0.3s ease;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          Reset Password Link From TheCryptoHub
        </div>
        <div class="content">
          <p>Hi,</p>
          <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
          <p>Please click on the following link, or paste this into your browser to complete the process:</p>
          <a href="${resetLink}" class="button">${resetLink}</a>
          <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
        </div>
        <div class="footer">
          Thanks!
        </div>
      </div>
    </body>
    </html>
  `;

    var transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: process.env.GMAIL_SENDER,
        pass: process.env.GMAIL_PASS,
      },
      secure: true,
    });

    var mailOptions = {
      from: process.env.GMAIL_SENDER,
      to: emailIs,
      subject: subjectIs,
      html: msgIs, // Useing  html instead of text to send HTML formatted email
    };

    console.log("last");
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.status(500).json({ message: "Failed to send email" });
      } else {
        console.log("Link Sent to your Entered Email, Authorize and Reset !");
        res.status(200).json({ message: "Email sent" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    console.log("token:", token);
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.status(200).json({ message: "Password Reset successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);
    // Compare the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    if (!existingUser.verified) {
      return res
        .status(400)
        .json({ success: false, message: "Email not verified" });
    }

    // At this point, authentication is successful

    // Generate a JWT token

    const token = await existingUser.createJWT(); //createJWT in User MODEL functions
    res.status(200).json({
      success: true,
      category: existingUser.category,
      message: "Login Successful",
      token,
      User: {
        fullName: existingUser.fullName,
        email: existingUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Login failed" });
  }
};
const contact = async (req, res) => {
  try {
    console.log(req.body);

    const { email, name, message } = req.body;
    // Find the user by email
    console.log(email, name, message);

    const nameIs = name;
    const emailIs = email;
    const msgIs = `
    <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px; border-radius: 10px;">
        <h2 style="color: #333366; text-align: center; margin-bottom: 20px;">Hello TheCryptoHub Community, we got new contact us message. </h2>
        
        
        <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.1);">
            <p style="font-size: 18px; color: #333366; margin-bottom: 10px;">💌 <strong>User Email Address:</strong></p>
            <p style="font-size: 16px; color: #666666; margin-bottom: 0;">${emailIs}</p>
        </div>

                <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.1);">
            <p style="font-size: 18px; color: #333366; margin-bottom: 10px;">💌 <strong>Name:</strong></p>
            <p style="font-size: 16px; color: #666666; margin-bottom: 0;">${nameIs}</p>
        </div>

                <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.1);">
            <p style="font-size: 18px; color: #333366; margin-bottom: 10px;">💌 <strong>Message:</strong></p>
            <p style="font-size: 16px; color: #666666; margin-bottom: 0;">${message}</p>
        </div>



        <p style="font-size: 16px; line-height: 1.6; color: #666666; margin-top: 20px;">
            <strong>Best regards,<br>
            The TheCryptoHub Team</strong>
        </p>
    </div>
    `;
    var transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: process.env.GMAIL_SENDER,
        pass: process.env.GMAIL_PASS,
      },
      secure: true,
    });
    var mailOptions = {
      from: process.env.GMAIL_SENDER,
      to: process.env.GMAIL_SENDER,
      subject: `TheCryptoHub |New Contact Us Message from ${name}`,
      html: msgIs,
    };
    await transporter.sendMail(mailOptions); // Await the sending of the email
    res.status(200).json({
      success: true,
      message: "Message Sent Successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const storeFile = async (file, id) => {
  console.log("file: ", file);
  const fs = require("fs");
  const path = require("path");
  const fileType = file.mimetype.split("/")[1];
  const filePath = path.join(__dirname, `../uploads`, `${id}.${fileType}`);
  console.log("filePath: ", filePath);
  fs.writeFileSync(filePath, file.buffer, function (err) {
    if (err) {
      console.log("error is", err);
    } else {
      console.log("file saved");
    }
  });
  return `${id}.${fileType}`;
};

module.exports = {
  contact,
  resetPassword,
  forgotPassword,
  register,
  login,
  storeFile,
};
