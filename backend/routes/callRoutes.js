import express from "express";
import {
  getCalls,
  createCall,
  updateCallStatus,
} from "../controllers/callController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getCalls);
router.post("/", protect, createCall);
router.put("/:id", protect, updateCallStatus);

export default router;
