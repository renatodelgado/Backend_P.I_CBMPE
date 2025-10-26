import { Request, Response } from "express";
import { ViaturaService } from "../services/Viatura.service";

const viaturaService = new ViaturaService();

export class ViaturaController {

    async findAll(req: Request, res: Response) {
        const viaturas = await viaturaService.findAll();
        res.json(viaturas);
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params;
        const viatura = await viaturaService.findById(Number(id));
        if (viatura) {
            res.json(viatura);
        } else {
            res.status(404).json({ message: "Viatura não encontrada" });
        }
    }
};