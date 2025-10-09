import express from "express";
import { userRoutes } from "./routes/User.routes";

export const app = express();
app.use(express.json());
app.use("/users", userRoutes);
