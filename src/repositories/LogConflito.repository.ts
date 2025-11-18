import { AppDataSource } from "../config/data-source";
import { LogConflito } from "../entities/LogConflito";

export const LogConflitoRepository = AppDataSource.getRepository(LogConflito);