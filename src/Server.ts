import { app } from "./App";
import { AppDataSource } from "./config/data-source";
import dotenv from "dotenv";

dotenv.config();

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Conectado ao banco MySQL!");
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Servidor rodando na porta ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("Erro ao conectar ao banco:", err));
