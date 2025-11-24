import { LogConflito } from "../entities/LogConflito";
import { LogConflitoRepository } from "../repositories/LogConflito.repository";

export class LogConflitoService {

  async registrarConflito({
    entidade,
    entidadeId,
    valoresCliente,
    valoresServidor,
    valorMantido,
    usuarioId
  }: any) {

    const log = LogConflitoRepository.create({
      entidade,
      entidadeId,
      valoresCliente,
      valoresServidor,
      valorMantido,
      usuarioId
    });

    return await LogConflitoRepository.save(log);
  }

  // Caso você queira consultar depois
  async listar() {
    return await LogConflitoRepository.find({
      order: { data: "DESC" },
      take: 100
    });
  }
}