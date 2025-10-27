import { Router } from 'express';
import { GrupoOcorrenciaController } from '../controllers/GrupoOcorrencia.controller';

const grupoOcorrenciaRoutes = Router();
const controller = new GrupoOcorrenciaController();

grupoOcorrenciaRoutes.get('/', (req, res) => controller.getAll(req, res));
grupoOcorrenciaRoutes.get('/:id', (req, res) => controller.getById(req, res));

export { grupoOcorrenciaRoutes };
