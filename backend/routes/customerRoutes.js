import express from "express";
import {
  getCustomers,
  addCustomer,
} from "../controllers/customerController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getCustomers);
router.post("/", protect, addCustomer);

export default router;
