import { Request, Response } from "express";
import { AuthService } from "../services/Auth.service";

const authService = new AuthService();

export class AuthController {
    async login(req: Request, res: Response) {
        const { matricula, senha } = req.body;

        try {
            const result = await authService.login(matricula, senha);
            return res.status(200).json({
            message: "Login realizado com sucesso",
            ...result,
        });
        } catch (error: any) {
            console.error("Erro no login:", error);
            return res.status(401).json({ message: error.message });
        }
    }

}