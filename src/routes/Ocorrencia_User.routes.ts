import { Router } from "express";
import { OcorrenciaUserController } from "../controllers/Ocorrencia_User.controller";
import { checkPermission } from "../middlewares/checkPermission";
import { auth } from "../middlewares/auth";

const ocorrenciaUserRoutes = Router();

const controller = new OcorrenciaUserController();
ocorrenciaUserRoutes.post("/", controller.relateUserToOcorrencia);

// Lista todos os usuários de uma ocorrência
ocorrenciaUserRoutes.get("/ocorrencia/:id/users", controller.getUsersByOcorrencia);

// Lista todas as ocorrências de um usuário
ocorrenciaUserRoutes.get("/user/:id/ocorrencias", controller.getOcorrenciasByUser);

// Remove a relação de um usuário com uma ocorrência
ocorrenciaUserRoutes.delete("/ocorrencia/:ocorrenciaId/user/:userId",
    auth,
    checkPermission(['ADMINISTRADOR', 'GESTOR', 'OPERADOR']),
    (req, res) => controller.deleteUsersbyOcorrencia(req, res)
);

export { ocorrenciaUserRoutes };