import { AppDataSource } from "../config/data-source";
import { VitimaLesao } from "../entities/Vitima_Lesao";

export const VitimaLesaoRepository = AppDataSource.getRepository(VitimaLesao)