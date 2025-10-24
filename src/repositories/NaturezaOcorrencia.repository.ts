import { AppDataSource } from "../config/data-source";
import { NaturezaOcorrencia } from "../entities/NaturezaOcorrencia";

export const naturezaOcorrenciaRepository = AppDataSource.getRepository(NaturezaOcorrencia);
