import { Router } from "express";
import { LogAuditoriaController } from "../controllers/LogAuditoria.controller";
import { checkPermission } from "../middlewares/checkPermission";
import { auth } from "../middlewares/auth";

const logAuditoriaRoutes = Router();
const controller = new LogAuditoriaController();

logAuditoriaRoutes.get("/",
  auth,
  checkPermission(["ADMINISTRADOR", "AUDITOR"]),
  (req, res) => controller.getAllLogs(req, res)
);

logAuditoriaRoutes.get("/:id",
  auth,
  checkPermission(["ADMINISTRADOR", "AUDITOR"]),
  (req, res) => controller.getLogById(req, res)
);

logAuditoriaRoutes.get("/user/:userId",
  auth,
  checkPermission(["ADMINISTRADOR", "AUDITOR"]),
  (req, res) => controller.getLogsByUserId(req, res)
);

logAuditoriaRoutes.post("/",
  auth,
  (req, res) => controller.createLog(req, res)
);

export { logAuditoriaRoutes };