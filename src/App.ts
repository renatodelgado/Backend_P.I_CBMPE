import express from "express";
import { userRoutes } from "./routes/User.routes";
import cors from "cors";
import { AppDataSource } from "./config/data-source";
import { Perfil } from "./entities/Perfil";
import { UnidadeOperacional } from "./entities/UnidadeOperacional";
import { unidadeOperacionalRoutes } from "./routes/UnidadeOperacional.routes";
import { perfilRoutes } from "./routes/Perfil.routes";

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