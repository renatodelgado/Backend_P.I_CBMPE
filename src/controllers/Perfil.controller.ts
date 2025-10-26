import { Request, Response } from "express";
import { PerfilService } from "../services/Perfil.service";

const perfilService = new PerfilService();

export class PerfilController {
  async findAll(req: Request, res: Response): Promise<void> {
    const perfis = await perfilService.findAll();
    res.json(perfis);
  }

  async findById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const perfil = await perfilService.findById(Number(id));
    if (perfil) {
      res.json(perfil);
    } else {
      res.status(404).json({ message: "Perfil não encontrado" });
    }
  }
}