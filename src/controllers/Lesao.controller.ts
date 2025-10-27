import { Request, Response } from "express";
import { LesaoService } from "../services/Lesao.service";


const lesaoService = new LesaoService();

export class LesaoController {

    async findAll(req: Request, res: Response) {
        const lesoes = await LesaoService.findAll();
        return res.json(lesoes);
    }
}
