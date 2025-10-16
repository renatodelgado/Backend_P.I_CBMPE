import { AppDataSource } from "../config/data-source";
import { Perfil } from "../models/Perfil";

export const perfilRepository = AppDataSource.getRepository(Perfil);
