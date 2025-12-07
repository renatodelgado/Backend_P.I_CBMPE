import { userRepository } from "../repositories/User.repository";
import { perfilRepository } from "../repositories/Perfil.repository";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import { LogAuditoriaService } from "./LogAuditoria.service";

export class UserService {
  async create(
    userdata: Omit<User, "matricula">,
    auditContext?: { request_id?: string; actor_ip?: string; actor_user_agent?: string }
  ): Promise<User> {
    try {
      const lastUser = await userRepository
        .createQueryBuilder("user")
        .orderBy("user.matricula", "DESC")
        .getOne();

      const nextNumber = lastUser ? Number(lastUser.matricula.replace(/\D/g, "")) + 1 : 1;
      const prefix = "CBMPE";
      const matricula = `${prefix}${nextNumber.toString().padStart(5, "0")}`;

      // Hash da senha
      const senhaHasheada = await bcrypt.hash(userdata.senha as string, 10);

      const newUser = userRepository.create({
        ...userdata,
        matricula,
        senha: senhaHasheada,
      });

      const savedUser = await userRepository.save(newUser);

      // AUDIT SUCCESS - grava diretamente na tabela legada `log_auditoria`
      try {
        const logService = new LogAuditoriaService();
        const actorId = auditContext?.actor_ip ? auditContext?.actor_ip : undefined;
        // Preferir o actor_user_id (quem fez a ação). Se não houver (ex.: auto-criação), usar o próprio usuário criado.
        const usuarioField = auditContext && (auditContext as any).actor_user_id ? ({ id: isNaN(Number((auditContext as any).actor_user_id)) ? (auditContext as any).actor_user_id : Number((auditContext as any).actor_user_id) } as any) : ({ id: savedUser.id } as any);

        const legPayload: Partial<any> = {
          acao: "create_user",
          recurso: "User",
          detalhes: JSON.stringify({ request_id: auditContext?.request_id, resource_id: savedUser.matricula, changes: { before: null, after: { matricula: savedUser.matricula, nome: savedUser.nome, email: savedUser.email, patente: savedUser.patente, funcao: savedUser.funcao } } }),
          ip: auditContext?.actor_ip ?? null,
          userAgent: String(auditContext?.actor_user_agent ?? ''),
          justificativa: null,
          usuario: usuarioField
        };
        await logService.createLog(legPayload);
      } catch (err: any) {
        console.error('Falha ao gravar log_auditoria (create user):', err?.message ?? err);
      }

      return savedUser;
    } catch (error: any) {
      try {
        const logService = new LogAuditoriaService();
        const legPayload: Partial<any> = {
          acao: "create_user",
          recurso: "User",
          detalhes: JSON.stringify({ request_id: auditContext?.request_id, error: error?.message }),
          ip: auditContext?.actor_ip ?? null,
          userAgent: String(auditContext?.actor_user_agent ?? ''),
          justificativa: null,
        };
        await logService.createLog(legPayload);
      } catch (err2: any) {
        console.error('Falha ao gravar log_auditoria (create user error):', err2?.message ?? err2);
      }
      throw error;
    }
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

  async updatePushToken(id: number, pushToken: string): Promise<void> {
    const user = await userRepository.findOne({ where: { id } }); 
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    user.pushToken = pushToken;
    await userRepository.save(user);
  }
}