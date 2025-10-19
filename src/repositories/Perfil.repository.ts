import { AppDataSource } from "../config/data-source";
import { Perfil } from "../entities/Perfil";

export const perfilRepository = AppDataSource.getRepository(Perfil);
