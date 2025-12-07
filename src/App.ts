import express from "express";
import { userRoutes } from "./routes/User.routes";
import cors from "cors";
import { auditMiddleware } from "./middleware/audit.middleware";
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
import { authRoutes } from "./routes/Auth.routes";
import { lesaoRoutes } from "./routes/Lesao.routes";
import { vitimaRoutes } from "./routes/Vitima.routes";
import { ocorrenciaUserRoutes } from "./routes/Ocorrencia_User.routes";
import logConflitoRoutes from "./routes/LogConflito.routes"; 
import { anexoRoutes } from "./routes/Anexo.routes";

export const app = express();

// 1. CORS primeiro
app.use(cors(
  { origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Request-ID"] }
));

// Middleware de auditoria (antes de parsear o body)
app.use(auditMiddleware);

// Parser de JSON
app.use(express.json());

// 4. Rotas
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

app.use ("/gruposocorrencias", grupoOcorrenciaRoutes);

app.use ("/subgruposocorrencias", subgrupoOcorrenciaRoutes);

app.use ("/lesoes", lesaoRoutes);

app.use ("/vitimas", vitimaRoutes); 

app.use("/api", geocodeRouter);

app.use("/auth", authRoutes);
 
app.use("/ocorrencia-user", ocorrenciaUserRoutes);

app.use("/log-conflitos", logConflitoRoutes);

app.use("/anexos", anexoRoutes);

app.use("/audit", (req, res) => {
  res.status(200).send("Serviço de auditoria ativo.");
});
