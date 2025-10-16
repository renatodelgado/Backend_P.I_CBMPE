import "reflect-metadata";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { User } from "./../models/User";
import { Perfil } from "./../models/Perfil";
import { UnidadeOperacional } from "../models/UnidadeOperacional";
import { Regiao } from "../models/Regiao";
import { AIS } from "../models/AIS";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [User, Perfil, UnidadeOperacional, Regiao, AIS],
  synchronize: true, // ⚠️ use false e migrations em produção
  logging: false,
});
