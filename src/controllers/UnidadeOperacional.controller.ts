import { Request, Response } from "express";
import { UnidadeOperacionalService } from "../services/UnidadeOperacional.service";

const unidadeOperacionalService = new UnidadeOperacionalService();

export class UnidadeOperacionalController {
  async findAll(req: Request, res: Response) {
    try {
      const unidades = await unidadeOperacionalService.findAll();
      return res.json(unidades);
    } catch (error) {
      console.error("Erro ao buscar unidades operacionais:", error);
      return res.status(500).json({ message: "Erro interno ao buscar unidades operacionais." });
    }
  }

    async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const unidade = await unidadeOperacionalService.findById(Number(id));
      if (unidade) {
        return res.json(unidade);
      } else {
        return res.status(404).json({ message: "Unidade operacional não encontrada." });
      }
    } catch (error) {
      console.error("Erro ao buscar unidade operacional:", error);
      return res.status(500).json({ message: "Erro interno ao buscar unidade operacional." });
    }
  }
};