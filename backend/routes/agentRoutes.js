import express from "express";
import {
  getAgents,
  addAgent,
  deleteAgent,
  updateAgent,
} from "../controllers/agentController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, adminOnly, getAgents);
router.post("/", protect, adminOnly, addAgent);
router.delete("/:id", protect, adminOnly, deleteAgent);
router.put("/:id", protect, adminOnly, updateAgent);

export default router;
