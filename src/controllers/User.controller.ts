import { Request, Response } from "express";
import { UserService } from "../services/User.service";
import { Perfil } from "../entities/Perfil";
import { UnidadeOperacional } from "../entities/UnidadeOperacional";

const userService = new UserService();

export class UserController {
  async create(req: Request, res: Response) {
    try {
      const { nome, patente, funcao, email, senha, unidadeOperacional, perfil } = req.body;

      if (!nome || !patente || !funcao || !email || !senha || !unidadeOperacional || !perfil) {
        return res.status(400).json({ message: "Preencha todos os campos obrigatórios." });
      }

      const auditContext = {
        request_id: (req as any).requestId,
        actor_ip: req.ip || req.socket.remoteAddress,
        actor_user_agent: req.headers['user-agent'] as string | undefined,
      };

      const user = await userService.create({
        nome,
        patente,
        funcao,
        email,
        senha,
        unidadeOperacional,
        perfil,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as any, auditContext);

      return res.status(201).json(user);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      return res.status(500).json({ message: "Erro interno ao criar usuário." });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const users = await userService.findAll();
      return res.json(users);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      return res.status(500).json({ message: "Erro interno ao buscar usuários." });
    }
  }

  async findByMatricula(req: Request, res: Response) {
    try {
      const { matricula } = req.params;
      const user = await userService.findByMatricula(matricula);
      if (!user) return res.status(404).json({ message: "Usuário não encontrado." });
      return res.json(user);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      return res.status(500).json({ message: "Erro interno ao buscar usuário." });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await userService.findById(Number(id));
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }
      return res.json(user);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      return res.status(500).json({ message: "Erro interno ao buscar usuário." });
    }
  }

  async updatePassword(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { novaSenha } = req.body;

      if (!novaSenha) {
        return res.status(400).json({ message: "Nova senha é obrigatória." });
      }

      await userService.updatePassword(Number(id), novaSenha);
      return res.status(200).json({ message: "Senha atualizada com sucesso." });
    } catch (error) {
      console.error("Erro ao atualizar senha:", error);
      return res.status(500).json({ message: "Erro interno ao atualizar senha." });
    }
  }

  async updatePerfil(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { perfilId } = req.body;

      if (!perfilId) {
        return res.status(400).json({ message: "perfilId é obrigatório." });
      }

      const updated = await userService.updatePerfil(Number(id), Number(perfilId));
      return res.status(200).json({ message: "Perfil atualizado com sucesso.", user: updated });
    } catch (error: any) {
      console.error("Erro ao atualizar perfil:", error);
      return res.status(400).json({ message: error.message ?? "Erro interno ao atualizar perfil." });
    }
  }

  async salvarPushToken(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { pushToken } = req.body;

      if (!pushToken) {
        return res.status(400).json({ message: "pushToken é obrigatório." });
      }

      const updated = await userService.updatePushToken(Number(id), pushToken);
      return res.status(200).json({ message: "Push token atualizado com sucesso.", user: updated });
    } catch (error: any) {
      console.error("Erro ao atualizar push token:", error);
      return res.status(400).json({ message: error.message ?? "Erro interno ao atualizar push token." });
    }
  }
}