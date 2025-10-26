import { Router } from "express";
import { AISController } from "../controllers/AIS.controller";

const aisRoutes = Router();
const controller = new AISController();

aisRoutes.get("/", (req, res) => controller.findAll(req, res));
aisRoutes.get("/:id", (req, res) => controller.findById(req, res));

export { aisRoutes };