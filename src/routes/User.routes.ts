import { Router } from "express";
import { UserController } from "../controllers/User.controller";
import { auth } from "../middlewares/auth";
import { checkPermission } from "../middlewares/checkPermission";

const userRoutes = Router();
const controller = new UserController();

userRoutes.post("/", controller.create);
userRoutes.get("/", controller.findAll);
userRoutes.get("/:matricula", controller.findByMatricula);
userRoutes.patch("/:id/password", (req, res) => controller.updatePassword(req, res));

// Atualizar perfil do usuário (somente ADMINISTRADOR)
userRoutes.patch("/:id/perfil",
  auth,
  checkPermission(["ADMINISTRADOR"]),
  (req, res) => controller.updatePerfil(req, res)
);

export { userRoutes };
