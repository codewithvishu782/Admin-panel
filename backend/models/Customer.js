import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    email: String,
    status: {
      type: String,
      default: "Pending",
    },
    assignedAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Customer", customerSchema);
