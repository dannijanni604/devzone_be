import mongoose from "mongoose";

const UsersSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    image: { type: String, trim: true },
    password: { type: String, required: true },
    linkedin: { type: String, trim: true },
    github: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("Users", UsersSchema);
