import { Router } from 'express';
import { OcorrenciaController } from '../controllers/Ocorrencia.controller';

const ocorrenciaRoutes = Router();
const controller = new OcorrenciaController();

ocorrenciaRoutes.post('/', (req, res) => controller.create(req, res));
ocorrenciaRoutes.get('/', (req, res) => controller.findAll(req, res));
ocorrenciaRoutes.get('/:id', (req, res) => controller.findById(req, res));

export { ocorrenciaRoutes };
