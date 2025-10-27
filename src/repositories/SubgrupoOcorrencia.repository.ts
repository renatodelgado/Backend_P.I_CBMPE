import { AppDataSource } from "../config/data-source";
import { SubgrupoOcorrencia } from "../entities/SubgrupoOcorrencia";

export const SubgrupoOcorrenciaRepository = AppDataSource.getRepository(SubgrupoOcorrencia)