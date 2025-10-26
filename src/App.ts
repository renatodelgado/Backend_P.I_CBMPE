import express from "express";
import { userRoutes } from "./routes/User.routes";
import cors from "cors";
import { AppDataSource } from "./config/data-source";
import { Perfil } from "./entities/Perfil";

export const app = express();

app.use(cors(
  { origin: "*" }
));

app.use(express.json());
app.use("/users", userRoutes);

app.post("/teste", (req, res) => {
  console.log("📩 Body recebido em /teste:", req.body);
  res.json({ recebido: req.body });
});

app.get("/perfis", async (req, res) => {
  const perfis = await AppDataSource.getRepository(Perfil).find();
  res.json(perfis);
});