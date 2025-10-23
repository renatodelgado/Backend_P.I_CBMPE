import { AppDataSource } from "./data-source";
import { Perfil } from "../entities/Perfil";
import { perfilRepository } from "../repositories/Perfil.repository";

export async function seedPerfis() {
    const perfisFixos = [
        {nome: "Administrador", descricao: "Acesso total ao sistema"},
        {nome: "Gestor de Ocorrências", descricao: "Gerencia e edita ocorrências"},
        {nome: "Analista Estatístico", descricao: "Visualiza relatórios e dashboards"},
        {nome: "Operador de Campo", descricao: "Registra e acompanha ocorrências"},
    ];

    for(const perfil of perfisFixos) {
        const existe = await perfilRepository.findOneBy({ nome: perfil.nome });
        if(!existe) {
            await perfilRepository.save(perfil);
            console.log(`✅ Perfil criado: ${perfil.nome}`);
        }
    }
    
}