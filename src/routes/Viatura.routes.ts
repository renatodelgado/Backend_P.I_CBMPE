import { Router } from "express";
import { ViaturaController } from "../controllers/Viatura.controller";

const viaturaRoutes = Router();
const controller = new ViaturaController();

viaturaRoutes.get("/", controller.findAll.bind(controller));
viaturaRoutes.get("/:id", controller.findById.bind(controller));

export { viaturaRoutes };
