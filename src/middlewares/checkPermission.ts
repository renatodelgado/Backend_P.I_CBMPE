import { Request, Response, NextFunction } from "express";

export function checkPermission(allowedProles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if(!req.user){
            return res.status(401).json({ message: "usuário não autenticado" });
        }
        const userProfile = req.user.perfil;

        if (!allowedProles.includes(userProfile)) {
            return res.status(403).json({ message: "Você não tem permissão para realizar essa ação" });
        }
    }
}