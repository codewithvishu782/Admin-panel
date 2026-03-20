import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
});

export default mongoose.model("Agent", agentSchema);
