import { AppDataSource } from "../config/data-source";
import { Regiao } from "../entities/Regiao";

export const regiaoRepository = AppDataSource.getRepository(Regiao);