import { AppDataSource } from "../config/data-source";
import { Anexo } from "../entities/Anexo";

export const AnexoRepository = AppDataSource.getRepository(Anexo)