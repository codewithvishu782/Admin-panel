import Call from "../models/Call.js";

export const getAnalytics = async (req, res) => {
  const calls = await Call.find();

  const result = {
    totalCalls: calls.length,
    interested: calls.filter((c) => c.status === "Interested").length,
    notInterested: calls.filter((c) => c.status === "Not Interested").length,
  };

  res.json(result);
};
