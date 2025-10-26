import { Router } from "express";
import { UnidadeOperacionalController } from "../controllers/UnidadeOperacional.controller";

const unidadeOperacionalRoutes = Router();
const controller = new UnidadeOperacionalController();

unidadeOperacionalRoutes.get("/", (req, res) => controller.findAll(req, res));
unidadeOperacionalRoutes.get("/:id", (req, res) => controller.findById(req, res));

export { unidadeOperacionalRoutes };