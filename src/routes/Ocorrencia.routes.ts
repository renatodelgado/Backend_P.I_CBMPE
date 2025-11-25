import { Router } from 'express';
import { OcorrenciaController } from '../controllers/Ocorrencia.controller';
import { auth} from '../middlewares/auth'
import { checkPermission } from '../middlewares/checkPermission';

const ocorrenciaRoutes = Router();
const controller = new OcorrenciaController();

ocorrenciaRoutes.post('/',
    auth,
    checkPermission(['ATENDENTE', 'OPERADOR']),
     (req, res) => controller.create(req, res));

ocorrenciaRoutes.get('/', (req, res) => controller.findAll(req, res));
ocorrenciaRoutes.get('/:id', (req, res) => controller.findById(req, res));
ocorrenciaRoutes.get('/usuario/:usuarioId', (req, res) => controller.findByUsuarioId(req, res));

ocorrenciaRoutes.patch('/:id/status',
    auth,
    checkPermission(['GESTOR', 'OPERADOR', 'ADMINISTRADOR']),
        (req, res) => controller.updateStatus(req, res)
)

export { ocorrenciaRoutes };
