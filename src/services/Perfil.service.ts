import { perfilRepository } from "../repositories/Perfil.repository";
import { Perfil } from "../entities/Perfil";

export class PerfilService {
  async findAll(): Promise<Perfil[]> {
    return await perfilRepository.find();
  }

  async findById(id: number): Promise<Perfil | null> {
    return await perfilRepository.findOneBy({ id });
  }
};