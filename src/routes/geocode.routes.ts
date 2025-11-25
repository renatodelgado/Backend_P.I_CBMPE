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

geocodeRouter.get("/geocode", async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Parâmetro 'q' (query) é obrigatório" });
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q as string)}&limit=1&addressdetails=1`,
      {
        headers: {
          "User-Agent": "ChamaApp/1.0 (seu-email@exemplo.com)", // Use um email real se possível
          "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8"
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`Nominatim API error: ${response.status}`);
    }
    
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Erro no geocoding:", err);
    res.status(500).json({ error: "Erro ao buscar coordenadas" });
  }
});