import { AppDataSource } from "../config/data-source";
import { Ocorrencia } from "../entities/Ocorrencia";

export const ocorrenciaRepository = AppDataSource.getRepository(Ocorrencia);