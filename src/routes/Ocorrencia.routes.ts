import { Router } from 'express';
import { OcorrenciaController } from '../controllers/Ocorrencia.controller';
import { auth} from '../middlewares/auth'
import { checkPermission } from '../middlewares/checkPermission';

const ocorrenciaRoutes = Router();
const controller = new OcorrenciaController();

// Criar ocorrência
ocorrenciaRoutes.post('/',
    auth,
    checkPermission(['ATENDENTE', 'OPERADOR', 'ADMINISTRADOR']),
     (req, res) => controller.create(req, res));

// Listar ocorrências
ocorrenciaRoutes.get('/', (req, res) => controller.findAll(req, res));

// Buscar ocorrência por id
ocorrenciaRoutes.get('/usuario/:usuarioId', (req, res) => controller.findByUsuarioId(req, res));
ocorrenciaRoutes.get('/:id', (req, res) => controller.findById(req, res));

// Atualizar status da ocorrência
ocorrenciaRoutes.patch('/:id/status',
    auth,
    checkPermission(['GESTOR', 'OPERADOR', 'ADMINISTRADOR']),
        (req, res) => controller.updateStatus(req, res)
)

// Atualizar ocorrência
ocorrenciaRoutes.put(
  '/:id',
  auth, // só precisa estar logado
  (req, res) => controller.update(req, res)
);

export { ocorrenciaRoutes };
