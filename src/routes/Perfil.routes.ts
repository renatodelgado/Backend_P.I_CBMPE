import { Router } from "express";
import { PerfilController } from "../controllers/Perfil.controller";

const perfilRoutes = Router();
const perfilController = new PerfilController();

perfilRoutes.get("/", (req, res) => perfilController.findAll(req, res));
perfilRoutes.get("/:id", (req, res) => perfilController.findById(req, res));

export { perfilRoutes };