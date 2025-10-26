import { viaturaRepository } from "../repositories/Viatura.repository";
import { Viatura } from "../entities/Viatura";

export class ViaturaService {
  async findAll(): Promise<Viatura[]> {
    return await viaturaRepository.find();
  }

  async findById(id: number): Promise<Viatura | null> {
    return await viaturaRepository.findOneBy({ id });
  }
};