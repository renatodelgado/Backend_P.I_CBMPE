import { VitimaRepository } from "../repositories/Vitima.repository";
import { Vitima } from "../entities/Vitima";
import { ocorrenciaRepository } from "../repositories/Ocorrencia.repository";

export class VitimaService {

	// Cria uma vítima. `data` pode conter `ocorrenciaId` (opcional) para relacionar.
	async create(data: any) {
		// validações mínimas
		if (typeof data.temVitima !== "boolean") {
			throw new Error("campo 'temVitima' é obrigatório e deve ser booleano");
		}

		if (!data.nome) {
			throw new Error("campo 'nome' é obrigatório");
		}

		if (!data.condicaoVitima) {
			throw new Error("campo 'condicaoVitima' é obrigatório");
		}

		if (!data.tipoAtendimento) {
			throw new Error("campo 'tipoAtendimento' é obrigatório");
		}

		// ocorrência é obrigatória para criar vítima
		if (!data.ocorrenciaId) {
			throw new Error("campo 'ocorrenciaId' é obrigatório");
		}

		const ocorrencia = await ocorrenciaRepository.findOneBy({ id: data.ocorrenciaId });
		if (!ocorrencia) throw new Error("Ocorrência não encontrada");

		const vitimaToSave: any = {
			temVitima: data.temVitima,
			cpfVitima: data.cpfVitima ?? null,
			nome: data.nome,
			idade: data.idade ?? null,
			sexo: data.sexo ?? null,
			condicaoVitima: data.condicaoVitima,
			tipoAtendimento: data.tipoAtendimento,
			observacoes: data.observacoes ?? null,
			etnia: data.etnia ?? null,
			destinoVitima: data.destinoVitima ?? null,
			ocorrencia
		};

		return await VitimaRepository.save(vitimaToSave);
	}



	// Retorna todas as vítimas
	async findAll() {
		return await VitimaRepository.find({ relations: ["ocorrencia"] });
	}

	// Retorna vítimas pela ocorrência (ocorrenciaId obrigatório)
	async findByOcorrenciaId(ocorrenciaId: number) {
		if (!ocorrenciaId) throw new Error("ocorrenciaId é obrigatório");
		return await VitimaRepository.find({
			where: { ocorrencia: { id: ocorrenciaId } as any },
			relations: ["ocorrencia"]
		});
	}

}




