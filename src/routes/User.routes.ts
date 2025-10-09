import { Router } from "express";
import { UserController } from "../controllers/User.controller";

const userRoutes = Router();
const controller = new UserController();

userRoutes.post("/", controller.create);
userRoutes.get("/", controller.findAll);

export { userRoutes };
