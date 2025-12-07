import { LogAuditoria } from "../entities/LogAuditoria";
import { LogAuditoriaRepository } from "../repositories/LogAuditoria.repository";

export class LogAuditoriaService {

    async getAllLogs(): Promise<LogAuditoria[]> {
        return await LogAuditoriaRepository.find();
    }

    async getLogById(id: number): Promise<LogAuditoria | null> {
        return await LogAuditoriaRepository.findOneBy({ id });
    }

    async createLog(logData: Partial<LogAuditoria>): Promise<LogAuditoria> {
        const newLog = LogAuditoriaRepository.create(logData);
        return await LogAuditoriaRepository.save(newLog);
    }

    async getLogsByUserId(userId: number): Promise<LogAuditoria[]> {
        return await LogAuditoriaRepository.findBy({ usuario: { id: userId } });
    }
    

}