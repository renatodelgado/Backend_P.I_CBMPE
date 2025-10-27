import { Request, Response} from 'express';
import { SubgrupoOcorrenciaService } from '../services/SubgrupoOcorrencia.service';

const subgrupoOcorrenciaService = new SubgrupoOcorrenciaService();

export class SubgrupoOcorrenciaController {
    async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const subgrupos = await subgrupoOcorrenciaService.findAll();
            return res.status(200).json(subgrupos);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
}
    async findById(req: Request, res: Response): Promise<Response> {
        const id = parseInt(req.params.id, 10);
        try {
            const subgrupo = await subgrupoOcorrenciaService.findById(id);
            if (!subgrupo) {
                return res.status(404).json({ message: 'Subgrupo not found' });
            }
            return res.status(200).json(subgrupo);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
};