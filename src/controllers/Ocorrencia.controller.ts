import { Request, Response } from "express";
import { OcorrenciaService } from "../services/Ocorrencia.service";

const ocorrenciaService = new OcorrenciaService();

export class OcorrenciaController {
    // Criar uma ocorrência
    async create(req: Request, res: Response) {
        try {
            const auditContext = {
                request_id: (req as any).requestId,
                actor_ip: req.ip || req.socket.remoteAddress,
                actor_user_agent: req.headers['user-agent'] as string | undefined,
                actor_user_id: (req as any).user?.id ? String((req as any).user.id) : undefined
            };

            const ocorrencia = await ocorrenciaService.create(req.body, auditContext);
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
    // Buscar ocorrências por ID do usuário
    async findByUsuarioId(req: Request, res: Response) {
        try {
            const { usuarioId } = req.params;
            const ocorrencias = await ocorrenciaService.findByUsuarioId(Number(usuarioId));
            res.status(200).json(ocorrencias);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            res.status(400).json({ message });
        }
    }
    //Atualizar ocorrência
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body;

            const userId = (req.user as any)?.id;
            const auditContext = {
                request_id: (req as any).requestId,
                actor_ip: req.ip || req.socket.remoteAddress,
                actor_user_agent: req.headers['user-agent'] as string | undefined,
                actor_user_id: (req as any).user?.id ? String((req as any).user.id) : undefined
            };

            // Chama o service.update existente
            const updatedOcorrencia = await ocorrenciaService.update(Number(id), data, userId, auditContext);

            res.status(200).json({
                message: "Ocorrência atualizada com sucesso",
                ocorrencia: updatedOcorrencia});

        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            // responde 409 para conflito detectado
            if ((error as any)?.name === "ConflictError") {
                return res.status(409).json({ message });
            }
            res.status(500).json({ message: "Erro ao atualizar ocorrência: " + message });
        }
    }
    // Atualizar status da ocorrência
    async updateStatus(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const user = req.user!;

            const auditContext = {
                request_id: (req as any).requestId,
                actor_ip: req.ip || req.socket.remoteAddress,
                actor_user_agent: req.headers['user-agent'] as string | undefined,
                actor_user_id: (req as any).user?.id ? String((req as any).user.id) : undefined
            };

            const ocorrenciaAtualizada = await ocorrenciaService.updateStatus(Number(id), status, user, auditContext);
            res.status(200).json({
                message: "Status atualizado com sucesso",
                ocorrencia: ocorrenciaAtualizada
            });
        }catch(error: unknown){
            const message = error instanceof Error ? error.message : String(error);
            res.status(400).json({ message });

        }
            
        }

        // Atualizar parte da ocorrência
    async partialUpdate(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body;
            const userId = (req.user as any)?.id;

            const updatedOcorrencia = await ocorrenciaService.partialUpdate(Number(id), data, userId);
            res.status(200).json({
                message: "Ocorrência atualizada parcialmente com sucesso",
                ocorrencia: updatedOcorrencia
            });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            if ((error as any)?.name === "ConflictError") {
                return res.status(409).json({ message });
            }
            res.status(500).json({ message: "Erro ao atualizar parcialmente ocorrência: " + message });
        }
    }  
}