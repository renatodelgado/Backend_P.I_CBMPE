import { SubgrupoOcorrenciaRepository } from "../repositories/SubgrupoOcorrencia.repository";
import { SubgrupoOcorrencia } from "../entities/SubgrupoOcorrencia";

export class SubgrupoOcorrenciaService {
    async findAll(): Promise<SubgrupoOcorrencia[]> {
        return await SubgrupoOcorrenciaRepository.find();
    }

    async findById(id: number): Promise<SubgrupoOcorrencia | null> {
        return await SubgrupoOcorrenciaRepository.findOneBy({ id });
    }
};