import { AIS } from "../entities/AIS";
import { aisRepository } from "../repositories/AIS.repository";

export class AISService {
  async findAll(): Promise<AIS[]> {
    return aisRepository.find();
  }

  async findById(id: number): Promise<AIS | null> {
    return aisRepository.findOne({ where: { id } });
  }
};