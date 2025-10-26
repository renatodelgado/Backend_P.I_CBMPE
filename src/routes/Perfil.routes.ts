import { Router } from "express";
import { PerfilController } from "../controllers/Perfil.controller";

const perfilRoutes = Router();
const controller = new PerfilController();

perfilRoutes.get("/", (req, res) => controller.findAll(req, res));
perfilRoutes.get("/:id", (req, res) => controller.findById(req, res));

export { perfilRoutes };