import { ocorrenciaUserRepository } from "../repositories/Ocorrencia_User.repository";
import { ocorrenciaRepository } from "../repositories/Ocorrencia.repository";
import { userRepository } from "../repositories/User.repository";
import { OcorrenciaUser } from "../entities/Ocorrencia_User";
import { Ocorrencia } from "../entities/Ocorrencia";
import { User } from "../entities/User";
import { LogAuditoriaService } from "./LogAuditoria.service";

export class OcorrenciaUserService {
    // Relaciona um usuário a uma ocorrência
    async relateUserToOcorrencia(data: any, auditContext?: { request_id?: string; actor_ip?: string; actor_user_agent?: string; actor_user_id?: string }) {
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

        // Envia notificação push (Expo) se o usuário tiver pushToken
            try {
                const token = (user as any).pushToken;
                // envia apenas para tokens do Expo (app mobile). Ajuste a validação conforme seu formato de token.
                if (token && typeof token === "string" && token.startsWith("ExponentPushToken")) {
                    const body = {
                        to: token,
                        title: "Nova Ocorrência!",
                        body: "Você foi designado para uma ocorrência.",
                        sound: "default",
                        data: { ocorrenciaId: data.ocorrenciaId }
                    };

                    // usa global fetch quando disponível (Node 18+) ou ignora se não
                    if (typeof (globalThis as any).fetch === "function") {
                        await (globalThis as any).fetch("https://exp.host/--/api/v2/push/send", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(body)
                        });
                    }
                }
            } catch (err) {
                // não impedir fluxo principal se falhar no envio da notificação
                console.error("Erro ao enviar push notification:", err);
            }

            // Grava auditoria na tabela legada `log_auditoria`
            try {
                const logSvc = new LogAuditoriaService();
                const payload: Partial<any> = {
                    acao: 'assign_user',
                    recurso: 'Ocorrencia',
                    detalhes: JSON.stringify({ request_id: auditContext?.request_id, resource_id: String(data.ocorrenciaId), changes: { before: null, after: { userId: data.userId } }, metadata: { via: 'Ocorrencia_User.service' } }),
                    ip: auditContext?.actor_ip ?? null,
                    userAgent: String(auditContext?.actor_user_agent ?? ''),
                    justificativa: null,
                    usuario: ({ id: user.id } as any)
                };
                await logSvc.createLog(payload);
            } catch (err) {
                console.error('Erro ao gravar log_auditoria (assign):', err);
            }

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

    // Remove a relação entre um usuário e uma ocorrência
    async deleteUsersbyOcorrencia(ocorrenciaId: number, userId: number, auditContext?: { request_id?: string; actor_ip?: string; actor_user_agent?: string; actor_user_id?: string }) {
        if (!ocorrenciaId) throw new Error("campo 'ocorrenciaId' é obrigatório");
        if (!userId) throw new Error("campo 'userId' sé obrigatório");

        const rel = await ocorrenciaUserRepository.findOneBy({ ocorrenciaId, userId });
        if (!rel) throw new Error("Relação entre usuário e ocorrência não encontrada");

        await ocorrenciaUserRepository.remove(rel);

        // grava auditoria de remoção na tabela legada
        try {
            const logSvc = new LogAuditoriaService();
            const payload: Partial<any> = {
                acao: 'remove_user',
                recurso: 'Ocorrencia',
                detalhes: JSON.stringify({ request_id: auditContext?.request_id, resource_id: String(ocorrenciaId), changes: { before: { userId }, after: null }, metadata: { via: 'Ocorrencia_User.service' } }),
                ip: auditContext?.actor_ip ?? null,
                userAgent: String(auditContext?.actor_user_agent ?? ''),
                justificativa: null,
                usuario: auditContext?.actor_user_id ? ({ id: isNaN(Number(auditContext.actor_user_id)) ? auditContext.actor_user_id : Number(auditContext.actor_user_id) } as any) : undefined
            };
            await logSvc.createLog(payload);
        } catch (err) {
            console.error('Erro ao gravar log_auditoria (remove):', err);
        }
        return { message: "Relação removida com sucesso" };
    }
}