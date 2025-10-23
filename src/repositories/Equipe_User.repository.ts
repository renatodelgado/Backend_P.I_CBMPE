import { AppDataSource } from "../config/data-source";
import { EquipeUser } from "../entities/Equipe_User";

export const equipeUserRepository = AppDataSource.getRepository(EquipeUser);