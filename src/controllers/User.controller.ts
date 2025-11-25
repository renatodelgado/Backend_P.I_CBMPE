import { Request, Response } from "express";
import { UserService } from "../services/User.service";
import { Perfil } from "../entities/Perfil";
import { UnidadeOperacional } from "../entities/UnidadeOperacional";

const userService = new UserService();

export class UserController {


  async create(req: Request, res: Response) {
  console.log("📩 Body recebido:", req.body);
  try {
    const { nome, matricula, cpf, patente, funcao, email, senha, unidadeOperacionalId, perfilId } = req.body;

    if (!nome || !matricula || !cpf || !patente || !funcao || !email || !senha || !unidadeOperacionalId || !perfilId) {
      return res.status(400).json({ message: "Preencha todos os campos obrigatórios." });
    }

    // Cria o usuário com os objetos relacionados
    const user = await userService.create({
      nome,
      matricula,
      cpf,
      patente,
      funcao,
      email,
      senha,
      perfil: { id: Number(perfilId) } as Perfil,
      unidadeOperacional: { id: Number(unidadeOperacionalId) } as UnidadeOperacional, 
    });

    return res.status(201).json(user);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
    return res.status(500).json({ message: "Erro interno ao criar usuário.", detail: errorMessage });
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
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }
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
}
