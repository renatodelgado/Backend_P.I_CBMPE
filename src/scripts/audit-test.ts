import "reflect-metadata";
import { AppDataSource } from "../config/data-source";
import { OcorrenciaService } from "../services/Ocorrencia.service";
import { OcorrenciaUserService } from "../services/Ocorrencia_User.service";
import { auditLogRepository } from "../repositories/AuditLog.repository";
import { LogAuditoriaRepository } from "../repositories/LogAuditoria.repository";

async function main() {
  try {
    await AppDataSource.initialize();
    console.log('DataSource initialized');

    const ocorrenciaSvc = new OcorrenciaService();
    const ocorrenciaUserSvc = new OcorrenciaUserService();

    // Create a minimal occurrence (adjust IDs to match your DB fixtures)
    const now = new Date();
    const data: any = {
      numeroOcorrencia: `TEST-${Date.now()}`,
      dataHoraChamada: now,
      statusAtendimento: 'Pendentes',
      formaAcionamento: 'Teste',
      unidadeOperacionalId: 1,
      usuarioId: 64,
      localizacao: { logradouro: 'Rua do Futuro', municipio: 'Recife', bairro: 'Jaqueira', numero: '123', latitude: 0, longitude: 0 },
      naturezaOcorrenciaId: 1,
      grupoOcorrenciaId: 1,
      anexos: [],
      motivoNaoAtendimento: 'N/A'
    };

    console.log('Creating occurrence...');
    const auditContext = { request_id: `test-${Date.now()}`, actor_user_id: '64', actor_ip: '127.0.0.1', actor_user_agent: 'audit-test' };
    const occ = await ocorrenciaSvc.create(data, auditContext);
    console.log('Created occurrence id=', occ.id);

    console.log('Assigning user to occurrence...');
    // assign the same user that exists in the DB (creator) or use actor_user_id
    const assignUserId = occ.usuario?.id ?? Number(auditContext.actor_user_id);
    await ocorrenciaUserSvc.relateUserToOcorrencia({ ocorrenciaId: occ.id, userId: assignUserId }, auditContext);

    // Give DB a moment
    await new Promise(r => setTimeout(r, 500));

    // Query audit logs
    const auditLogs = await auditLogRepository.find({ where: { resource: 'Ocorrencia' }, take: 10, order: { timestamp: 'DESC' } });
    console.log('audit_logs entries (recent):', auditLogs.map(a => ({ id: a.id, action: a.action, resource_id: a.resource_id, request_id: a.request_id })));

    const legacy = await LogAuditoriaRepository.find({ where: { recurso: 'Ocorrencia' }, take: 10, order: { timestamp: 'DESC' } });
    console.log('log_auditoria entries (recent):', legacy.map(l => ({ id: l.id, acao: l.acao, usuarioId: (l as any).usuario?.id })));

    console.log('Done.');
    process.exit(0);
  } catch (err) {
    console.error('Test failed:', err);
    process.exit(1);
  }
}

main();
