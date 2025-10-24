import { AppDataSource } from "../config/data-source";
import { Ocorrencia } from "../entities/Ocorrencia";

export const OcorrenciaRepository = AppDataSource.getRepository(Ocorrencia);