import { Request, Response } from "express";
import { OcorrenciaService } from "../services/Ocorrencia.service";

const ocorrenciaService = new OcorrenciaService();

export class OcorrenciaController {
    // Criar uma ocorrência
    async create(req: Request, res: Response) {
        try {
            const ocorrencia = await ocorrenciaService.create(req.body);
            res.status(201).json(ocorrencia);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            res.status(400).json({ message });
        }
    }

    // Buscar todas as ocorrências
    async findAll(req: Request, res: Response) {
        try {
            const ocorrencias = await ocorrenciaService.findAll();
            res.status(200).json(ocorrencias);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            res.status(400).json({ message });
        }
    }

    // Buscar uma ocorrência pelo ID
    async findById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const ocorrencia = await ocorrenciaService.findById(Number(id));
            res.status(200).json(ocorrencia);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            res.status(400).json({ message });
        }
    }

};
