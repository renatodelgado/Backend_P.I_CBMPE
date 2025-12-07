import { Request, Response } from "express";
import { OcorrenciaUserService } from "../services/Ocorrencia_User.service";

const ocorrenciaUserService = new OcorrenciaUserService();

export class OcorrenciaUserController {
    async relateUserToOcorrencia(req: Request, res: Response) {
        try {
            const auditContext = {
                request_id: (req as any).requestId,
                actor_ip: req.ip || req.socket.remoteAddress,
                actor_user_agent: req.headers['user-agent'] as string | undefined,
                actor_user_id: (req as any).user?.id ? String((req as any).user.id) : undefined
            };

            const result = await ocorrenciaUserService.relateUserToOcorrencia(req.body, auditContext);
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

    async deleteUsersbyOcorrencia(req: Request, res: Response) {
        try {
            const ocorrenciaId = Number(req.params.ocorrenciaId);
            const userId = Number(req.params.userId);
            const auditContext = {
                request_id: (req as any).requestId,
                actor_ip: req.ip || req.socket.remoteAddress,
                actor_user_agent: req.headers['user-agent'] as string | undefined,
                actor_user_id: (req as any).user?.id ? String((req as any).user.id) : undefined
            };
            const result = await ocorrenciaUserService.deleteUsersbyOcorrencia(ocorrenciaId, userId, auditContext);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

