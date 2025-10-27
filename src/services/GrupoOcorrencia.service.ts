import { GrupoOcorrenciaRepository } from "../repositories/GrupoOcorrencia.repository";
import { GrupoOcorrencia } from "../entities/GrupoOcorrencia";

export class GrupoOcorrenciaService {
    async findAll(): Promise<GrupoOcorrencia[]> {
        return await GrupoOcorrenciaRepository.find();
    }

    async findById(id: number): Promise<GrupoOcorrencia | null> {
        return await GrupoOcorrenciaRepository.findOneBy({ id });
    }

};