import { unidadeOperacionalRepository } from "../repositories/UnidadeOperacional.repository";
import { UnidadeOperacional } from "../entities/UnidadeOperacional";

export class UnidadeOperacionalService {
  async findAll(): Promise<UnidadeOperacional[]> {
    return await unidadeOperacionalRepository.find();
  }

  async findById(id: number): Promise<UnidadeOperacional | null> {
    return await unidadeOperacionalRepository.findOneBy({ id });
  }
};