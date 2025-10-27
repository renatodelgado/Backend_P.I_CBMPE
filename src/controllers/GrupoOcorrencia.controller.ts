import { Request, Response} from 'express';
import { GrupoOcorrenciaService } from '../services/GrupoOcorrencia.service';

const grupoOcorrenciaService = new GrupoOcorrenciaService();

export class GrupoOcorrenciaController {
    async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const grupos = await grupoOcorrenciaService.findAll();
            return res.status(200).json(grupos);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    async getById(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id, 10);
        try {
            const grupo = await grupoOcorrenciaService.findById(id);
            if (!grupo) {
                return res.status(404).json({ message: 'Grupo not found' });
            }
            return res.status(200).json(grupo);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
};
