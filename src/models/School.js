import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema({
  subdomain: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  contact: { type: String }
});

export default mongoose.models.School || mongoose.model("School", schoolSchema);
