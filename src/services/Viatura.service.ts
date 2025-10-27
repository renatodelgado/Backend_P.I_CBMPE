import { ViaturaRepository } from "../repositories/Viatura.repository";
import { Viatura } from "../entities/Viatura";

export class ViaturaService {
  async findAll(): Promise<Viatura[]> {
    return await ViaturaRepository.find();
  }

  async findById(id: number): Promise<Viatura | null> {
    return await ViaturaRepository.findOneBy({ id });
  }
};