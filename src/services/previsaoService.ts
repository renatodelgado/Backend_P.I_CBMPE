import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.ML_BASE_URL; // URL do microserviço Python

// Verifica se a variável existe
if (!BASE_URL) {
  throw new Error("A variável de ambiente ML_BASE_URL não está definida!");
}

export async function getPrevisao(municipio: string, data: string) {
  try {
    const response = await axios.get(`${BASE_URL}/previsao`, {
      params: { municipio, data },
    });
    return response.data; // { municipio, data, previsao }
  } catch (error) {
    console.error("Erro ao chamar microserviço de previsão:", error);
    throw error;
  }
}
