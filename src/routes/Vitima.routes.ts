import { Router } from "express";
import { VitimaController } from "../controllers/Vitima.controller";

const vitimaRoutes = Router();

const controller = new VitimaController();
vitimaRoutes.post("/", controller.create);
vitimaRoutes.get("/", controller.findAll);
vitimaRoutes.get("/ocorrencia/:ocorrenciaId", controller.findByOcorrenciaId);

export { vitimaRoutes };