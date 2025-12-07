import { AppDataSource } from "../config/data-source";
import { LogAuditoria } from "../entities/LogAuditoria";

// Retorna o repositório sob demanda para evitar chamadas a getRepository antes
// do AppDataSource estar inicializado (evita erros em import-time).
export const getLogAuditoriaRepository = () => AppDataSource.getRepository(LogAuditoria);