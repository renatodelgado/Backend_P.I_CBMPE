import { AppDataSource } from "../config/data-source";
import { UnidadeOperacional } from "../models/UnidadeOperacional";

export const unidadeOperacionalRepository = AppDataSource.getRepository(UnidadeOperacional);