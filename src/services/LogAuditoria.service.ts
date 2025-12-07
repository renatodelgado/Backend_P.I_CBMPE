import { LogAuditoria } from "../entities/LogAuditoria";
import { getLogAuditoriaRepository } from "../repositories/LogAuditoria.repository";

export class LogAuditoriaService {

    async getAllLogs(): Promise<LogAuditoria[]> {
        const repo = getLogAuditoriaRepository();
        return await repo.find();
    }

    async getLogById(id: number): Promise<LogAuditoria | null> {
        const repo = getLogAuditoriaRepository();
        return await repo.findOneBy({ id });
    }

    async createLog(logData: Partial<LogAuditoria>): Promise<LogAuditoria> {
        const repo = getLogAuditoriaRepository();
        const newLog = repo.create(logData as any);
        return await repo.save(newLog as any);
    }

    async getLogsByUserId(userId: number): Promise<LogAuditoria[]> {
        const repo = getLogAuditoriaRepository();
        return await repo.findBy({ usuario: { id: userId } } as any);
    }
    

}