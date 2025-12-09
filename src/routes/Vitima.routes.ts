import { Router } from "express";
import { VitimaController } from "../controllers/Vitima.controller";
import { auth } from "../middlewares/auth";
import { checkPermission } from "../middlewares/checkPermission";

const vitimaRoutes = Router();

const controller = new VitimaController();
vitimaRoutes.post("/", controller.create);
vitimaRoutes.get("/", controller.findAll);
vitimaRoutes.get("/:ocorrenciaId", controller.findVitimasByOcorrenciaId);
vitimaRoutes.patch("/:id",
    auth, 
    checkPermission(['ADMINISTRADOR', 'GESTOR', 'OPERADOR']),
    controller.updateVitima);

vitimaRoutes.put("/:id",
    auth, 
    checkPermission(['ADMINISTRADOR', 'GESTOR', 'OPERADOR']),
    controller.updateVitima);
    
vitimaRoutes.delete("/:id",
    auth, 
    checkPermission(['ADMINISTRADOR', 'GESTOR', 'OPERADOR']),
    controller.deleteVitima);

export { vitimaRoutes };