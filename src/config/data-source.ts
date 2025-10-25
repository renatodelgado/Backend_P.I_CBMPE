import "reflect-metadata";
import dotenv from "dotenv";
import { DataSource } from "typeorm";

import { User } from "../entities/User";
import { Perfil } from "../entities/Perfil";
import { UnidadeOperacional } from "../entities/UnidadeOperacional";
import { Regiao } from "../entities/Regiao";
import { AIS } from "../entities/AIS";
import { Equipe } from "../entities/Equipe";
import { EquipeUser } from "../entities/Equipe_User";
import { Telefone } from "../entities/Telefone";
import { Viatura } from "../entities/Viatura";
import { Ocorrencia } from "../entities/Ocorrencia";
import { Localizacao } from "../entities/Localizacao";
import { EventoEspecial } from "../entities/EventoEspecial";
import { NaturezaOcorrencia } from "../entities/NaturezaOcorrencia";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [User, Perfil, UnidadeOperacional, Regiao, AIS, Equipe,
    EquipeUser,Telefone, Viatura, Ocorrencia, Localizacao, EventoEspecial, NaturezaOcorrencia],
  migrations: ["dist/migrations/*.js"],
  synchronize: false, 
  logging: false,
});
