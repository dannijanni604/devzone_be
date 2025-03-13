import * as UserService from "../services/user.service.js";
import { checkUserAuthorization } from "../utils/getUserRole.util.js";

export const Registration = async (req, res) => {
  try {
    const newUser = await UserService.RegisterUserService(req.body);
    res.status(201).json({
      data: { newUser },
      message: "Register successfully.",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const Login = async (req, res) => {
  try {
    const userData = await UserService.LoginUserService(req.body);
    res.status(200).json({
      ...userData,
      message: "You have successfully logged in.",
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const FetchAllUsers = async (req, res) => {
  try {
    checkUserAuthorization(req.user);

    const users = await UserService.FetchAllUsersService();
    res.status(200).json({ users });
  } catch (error) {
    console.error("Fetch Users Error:", error.message); // Debugging
    res.status(403).json({ message: error.message });
  }
};

export const FetchUser = async (req, res) => {
  const user = req.user;
  const userId = user._id;
  checkUserAuthorization(req.user);
  try {
    const user = await UserService.FetchUserService(userId);
    res.status(200).json({ user });
  } catch (error) {
    console.error("Fetch User Error:", error.message);
    res.status(403).json({ message: error.message });
  }
};

export const UpdateUser = async (req, res) => {
  const user = req.user;
  const userId = user._id;

  try {
    checkUserAuthorization(req.user);
    const updatedUser = await UserService.UpdateUserService(userId, req.body);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error("Update User Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const DeleteUser = async (req, res) => {
  const user = req.user;
  const userId = user._id;

  try {
    checkUserAuthorization(req.user);

    const deletedUser = await UserService.DeleteUserService(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    console.error("Delete User Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// export const ForgotPassword = async (req, res) => {
//   try {
//     await UserService.ForgotPasswordService(req.body);
//     res.status(200).json({ message: "Password reset link sent successfully." });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// export const ResetPassword = async (req, res) => {
//   try {
//     await UserService.ResetPasswordService(req.params.token, req.body);
//     res.status(200).json({ message: "Password reset successfully." });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// export const ChangePassword = async (req, res) => {
//   try {
//     await UserService.ChangePasswordService(req.body);
//     res.status(200).json({ message: "Password changed successfully." });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
