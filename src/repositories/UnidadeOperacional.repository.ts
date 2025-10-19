import { AppDataSource } from "../config/data-source";
import { UnidadeOperacional } from "../entities/UnidadeOperacional";

export const unidadeOperacionalRepository = AppDataSource.getRepository(UnidadeOperacional);