import { GrupoOcorrenciaRepository } from "../repositories/GrupoOcorrencia.repository";
import { GrupoOcorrencia } from "../entities/GrupoOcorrencia";

export class GrupoOcorrenciaService {
    
    
    async findAll(): Promise<GrupoOcorrencia[]> {
        return await GrupoOcorrenciaRepository.find(
            { relations: ['naturezaOcorrencia'] }
        );
    }

    async findById(id: number): Promise<GrupoOcorrencia | null> {
        return await GrupoOcorrenciaRepository.findOne(
            { where: { id }, relations: ['naturezaOcorrencia'] }
        );
    }

};