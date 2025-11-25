import { ocorrenciaUserRepository } from "../repositories/Ocorrencia_User.repository";
import { ocorrenciaRepository } from "../repositories/Ocorrencia.repository";
import { userRepository } from "../repositories/User.repository";
import { OcorrenciaUser } from "../entities/Ocorrencia_User";

export class OcorrenciaUserService {
    // Relaciona um usuário a uma ocorrência
    async relateUserToOcorrencia(data: any) {
        // validações mínimas
        if (!data.ocorrenciaId) {
            throw new Error("campo 'ocorrenciaId' é obrigatório");
        }
        if (!data.userId) {
            throw new Error("campo 'userId' é obrigatório");
        }
        const ocorrencia = await ocorrenciaRepository.findOneBy({ id: data.ocorrenciaId });
        if (!ocorrencia) throw new Error("Ocorrência não encontrada");
        const user = await userRepository.findOneBy({ id: data.userId });
        if (!user) throw new Error("Usuário não encontrado");
        // Verifica se a relação já existe
        const existe = await ocorrenciaUserRepository.findOneBy({ ocorrenciaId: data.ocorrenciaId, userId: data.userId });
        if (existe) throw new Error("Relação entre usuário e ocorrência já existe");

        // Cria e salva a relação
        const ocorrenciaUser: OcorrenciaUser = ocorrenciaUserRepository.create({
            ocorrenciaId: data.ocorrenciaId,
            userId: data.userId,
            ocorrencia,
            user
        });

        const saved = await ocorrenciaUserRepository.save(ocorrenciaUser);
        return saved;
    }

    // Retorna todos os usuários relacionados a uma ocorrência
    async getUsersByOcorrencia(ocorrenciaId: number) {
        if (!ocorrenciaId) throw new Error("campo 'ocorrenciaId' é obrigatório");

        const rels = await ocorrenciaUserRepository.find({
            where: { ocorrenciaId },
            relations: ["user"]
        });

        // Extrai e retorna apenas os usuários
        return rels.map(r => r.user);
    }

    // Retorna todas as ocorrências relacionadas a um usuário
    async getOcorrenciasByUser(userId: number) {
        if (!userId) throw new Error("campo 'userId' é obrigatório");

        const rels = await ocorrenciaUserRepository.find({
            where: { userId },
            relations: ["ocorrencia"]
        });

        // Extrai e retorna apenas as ocorrências
        return rels.map(r => r.ocorrencia);
    }
}