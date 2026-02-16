import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const authRoutes = require("./src/routes/auth.routes");
const userRoutes = require("./src/routes/user.routes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

export default app;
