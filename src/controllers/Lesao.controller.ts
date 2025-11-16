import { Request, Response } from "express";
import { LesaoService } from "../services/Lesao.service";


const lesaoService = new LesaoService();

export class LesaoController {

    async findAll(req: Request, res: Response) {
        const lesoes = await lesaoService.findAll();
        res.json(lesoes);
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params;
        const lesao = await lesaoService.findById(Number(id));
        if (lesao) {
            res.json(lesao);
        } else {
            res.status(404).json({ message: "Lesão não encontrada" });
        }
    }
};