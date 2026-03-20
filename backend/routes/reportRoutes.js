import express from "express";
import { downloadReport } from "../controllers/reportController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/download", protect, adminOnly, downloadReport);

export default router;
