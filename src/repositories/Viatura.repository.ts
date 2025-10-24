import { AppDataSource } from "../config/data-source";
import { Viatura } from "../entities/Viatura";

export const viaturaRepository = AppDataSource.getRepository(Viatura);