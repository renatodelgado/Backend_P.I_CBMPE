import { AppDataSource } from "../config/data-source";
import { Lesao } from "../entities/Lesao";

export const LesaoRepository = AppDataSource.getRepository(Lesao)