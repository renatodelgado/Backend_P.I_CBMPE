import { Request, Response } from "express";
import { RegiaoService } from "../services/Regiao.service";

const regiaoService = new RegiaoService();

export class RegiaoController {
  async findAll(req: Request, res: Response) {
    const regioes = await regiaoService.findAll();
    res.json(regioes);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const regiao = await regiaoService.findById(Number(id));
    if (regiao) {
      res.json(regiao);
    } else {
      res.status(404).json({ message: "Região não encontrada" });
    }
  }
}