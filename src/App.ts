import express from "express";
import { userRoutes } from "./routes/User.routes";
import cors from "cors";
import { AppDataSource } from "./config/data-source";
import { Perfil } from "./entities/Perfil";
import { UnidadeOperacional } from "./entities/UnidadeOperacional";
import { unidadeOperacionalRoutes } from "./routes/UnidadeOperacional.routes";
import { perfilRoutes } from "./routes/Perfil.routes";
import { aisRoutes } from "./routes/AIS.routes";
import { regiaoRoutes } from "./routes/Regiao.routes";
import { viaturaRoutes } from "./routes/Viatura.routes";
import { naturezaOcorrenciaRoutes } from "./routes/NaturezaOcorrencia.routes";
import { ocorrenciaRoutes } from "./routes/Ocorrencia.routes";
import { geocodeRouter } from "./routes/geocode.routes";
import { grupoOcorrenciaRoutes } from "./routes/GrupoOcorrencia.routes";
import { subgrupoOcorrenciaRoutes } from "./routes/SubgrupoOcorrencia.routes";

export const app = express();

app.use(cors(
  { origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"] }
));

app.use(express.json());
app.use("/users", userRoutes);

app.post("/teste", (req, res) => {
  console.log("📩 Body recebido em /teste:", req.body);
  res.json({ recebido: req.body });
});

app.use("/perfis", perfilRoutes);

app.use("/unidadesoperacionais", unidadeOperacionalRoutes);

app.use("/ais", aisRoutes);

app.use("/regioes", regiaoRoutes);

app.use("/viaturas", viaturaRoutes);

app.use("/naturezasocorrencias", naturezaOcorrenciaRoutes);

app.use ("/ocorrencias", ocorrenciaRoutes);

app.use ("/grupoocorrencias", grupoOcorrenciaRoutes);

app.use ("/subgrupoocorrencias", subgrupoOcorrenciaRoutes);

app.use("/api", geocodeRouter);
