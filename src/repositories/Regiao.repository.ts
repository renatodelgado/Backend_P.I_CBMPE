import { AppDataSource } from "../config/data-source";
import { Regiao } from "../models/Regiao";

export const regiaoRepository = AppDataSource.getRepository(Regiao);