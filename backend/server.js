// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";

// import agentRoutes from "./routes/agentRoutes.js";
// import customerRoutes from "./routes/customerRoutes.js";
// import reportRoutes from "./routes/reportRoutes.js";

// import callRoutes from "./routes/callRoutes.js";
// import analyticsRoutes from "./routes/analyticsRoutes.js";
// import authRoutes from "./routes/agentRoutes.js";

// dotenv.config();
// connectDB();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/agents", agentRoutes);
// app.use("/api/customers", customerRoutes);
// app.use("/api/reports", reportRoutes);
// app.use("/api/calls", callRoutes);
// app.use("/api/analytics", analyticsRoutes);
// app.use("/api/auth", authRoutes);
// app.listen(5000, () => console.log("Server running on port 5000"));
// console.log("Server file path:", import.meta.url);

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Routes
import agentRoutes from "./routes/agentRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import callRoutes from "./routes/callRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import authRoutes from "./routes/authRoutes.js"; // ✅ FIXED

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/agents", agentRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/calls", callRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/auth", authRoutes);

// Server
app.listen(5000, () => console.log("Server running on port 5000"));
