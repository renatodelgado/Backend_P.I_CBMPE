import { AppDataSource } from "../config/data-source";
import { Equipe } from "../entities/Equipe";

export const equipeRepository = AppDataSource.getRepository(Equipe);