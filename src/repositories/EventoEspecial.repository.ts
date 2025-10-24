import { AppDataSource } from "../config/data-source";
import { EventoEspecial } from "../entities/EventoEspecial";

export const EventoEspecialRepository = AppDataSource.getRepository(EventoEspecial);