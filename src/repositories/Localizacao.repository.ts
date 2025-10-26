import { AppDataSource } from "../config/data-source";
import { Localizacao } from "../entities/Localizacao";

export const localizacaoRepository = AppDataSource.getRepository(Localizacao);
