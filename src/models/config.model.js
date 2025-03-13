import mongoose from "mongoose";

const configSchema = new mongoose.Schema({
  office_info: {
    name: { type: String, trim: true },
    email: { type: String, trim: true },
    contact: { type: String, trim: true },
    logo: { type: String, trim: true },
    linkedin: { type: String, trim: true },
    instagram: { type: String, trim: true },
    facebook: { type: String, trim: true },
    youtube: { type: String, trim: true },
    tiktok: { type: String, trim: true },
  },

  office_location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  working_hours: {
    checkin_time: { type: Date, required: true },
    checkout_time: { type: Date, required: true },
  },
});

export default mongoose.model("OfficeConfigs", configSchema);
