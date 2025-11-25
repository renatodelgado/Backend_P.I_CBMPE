import { Request, Response } from "express";
import { OcorrenciaUserService } from "../services/Ocorrencia_User.service";

const ocorrenciaUserService = new OcorrenciaUserService();

export class OcorrenciaUserController {
    async relateUserToOcorrencia(req: Request, res: Response) {
        try {
            const result = await ocorrenciaUserService.relateUserToOcorrencia(req.body);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }   

    async getUsersByOcorrencia(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const users = await ocorrenciaUserService.getUsersByOcorrencia(id);
            return res.status(200).json(users);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    async getOcorrenciasByUser(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const ocorrencias = await ocorrenciaUserService.getOcorrenciasByUser(id);
            return res.status(200).json(ocorrencias);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

