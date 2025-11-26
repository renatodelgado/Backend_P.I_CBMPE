import { app } from "./App";
import { AppDataSource } from "./config/data-source";
import dotenv from "dotenv";
import { seedPerfis } from "./config/seedPerfis";

dotenv.config({
  path:
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development",
});

AppDataSource.initialize()
  .then(async () => {
    console.log("📦 Conectado ao banco MySQL!");
    await seedPerfis();
    console.log("🌱 Perfis fixos verificados/criados com sucesso.");

    app.listen(process.env.PORT, () =>
      console.log(`🚀 Servidor rodando na porta ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("Erro ao conectar ao banco:", err));