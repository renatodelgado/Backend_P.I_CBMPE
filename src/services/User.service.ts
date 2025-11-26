import { userRepository } from "../repositories/User.repository";
import { perfilRepository } from "../repositories/Perfil.repository";
import { User } from "../entities/User";
import bcrypt from "bcrypt";

export class UserService {
  async create(userdata: Partial<User>): Promise<User> {
    // Hash da senha
    const senhaHasheada = await bcrypt.hash(userdata.senha as string, 10);

    const newUser = userRepository.create({
      ...userdata,
      senha: senhaHasheada,
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

  async updatePassword(id: number, novaSenha: string): Promise<void> {
    const user = await userRepository.findOne({ where: { id } });
    
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const senhaHasheada = await bcrypt.hash(novaSenha, 10);
    user.senha = senhaHasheada;
    
    await userRepository.save(user);
  }

  async updatePerfil(id: number, perfilId: number): Promise<any> {
    const user = await userRepository.findOne({ where: { id }, relations: ["perfil", "unidadeOperacional"] });
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const perfil = await perfilRepository.findOneBy({ id: perfilId });
    if (!perfil) {
      throw new Error("Perfil não encontrado");
    }

    user.perfil = perfil;
    const saved = await userRepository.save(user);

    return {
      id: saved.id,
      nome: saved.nome,
      matricula: saved.matricula,
      perfil: { id: saved.perfil?.id, nome: saved.perfil?.nome },
      unidadeOperacional: { id: saved.unidadeOperacional?.id, nome: saved.unidadeOperacional?.nome }
    };
  }
}
