import { Request, Response } from "express";
import { VitimaService } from "../services/Vitima.service";

const vitimaService = new VitimaService();

export class VitimaController {
	async create(req: Request, res: Response) {
        const { cpfVitima, nome, idade, sexo, tipoAtendimento, observacoes, etnia, destinoVitima, ocorrenciaId, lesaoId } = req.body;
		const vitima = await vitimaService.create(req.body);
		return res.status(201).json(vitima);
	}

	async findAll(req: Request, res: Response) {
		const vitimas = await vitimaService.findAll();
		return res.json(vitimas);
	}

	async findVitimasByOcorrenciaId(req: Request, res: Response) {
		const { ocorrenciaId } = req.params;
		const vitimas = await vitimaService.findVitimasByOcorrenciaId(Number(ocorrenciaId));
		return res.json(vitimas);
	}
}

