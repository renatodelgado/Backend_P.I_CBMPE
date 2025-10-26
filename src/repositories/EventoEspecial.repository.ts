import { AppDataSource } from "../config/data-source";
import { EventoEspecial } from "../entities/EventoEspecial";

export const eventoEspecialRepository = AppDataSource.getRepository(EventoEspecial);