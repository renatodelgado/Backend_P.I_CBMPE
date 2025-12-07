import { Router } from "express";
import { AnexoController } from "../controllers/Anexo.controller";
import { checkPermission } from "../middlewares/checkPermission";
import { auth } from "../middlewares/auth";

const anexoRoutes = Router();
const controller = new AnexoController();

// Deletar um anexo pelo ID
anexoRoutes.delete("/:id",
    auth,
        checkPermission(['ADMINISTRADOR', 'GESTOR', 'OPERADOR']),
        (req, res) =>controller.deleteAnexo(req, res));

export { anexoRoutes };