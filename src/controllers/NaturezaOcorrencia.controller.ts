import { Request, Response } from 'express';
import { NaturezaOcorrenciaService } from '../services/NaturezaOcorrencia.service';

const naturezaOcorrenciaService = new NaturezaOcorrenciaService();

export class NaturezaOcorrenciaController {
  async findAll(req: Request, res: Response) {
    const naturezaOcorrencias = await naturezaOcorrenciaService.findAll();
    res.json(naturezaOcorrencias);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const naturezaOcorrencia = await naturezaOcorrenciaService.findById(Number(id));
    if (naturezaOcorrencia) {
      res.json(naturezaOcorrencia);
    } else {
      res.status(404).json({ message: "Natureza de ocorrência não encontrada" });
    }
  }
}
