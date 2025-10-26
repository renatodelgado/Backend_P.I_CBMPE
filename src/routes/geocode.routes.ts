// routes/geocode.routes.ts ou algo similar
import { Router } from "express";
// using the built-in global fetch available in Node 18+; removed node-fetch import

export const geocodeRouter = Router();

geocodeRouter.get("/reverse-geocode", async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "Parâmetros lat e lon são obrigatórios" });
  }

  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`, {
      headers: {
        "User-Agent": "NovaOcorrenciaApp/1.0" // Nominatim exige User-Agent
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar endereço" });
  }
});
