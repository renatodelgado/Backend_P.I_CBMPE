import { Router } from 'express';
import { OcorrenciaController } from '../controllers/Ocorrencia.controller';
import { auth} from '../middlewares/auth'
import { checkPermission } from '../middlewares/checkPermission';

const ocorrenciaRoutes = Router();
const controller = new OcorrenciaController();

// Criar ocorrência
ocorrenciaRoutes.post('/',
    auth,
    checkPermission(['ATENDENTE', 'OPERADOR']),
     (req, res) => controller.create(req, res));

// Listar ocorrências
ocorrenciaRoutes.get('/', (req, res) => controller.findAll(req, res));

// Buscar ocorrência por id
ocorrenciaRoutes.get('/:id', (req, res) => controller.findById(req, res));

// Atualizar ocorrência
ocorrenciaRoutes.put(
  '/:id',
  auth,
  checkPermission(['ATENDENTE', 'OPERADOR']),
  (req, res) => controller.update(req, res)
);

export { ocorrenciaRoutes };
