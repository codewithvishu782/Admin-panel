import mongoose from "mongoose";

const callSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Interested", "Not Interested"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Call", callSchema);
