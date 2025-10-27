import { Router } from 'express';
import { SubgrupoOcorrenciaController } from '../controllers/SubgrupoOcorrencia.controller';

const subgrupoOcorrenciaRoutes = Router();
const controller = new SubgrupoOcorrenciaController();

subgrupoOcorrenciaRoutes.get('/', (req, res) => controller.findAll(req, res));
subgrupoOcorrenciaRoutes.get('/:id', (req, res) => controller.findById(req, res));

export { subgrupoOcorrenciaRoutes };