import { NaturezaOcorrencia } from "../entities/NaturezaOcorrencia";
import { naturezaOcorrenciaRepository } from "../repositories/NaturezaOcorrencia.repository";


export class NaturezaOcorrenciaService {
  async findAll(): Promise<NaturezaOcorrencia[]> {
    return await naturezaOcorrenciaRepository.find();
  }

    async findById(id: number): Promise<NaturezaOcorrencia | null> {
    return await naturezaOcorrenciaRepository.findOneBy({ id });
  }
};