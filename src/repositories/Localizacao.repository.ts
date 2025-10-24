import { AppDataSource } from "../config/data-source";
import { Localizacao } from "../entities/Localizacao";

export const LocalizacaoRepository = AppDataSource.getRepository(Localizacao);
