import { Router } from "express";
import { RegiaoController } from "../controllers/Regiao.controller";

const regiaoRoutes = Router();
const controller = new RegiaoController();

regiaoRoutes.get("/", (req, res) => controller.findAll(req, res));
regiaoRoutes.get("/:id", (req, res) => controller.findById(req, res));

export { regiaoRoutes };