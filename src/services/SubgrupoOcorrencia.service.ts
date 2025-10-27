import { SubgrupoOcorrenciaRepository } from "../repositories/SubgrupoOcorrencia.repository";
import { SubgrupoOcorrencia } from "../entities/SubgrupoOcorrencia";

export class SubgrupoOcorrenciaService {
    async findAll(): Promise<SubgrupoOcorrencia[]> {
        return await SubgrupoOcorrenciaRepository.find(
            { relations: ['grupoOcorrencia'] }
        );
    }

    async findById(id: number): Promise<SubgrupoOcorrencia | null> {
        return await SubgrupoOcorrenciaRepository.findOne(
            { where: { id }, relations: ['grupoOcorrencia'] }
        );
    }
};