import { Router } from "express";
import { LogConflitoController } from "../controllers/LogConflito.controller";

const router = Router();
const controller = new LogConflitoController();

router.get("/", controller.listar);

export default router;
