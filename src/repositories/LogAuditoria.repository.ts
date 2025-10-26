import { AppDataSource } from "../config/data-source";
import { LogAuditoria } from "../entities/LogAuditoria";

export const LogAuditoriaRepository = AppDataSource.getRepository(LogAuditoria)