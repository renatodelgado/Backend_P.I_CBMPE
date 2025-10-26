import { ocorrenciaRepository } from "../repositories/Ocorrencia.repository";
import { eventoEspecialRepository } from "../repositories/EventoEspecial.repository";

import { Ocorrencia } from "../entities/Ocorrencia";
import { Localizacao } from "../entities/Localizacao";
import { unidadeOperacionalRepository } from "../repositories/UnidadeOperacional.repository";
import { userRepository } from "../repositories/User.repository";
import { naturezaOcorrenciaRepository } from "../repositories/NaturezaOcorrencia.repository";
import { localizacaoRepository } from "../repositories/Localizacao.repository";

export class OcorrenciaService {

    // Criar uma ocorrência
    async create(data: any) {

        // 🗺️ Verifica ou cria a localização
        let localizacao: Localizacao | undefined = undefined;

        if (data.localizacaoId) {
            const foundLocalizacao = await localizacaoRepository.findOneBy({ id: data.localizacaoId });
            if (!foundLocalizacao) throw new Error("Localização não encontrada");
            localizacao = foundLocalizacao;
        } else if (data.localizacao) {
            localizacao = localizacaoRepository.create({
                municipio: data.localizacao.municipio,
                bairro: data.localizacao.bairro,
                logradouro: data.localizacao.logradouro,
                numero: data.localizacao.numero,
                complemento: data.localizacao.complemento,
                pontoReferencia: data.localizacao.pontoReferencia,
                latitude: data.localizacao.latitude,
                longitude: data.localizacao.longitude
            });
            await localizacaoRepository.save(localizacao);
        } else {
            throw new Error("Localização é obrigatória");
        }

        // 🧩 Busca entidades relacionadas obrigatórias
        const unidadeOperacional = await unidadeOperacionalRepository.findOneBy({ id: data.unidadeOperacionalId });
        if (!unidadeOperacional) throw new Error("Unidade operacional não encontrada");

        const usuario = await userRepository.findOneBy({ id: data.usuarioId });
        if (!usuario) throw new Error("Usuário não encontrado");

        const naturezaOcorrencia = await naturezaOcorrenciaRepository.findOneBy({ id: data.naturezaOcorrenciaId });
        if (!naturezaOcorrencia) throw new Error("Natureza de ocorrência não encontrada");

        // Evento especial é opcional
        let eventoEspecial: any = undefined;
        if (data.eventoEspecialId) {
            const foundEvento = await eventoEspecialRepository.findOneBy({ id: data.eventoEspecialId });
            if (foundEvento) eventoEspecial = foundEvento;
        }

        // 🔗 Monta o objeto final
        const ocorrencia = ocorrenciaRepository.create({
            numeroOcorrencia: data.numeroOcorrencia,
            dataHoraChamada: data.dataHoraChamada,
            statusAtendimento: data.statusAtendimento,
            motivoNaoAtendimento: data.motivoNaoAtendimento,
            descricao: data.descricao,
            formaAcionamento: data.formaAcionamento,
            dataSincronizacao: data.dataSincronizacao ?? undefined,
            unidadeOperacional,
            usuario,
            eventoEspecial,
            localizacao,
            naturezaOcorrencia
        });

        // 💾 Salva no banco
        return await ocorrenciaRepository.save(ocorrencia);
    }

    // Buscar todas as ocorrências
    async findAll() {
        return await ocorrenciaRepository.find({
            relations: [
                "naturezaOcorrencia",
                "grupoOcorrencia",
                "subgrupoOcorrencia",
                "viatura",
                "localizacao",
                "usuario",
                "unidadeOperacional",
                "anexos"
            ],
            order: { dataHoraChamada: "DESC" }
        });
    }

    // Buscar uma ocorrência
    async findById(id: number) {
        const ocorrencia = await ocorrenciaRepository.findOne({
            where: { id },
            relations: [
                "unidadeOperacional",
                "usuario",
                "eventoEspecial",
                "localizacao",
                "naturezaOcorrencia"
            ]
        });
        if (!ocorrencia) throw new Error("Ocorrência não encontrada");
        return ocorrencia;
    }

    // Atualizar uma ocorrência
    async update(id: number, data: Partial<Ocorrencia>) {
        const ocorrencia = await this.findById(id);

        // Atualiza localização
        if (data.localizacao) {
            Object.assign(ocorrencia.localizacao, data.localizacao);
        }

        Object.assign(ocorrencia, data);
        return await ocorrenciaRepository.save(ocorrencia);
    }

    // Deletar
    async delete(id: number) {
        const ocorrencia = await this.findById(id);
        return await ocorrenciaRepository.remove(ocorrencia);
    }
}
