import express from "express";
import { createCall, getCalls } from "../controllers/callController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getCalls);
router.post("/", protect, createCall);

export default router;
