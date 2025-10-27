import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { userRepository } from "../repositories/User.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
    async login(matricula: string, senha: string){
        const user = await userRepository.findOne({ where: { matricula }, relations: ["perfil", "unidadeOperacional"] 
        });
        if(!user){
            throw new Error("Usuário não encontrado");
        }

        const senhaCorreta = await bcrypt.compare(senha, user.senha);
        if(!senhaCorreta){
            throw new Error("Senha incorreta");
        }

        user.ultimoAcesso = new Date();
        await userRepository.save(user);

        const token = jwt.sign(
            {
                id: user.id,
                perfil: user.perfil?.nome,
                unidadeOperacional: user.unidadeOperacional?.nome
            },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        )

        return {
            user: {
                id: user.id,
                nome: user.nome,
                matricula: user.matricula,
                perfil: user.perfil?.nome,
                unidadeOperacional: user.unidadeOperacional?.nome
            },
            token,

        };    
        
    }
}