import Call from "../models/Call.js";

// 🔹 Create Call
export const createCall = async (req, res) => {
  try {
    const { customer, agent, status } = req.body;

    // Basic validation
    if (!customer || !agent) {
      return res.status(400).json({
        message: "Customer and Agent are required",
      });
    }

    const call = new Call({
      customer,
      agent,
      status,
    });

    const savedCall = await call.save();

    res.status(201).json({
      message: "Call created successfully",
      data: savedCall,
    });
  } catch (error) {
    console.error("Create Call Error:", error);
    res.status(500).json({
      message: "Server error while creating call",
    });
  }
};

// 🔹 Get All Calls
export const getCalls = async (req, res) => {
  try {
    const calls = await Call.find()
      .populate("agent", "name email")
      .populate("customer", "name phone email")
      .sort({ createdAt: -1 });

    res.status(200).json(calls);
  } catch (error) {
    console.error("Get Calls Error:", error);
    res.status(500).json({
      message: "Server error while fetching calls",
    });
  }
};

// 🔹 Update Call Status (NEW FEATURE)
export const updateCallStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Optional validation
    if (!status) {
      return res.status(400).json({
        message: "Status is required",
      });
    }

    const updatedCall = await Call.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    )
      .populate("agent", "name email")
      .populate("customer", "name phone email");

    if (!updatedCall) {
      return res.status(404).json({
        message: "Call not found",
      });
    }

    res.status(200).json({
      message: "Call status updated successfully",
      data: updatedCall,
    });
  } catch (error) {
    console.error("Update Call Error:", error);
    res.status(500).json({
      message: "Server error while updating call",
    });
  }
};
