import { userRepository } from "../repositories/User.repository";
import { User } from "../entities/User";

export class UserService {
  async create(userdata: Partial<User>): Promise<User> {
    const lastUser = await userRepository
      .createQueryBuilder("user")
      .orderBy("user.matricula", "DESC")
      .getOne();

    const nextNumber = lastUser
      ? Number(lastUser.matricula.replace(/\D/g, '')) + 1
      : 1;

    const prefix = "CBMPE";

    const matricula = `${prefix}${nextNumber.toString().padStart(5, '0')}`;

    const newUser = userRepository.create({
      ...userdata,
      matricula,
    });

    return await userRepository.save(newUser);
  }

  async findAll(): Promise<any[]> {
    const users = await userRepository.find({
      relations: ["perfil", "unidadeOperacional"], // 🔹 inclui relações
    });

    // Retornar apenas IDs das relações
    return users.map(u => ({
      id: u.id,
      nome: u.nome,
      matricula: u.matricula,
      cpf: u.cpf,
      patente: u.patente,
      funcao: u.funcao,
      email: u.email,
      perfil: { id: u.perfil?.id, nome: u.perfil?.nome },
      unidadeOperacional: { id: u.unidadeOperacional?.id, nome: u.unidadeOperacional?.nome },
      status: u.status,
      ultimoAcesso: u.ultimoAcesso,
    }));
  }

  async findByMatricula(matricula: string): Promise<any | null> {
    const user = await userRepository.findOne({
      where: { matricula },
      relations: ["perfil", "unidadeOperacional"],
    });

    if (!user) return null;

    return {
      id: user.id,
      nome: user.nome,
      matricula: user.matricula,
      email: user.email,
      perfil: { id: user.perfil?.id, nome: user.perfil?.nome },
      unidadeOperacional: { id: user.unidadeOperacional?.id, nome: user.unidadeOperacional?.nome },
      status: user.status ?? "Ativo",
      ultimoAcesso: user.ultimoAcesso ?? "-",
    };
  }

  async findById(id: number): Promise<any | null> {
    const user = await userRepository.findOne({
      where: { id },
      relations: ["perfil", "unidadeOperacional"],
    });
    if (!user) return null;

    return {
      id: user.id,
      nome: user.nome,
      matricula: user.matricula,
      email: user.email,
      perfil: { id: user.perfil?.id, nome: user.perfil?.nome },
      unidadeOperacional: { id: user.unidadeOperacional?.id, nome: user.unidadeOperacional?.nome },
      status: user.status ?? "Ativo",
      ultimoAcesso: user.ultimoAcesso ?? "-",
    };
  }
}