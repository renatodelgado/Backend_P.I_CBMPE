import { AppDataSource } from "../config/data-source";
import { GrupoOcorrencia } from "../entities/GrupoOcorrencia";

export const GrupoOcorrenciaRepository = AppDataSource.getRepository(GrupoOcorrencia)