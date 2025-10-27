import { ocorrenciaRepository } from "../repositories/Ocorrencia.repository";
import { eventoEspecialRepository } from "../repositories/EventoEspecial.repository";
import { unidadeOperacionalRepository } from "../repositories/UnidadeOperacional.repository";
import { userRepository } from "../repositories/User.repository";
import { naturezaOcorrenciaRepository } from "../repositories/NaturezaOcorrencia.repository";
import { GrupoOcorrenciaRepository } from "../repositories/GrupoOcorrencia.repository";
import { ViaturaRepository } from "../repositories/Viatura.repository";
import { localizacaoRepository } from "../repositories/Localizacao.repository";
import { Ocorrencia } from "../entities/Ocorrencia";
import { Localizacao } from "../entities/Localizacao";
import { SubgrupoOcorrenciaRepository } from "../repositories/SubgrupoOcorrencia.repository";
import { AnexoRepository } from "../repositories/Anexo.repository";

export class OcorrenciaService {

    // Criar uma ocorrência
    async create(data: any) {
        // 🗺️ Localização
        let localizacao: Localizacao | undefined = undefined;
        if (data.localizacaoId) {
            const foundLocalizacao = await localizacaoRepository.findOneBy({ id: data.localizacaoId });
            if (!foundLocalizacao) throw new Error("Localização não encontrada");
            localizacao = foundLocalizacao;
        } else if (data.localizacao) {
            const locInput = Array.isArray(data.localizacao) ? data.localizacao[0] : data.localizacao;
            if (!locInput) throw new Error("Localização é obrigatória");

            // ensure we pass a single object (not an array) and satisfy the repository.create typing
            localizacao = localizacaoRepository.create(locInput as Partial<Localizacao>);
            await localizacaoRepository.save(localizacao);

        } else {
            throw new Error("Localização é obrigatória");
        }

        // 🧩 Entidades obrigatórias
        const unidadeOperacional = await unidadeOperacionalRepository.findOneBy({ id: data.unidadeOperacionalId });
        if (!unidadeOperacional) throw new Error("Unidade operacional não encontrada");

        const usuario = await userRepository.findOneBy({ id: data.usuarioId });
        if (!usuario) throw new Error("Usuário não encontrado");

        const naturezaOcorrencia = await naturezaOcorrenciaRepository.findOneBy({ id: data.naturezaOcorrenciaId });
        if (!naturezaOcorrencia) throw new Error("Natureza de ocorrência não encontrada");

        const grupoOcorrencia = await GrupoOcorrenciaRepository.findOneBy({ id: data.grupoOcorrenciaId });
        if (!grupoOcorrencia) throw new Error("Grupo de ocorrência não encontrado");

        // Entidades opcionais
        let subgrupoOcorrencia = undefined;
        if (data.subgrupoOcorrenciaId) {
            subgrupoOcorrencia = await SubgrupoOcorrenciaRepository.findOneBy({ id: data.subgrupoOcorrenciaId });
        }

        let viatura = undefined;
        if (data.viaturaId) {
            viatura = await ViaturaRepository.findOneBy({ id: data.viaturaId });
        }

        let eventoEspecial = undefined;
        if (data.eventoEspecialId) {
            eventoEspecial = await eventoEspecialRepository.findOneBy({ id: data.eventoEspecialId });
        }

        // 🔗 Cria ocorrência
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
            naturezaOcorrencia,
            grupoOcorrencia,
            subgrupoOcorrencia,
            viatura
        } as any);

    // 💾 Salva a ocorrência primeiro
    const savedOcorrencia = await ocorrenciaRepository.save(ocorrencia) as unknown as Ocorrencia;

    // 📎 Salva anexos se existirem
    if (data.anexos && Array.isArray(data.anexos)) {
        const anexos = data.anexos.map((a: any) =>
    AnexoRepository.create({
        tipoArquivo: a.tipoArquivo,      // ex: "imagem" ou "arquivo"
        urlArquivo: a.urlArquivo,        // URL do arquivo
        nomeArquivo: a.nomeArquivo,      // nome do arquivo
        extensaoArquivo: a.extensaoArquivo, // extensão do arquivo
        descricao: a.descricao,          // opcional
        ocorrencia: savedOcorrencia
    } as any)
);
await AnexoRepository.save(anexos);
(savedOcorrencia as any).anexos = anexos;

    }

    return savedOcorrencia;
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
                "eventoEspecial",
                "anexos"
            ],
            order: { dataHoraChamada: "DESC" }
        });
    }

    // Buscar uma ocorrência pelo ID
    async findById(id: number) {
        const ocorrencia = await ocorrenciaRepository.findOne({
            where: { id },
            relations: [
                "naturezaOcorrencia",
                "grupoOcorrencia",
                "subgrupoOcorrencia",
                "viatura",
                "localizacao",
                "usuario",
                "unidadeOperacional",
                "eventoEspecial",
                "anexos"
            ]
        });
        if (!ocorrencia) throw new Error("Ocorrência não encontrada");
        return ocorrencia;
    }

    // Atualizar uma ocorrência
    async update(id: number, data: Partial<Ocorrencia>) {
        const ocorrencia = await this.findById(id);

        // Atualiza relações se passadas
        if (data.localizacao) {
            Object.assign(ocorrencia.localizacao, data.localizacao);
            await localizacaoRepository.save(ocorrencia.localizacao);
        }

        if ((data as any).naturezaOcorrenciaId) {
            const nat = await naturezaOcorrenciaRepository.findOneBy({ id: (data as any).naturezaOcorrenciaId });
            if (!nat) throw new Error("Natureza de ocorrência não encontrada");
            ocorrencia.naturezaOcorrencia = nat;
        }

        if ((data as any).grupoOcorrenciaId) {
            const grp = await GrupoOcorrenciaRepository.findOneBy({ id: (data as any).grupoOcorrenciaId });
            if (!grp) throw new Error("Grupo de ocorrência não encontrado");
            ocorrencia.grupoOcorrencia = grp;
        }

        if ((data as any).subgrupoOcorrenciaId) {
            const sub = await SubgrupoOcorrenciaRepository.findOneBy({ id: (data as any).subgrupoOcorrenciaId });
            ocorrencia.SubgrupoOcorrencia = sub ?? null;
        }

        if ((data as any).viaturaId) {
            const viu = await ViaturaRepository.findOneBy({ id: (data as any).viaturaId });
            ocorrencia.Viatura = viu ?? null;
        }

        Object.assign(ocorrencia, data);
        return await ocorrenciaRepository.save(ocorrencia);
    }

    // Deletar ocorrência
    async delete(id: number) {
        const ocorrencia = await this.findById(id);
        return await ocorrenciaRepository.remove(ocorrencia);
    }
}
