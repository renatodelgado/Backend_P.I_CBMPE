import "reflect-metadata";
import dotenv from "dotenv";
import { DataSource } from "typeorm";

import { User } from "../entities/User.js";
import { Perfil } from "../entities/Perfil.js";
import { UnidadeOperacional } from "../entities/UnidadeOperacional.js";
import { Regiao } from "../entities/Regiao.js";
import { AIS } from "../entities/AIS.js";
import { Equipe } from "../entities/Equipe.js";
import { EquipeUser } from "../entities/Equipe_User.js";
import { Telefone } from "../entities/Telefone.js";
import { Viatura } from "../entities/Viatura.js";
import { Ocorrencia } from "../entities/Ocorrencia.js";
import { Localizacao } from "../entities/Localizacao.js";
import { EventoEspecial } from "../entities/EventoEspecial.js";
import { NaturezaOcorrencia } from "../entities/NaturezaOcorrencia.js";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [
    User,
    Perfil,
    UnidadeOperacional,
    Regiao,
    AIS,
    Equipe,
    EquipeUser,
    Telefone,
    Viatura,
    Ocorrencia,
    Localizacao,
    EventoEspecial,
    NaturezaOcorrencia
  ],
  synchronize: false,
  logging: false,
});
