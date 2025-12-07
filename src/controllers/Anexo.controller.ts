import { Request, Response } from "express";
import { AnexoService } from "../services/Anexo.service";


const anexoService = new AnexoService();

export class AnexoController {
    async deleteAnexo(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const result = await anexoService.deleteAnexo(Number(id));
            res.json(result);
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            res.status(404).json({ message });
        }
    }
};