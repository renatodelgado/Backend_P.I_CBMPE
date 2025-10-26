import { Request, Response } from "express";
import { AISService } from "../services/AIS.service"; 

const aisService = new AISService();

export class AISController {
  async findAll(req: Request, res: Response) {
    const ais = await aisService.findAll();
    res.json(ais);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const ais = await aisService.findById(Number(id));
    if (ais) {
      res.json(ais);
    } else {
      res.status(404).json({ message: "AIS não encontrada" });
    }
  }
};