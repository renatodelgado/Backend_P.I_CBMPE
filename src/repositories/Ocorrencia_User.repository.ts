import { AppDataSource } from "../config/data-source";
import { OcorrenciaUser } from "../entities/Ocorrencia_User";

export const ocorrenciaUserRepository = AppDataSource.getRepository(OcorrenciaUser);