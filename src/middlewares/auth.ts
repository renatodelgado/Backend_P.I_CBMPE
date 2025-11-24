import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { userRepository } from "../repositories/User.repository";
import jwt from "jsonwebtoken";

export async function auth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token não enviado" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        const user = await userRepository.findOne({
            where: { id: decoded.id },
            relations: ["perfil"], 
        });

        if (!user) {
            return res.status(401).json({ message: "Usuário não encontrado" }); 
        }

        req.user = {
            id: user.id,
            perfil: user.perfil.nome.toLowerCase(), 
        };

        return next();
        
    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
}