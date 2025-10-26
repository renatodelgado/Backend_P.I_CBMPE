import { Router } from "express";
import { UnidadeOperacionalController } from "../controllers/UnidadeOperacional.controller";

const unidadeOperacionalRoutes = Router();
const unidadeOperacionalController = new UnidadeOperacionalController();

unidadeOperacionalRoutes.get("/", (req, res) => unidadeOperacionalController.findAll(req, res));
unidadeOperacionalRoutes.get("/:id", (req, res) => unidadeOperacionalController.findById(req, res));

export { unidadeOperacionalRoutes };