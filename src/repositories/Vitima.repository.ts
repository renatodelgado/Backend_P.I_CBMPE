import { AppDataSource } from "../config/data-source";
import { Vitima } from "../entities/Vitima";

export const VitimaRepository = AppDataSource.getRepository(Vitima)