import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import Users from "../models/user.model.js";
import { CheckValidation } from "../utils/validation.util.js";
import { passwordResetTemplate } from "../utils/emailTemplates.js";

export const RegisterUserService = async (userData) => {
  const { name, email, password, image, linkedin, github } = userData;

  const validationError = CheckValidation(["name", "email", "password"], {
    body: userData,
  });
  if (validationError) {
    throw new Error(validationError);
  }
  const existingUser = await Users.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new Users({
    name,
    email,
    password: hashedPassword,
    image,
    linkedin,
    github,
  });
  await newUser.save();
  const userResponse = newUser.toObject();
  delete userResponse.password;
  return userResponse;
};

export const LoginUserService = async ({ email, password }) => {
  const user = await Users.findOne({ email });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const userInfo = {
    _id: user._id,
    name: user.name,
    email: user.email,
    image: user.image,
    linkedin: user.linkedin,
    github: user.github,
  };

  const access_tokenDuration = 24 * 60 * 60;
  const accessToken = jwt.sign(
    { user: userInfo },
    process.env.ACCESS_SECRET_KEY,
    { expiresIn: access_tokenDuration }
  );
  await user.save();
  return {
    tokens: {
      access_token: accessToken,
    },
    loggedInUser: userInfo,
  };
};

export const FetchAllUsersService = async (user) => {
  const users = await Users.find().select("-password");
  return users;
};

export const FetchUserService = async (userId) => {
  const user = await Users.findById(userId).select("-password");
  if (!user) throw new Error("User not found");
  return user;
};

export const FetchAllEmployeesService = async (user) => {
  const employees = await Users.find({ role: "employee" }).select("-password");

  return employees;
};

export const UpdateUserService = async (userId, updateData) => {
  const updatedUser = await Users.findByIdAndUpdate(userId, updateData, {
    new: true,
  }).select("-password");

  return updatedUser;
};

export const DeleteUserService = async (userId) => {
  const deletedUser = await Users.findByIdAndDelete(userId);
  return deletedUser;
};

// export const ForgotPasswordService = async ({ email }) => {
//   if (!email) throw new Error("Please provide email");

//   const user = await Users.findOne({ email });
//   if (!user) throw new Error("User not found, please register");

//   const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
//     expiresIn: "1h",
//   });

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.MY_GMAIL,
//       pass: process.env.MY_PASSWORD,
//     },
//   });

//   const resetLink = `${process.env.FRONTEND_URL}/auth/reset-password/${token}`;

//   const mailOptions = {
//     from: process.env.MY_GMAIL,
//     to: email,
//     subject: "Reset Your Password - Action Required",
//     html: passwordResetTemplate(user.first_name, resetLink),
//   };

//   await transporter.sendMail(mailOptions);
// };

// export const ResetPasswordService = async (token, { password }) => {
//   if (!password) throw new Error("Please provide a new password");

//   const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//   const user = await Users.findOne({ email: decoded.email });

//   if (!user) throw new Error("Invalid token or user not found");

//   user.password = await bcrypt.hash(password, 10);
//   await user.save();
// };

// export const ChangePasswordService = async ({
//   email,
//   currentPassword,
//   newPassword,
// }) => {
//   if (!email || !currentPassword || !newPassword)
//     throw new Error("Please provide all required fields");

//   const user = await Users.findOne({ email });
//   if (!user) throw new Error("User not found, please register");

//   const isMatch = await bcrypt.compare(currentPassword, user.password);
//   if (!isMatch) throw new Error("Current password is incorrect");

//   user.password = await bcrypt.hash(newPassword, 10);
//   await user.save();
// };
