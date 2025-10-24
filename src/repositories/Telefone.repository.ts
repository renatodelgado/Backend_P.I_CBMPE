import { AppDataSource } from "../config/data-source";
import { Telefone } from "../entities/Telefone";

export const telefoneRepository = AppDataSource.getRepository(Telefone);