import { AppDataSource } from "../config/data-source";
import { AIS } from "../models/AIS";

export const aisRepository = AppDataSource.getRepository(AIS);