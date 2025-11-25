import { AppDataSource } from "./data-source";
import { Perfil } from "../entities/Perfil";
import { perfilRepository } from "../repositories/Perfil.repository";

export async function seedPerfis() {
    const perfisFixos = [
        {nome: "ADMINISTRADOR", descricao: "Acesso total ao sistema"},
        {nome: "GESTOR", descricao: "Gerencia e edita ocorrências"},
        {nome: "ANALISTA", descricao: "Visualiza relatórios e dashboards"},
        {nome: "OPERADOR", descricao: "Registra e acompanha ocorrências"},
    ];

    for(const perfil of perfisFixos) {
        const existe = await perfilRepository.findOneBy({ nome: perfil.nome });
        if(!existe) {
            await perfilRepository.save(perfil);
            console.log(`✅ Perfil criado: ${perfil.nome}`);
        }
    }
    
}