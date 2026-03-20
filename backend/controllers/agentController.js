import Agent from "../models/Agent.js";

// ✅ GET AGENTS (SEARCH + PAGINATION + FILTERS)
export const getAgents = async (req, res) => {
  try {
    const {
      search = "",
      page = 1,
      limit = 5,
      status,
      startDate,
      endDate,
    } = req.query;

    const query = {};

    // 🔍 Search (by name)
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // 📊 Status filter
    if (status && status !== "all") {
      query.status = status;
    }

    // 📅 Date filter
    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // 📦 Total count
    const total = await Agent.countDocuments(query);

    // 📄 Pagination
    const agents = await Agent.find(query)
      .sort({ createdAt: -1 }) // 🔥 latest first (professional touch)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      data: agents,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("GET AGENTS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch agents" });
  }
};

// ✅ ADD AGENT
export const addAgent = async (req, res) => {
  try {
    const agent = new Agent(req.body);
    await agent.save();
    res.json(agent);
  } catch (error) {
    console.error("ADD AGENT ERROR:", error);
    res.status(500).json({ message: "Failed to add agent" });
  }
};

// ❌ DELETE AGENT
export const deleteAgent = async (req, res) => {
  try {
    await Agent.findByIdAndDelete(req.params.id);
    res.json({ message: "Agent deleted" });
  } catch (error) {
    console.error("DELETE AGENT ERROR:", error);
    res.status(500).json({ message: "Failed to delete agent" });
  }
};

// ✏️ UPDATE AGENT
export const updateAgent = async (req, res) => {
  try {
    const updatedAgent = await Agent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    res.json(updatedAgent);
  } catch (error) {
    console.error("UPDATE AGENT ERROR:", error);
    res.status(500).json({ message: "Failed to update agent" });
  }
};
