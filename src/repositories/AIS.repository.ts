import { AppDataSource } from "../config/data-source";
import { AIS } from "../entities/AIS";

export const aisRepository = AppDataSource.getRepository(AIS);