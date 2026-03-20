import mongoose from "mongoose";

const callSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Interested", "Not Interested"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Call", callSchema);
