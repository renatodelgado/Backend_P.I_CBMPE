import { Request, Response } from "express";
import { LogConflitoService } from "../services/LogConflito.service";

export class LogConflitoController {

  async listar(req: Request, res: Response) {
    const service = new LogConflitoService();
    const logs = await service.listar();
    return res.json(logs);
  }
}