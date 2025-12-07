import { Request, Response } from "express";
import { LogAuditoriaService } from "../services/LogAuditoria.service";


const logAuditoriaService = new LogAuditoriaService();

export class LogAuditoriaController {
    async getAllLogs(req: Request, res: Response) {
        try {
            const logs = await logAuditoriaService.getAllLogs();
            res.status(200).json(logs);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            res.status(400).json({ message });
        }
    }

    async getLogById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const log = await logAuditoriaService.getLogById(Number(id));
            if (log) {
                res.status(200).json(log);
            } else {
                res.status(404).json({ message: "Log de auditoria não encontrado" });
            }
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            res.status(400).json({ message });
        }
    };

    async getLogsByUserId(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const logs = await logAuditoriaService.getLogsByUserId(Number(userId));
            res.status(200).json(logs);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            res.status(400).json({ message });
        }
    };

    async createLog(req: Request, res: Response) {
        try {
            const logData = req.body;
            const newLog = await logAuditoriaService.createLog(logData);
            res.status(201).json(newLog);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            res.status(400).json({ message });
        }
    };
}