import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: {
    type: String,
    default: "admin", // ✅ ye add karo
  },
});

export default mongoose.model("User", userSchema);
