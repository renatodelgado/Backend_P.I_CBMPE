import { Router } from 'express';
import { NaturezaOcorrenciaController } from '../controllers/NaturezaOcorrencia.controller';

const naturezaOcorrenciaRoutes = Router();
const controller = new NaturezaOcorrenciaController();

naturezaOcorrenciaRoutes.get("/", controller.findAll.bind(controller));
naturezaOcorrenciaRoutes.get("/:id", controller.findById.bind(controller));

export { naturezaOcorrenciaRoutes };
