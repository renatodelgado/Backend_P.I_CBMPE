import { Router } from "express";
import { OcorrenciaUserController } from "../controllers/Ocorrencia_User.controller";

const ocorrenciaUserRoutes = Router();

const controller = new OcorrenciaUserController();
ocorrenciaUserRoutes.post("/", controller.relateUserToOcorrencia);

// Lista todos os usuários de uma ocorrência
ocorrenciaUserRoutes.get("/ocorrencia/:id/users", controller.getUsersByOcorrencia);

// Lista todas as ocorrências de um usuário
ocorrenciaUserRoutes.get("/user/:id/ocorrencias", controller.getOcorrenciasByUser);

export { ocorrenciaUserRoutes };