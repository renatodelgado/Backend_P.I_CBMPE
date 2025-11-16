import { Router } from "express";
import { LesaoController } from "../controllers/Lesao.controller";

const lesaoRoutes = Router();
const controller = new LesaoController();

lesaoRoutes.get("/", controller.findAll);

export { lesaoRoutes };
