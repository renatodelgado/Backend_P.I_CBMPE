import { Request, Response } from "express";
import { getPrevisao } from "../services/previsaoService";

export async function previsaoController(req: Request, res: Response) {
  const { municipio, data } = req.query;

  if (!municipio || !data) {
    return res.status(400).json({ error: "Parâmetros municipio e data são obrigatórios" });
  }

  try {
    const resultado = await getPrevisao(municipio as string, data as string);
    return res.json(resultado);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao consultar microserviço de previsão" });
  }
}
