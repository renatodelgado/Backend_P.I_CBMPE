import { Router } from "express";
import { AuthController } from "../controllers/Auth.controller";

const authRoutes = Router();
const controller = new AuthController();

authRoutes.post("/login", (req, res) => controller.login(req, res));

export { authRoutes };