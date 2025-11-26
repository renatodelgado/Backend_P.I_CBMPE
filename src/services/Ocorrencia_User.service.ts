import { ocorrenciaUserRepository } from "../repositories/Ocorrencia_User.repository";
import { ocorrenciaRepository } from "../repositories/Ocorrencia.repository";
import { userRepository } from "../repositories/User.repository";
import { OcorrenciaUser } from "../entities/Ocorrencia_User";
import { Ocorrencia } from "../entities/Ocorrencia";
import { User } from "../entities/User";

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

        // usuários que fazem parte da equipe (tabela de relação)
        const rels = await ocorrenciaUserRepository.find({
            where: { ocorrenciaId },
            relations: ["user"]
        });

        const usersMap = new Map<number, { user: User; role: string }>();

        rels.forEach(r => {
            usersMap.set(r.user.id, { user: r.user, role: "equipe" });
        });

        // adiciona o criador da ocorrência (se existir) e marca como 'criador'
        const ocorrencia = await ocorrenciaRepository.findOne({
            where: { id: ocorrenciaId },
            relations: ["usuario"]
        });

        if (ocorrencia && ocorrencia.usuario) {
            // substitui/define com papel criador para deixar claro
            usersMap.set(ocorrencia.usuario.id, { user: ocorrencia.usuario, role: "criador" });
        }

        // retorna uma lista com usuário e papel (criador/equipe)
        return Array.from(usersMap.values());
    }

    // Retorna todas as ocorrências relacionadas a um usuário
    async getOcorrenciasByUser(userId: number) {
        if (!userId) throw new Error("campo 'userId' é obrigatório");

        const resultsMap = new Map<number, { ocorrencia: Ocorrencia; role: string }>();

        // ocorrências onde o usuário é parte da equipe
        const rels = await ocorrenciaUserRepository.find({
            where: { userId },
            relations: ["ocorrencia"]
        });

        rels.forEach(r => {
            if (r.ocorrencia && r.ocorrencia.id) {
                resultsMap.set(r.ocorrencia.id, { ocorrencia: r.ocorrencia, role: "equipe" });
            }
        });

        // ocorrências onde o usuário é o criador (campo usuario em Ocorrencia)
        const criadas = await ocorrenciaRepository.find({
            where: { usuario: { id: userId } },
            relations: ["usuario"]
        });

        criadas.forEach(o => {
            // marca como criador (substitui papel equipe, se houve duplicidade)
            resultsMap.set(o.id, { ocorrencia: o, role: "criador" });
        });

        // retorna lista de objetos com ocorrencia e papel
        return Array.from(resultsMap.values());
    }
}