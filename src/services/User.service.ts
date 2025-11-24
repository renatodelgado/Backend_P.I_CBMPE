import { userRepository } from "../repositories/User.repository";
import { User } from "../entities/User";
import { auditService } from "./Audit.service";

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

      const newUser = userRepository.create({
        ...userdata,
        matricula,
      });

      const savedUser = await userRepository.save(newUser);

      // AUDIT SUCCESS
      await auditService.logEvent({
        request_id: auditContext?.request_id,
        event_type: "user_management",
        actor: {
          ip: auditContext?.actor_ip,
          user_agent: auditContext?.actor_user_agent,
        },
        action: "create_user",
        resource: "User",
        resource_id: savedUser.matricula,
        outcome: "success",
        changes: {
          before: null,
          after: {
            matricula: savedUser.matricula,
            nome: savedUser.nome,
            email: savedUser.email,
            patente: savedUser.patente,
            funcao: savedUser.funcao,
            senha: "[PROTECTED]",
          },
        },
      });

      return savedUser;
    } catch (error: any) {
      await auditService.logEvent({
        request_id: auditContext?.request_id,
        event_type: "user_management",
        actor: { ip: auditContext?.actor_ip, user_agent: auditContext?.actor_user_agent },
        action: "create_user",
        resource: "User",
        outcome: "error",
        metadata: { error: error?.message },
      });
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
}
