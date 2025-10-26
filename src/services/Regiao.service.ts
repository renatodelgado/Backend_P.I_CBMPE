import { regiaoRepository } from "../repositories/Regiao.repository";
import { Regiao } from "../entities/Regiao";

export class RegiaoService {
  async findAll(): Promise<Regiao[]> {
    return await regiaoRepository.find();
  }

  async findById(id: number): Promise<Regiao | null> {
    return await regiaoRepository.findOneBy({ id });
  }
}
;