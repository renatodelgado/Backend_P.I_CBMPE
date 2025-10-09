import { Request, Response } from "express";
import { UserService } from "../services/User.service";

const userService = new UserService();

export class UserController {
  async create(req: Request, res: Response) {
    const { username, password } = req.body;
    const user = await userService.create(username, password);
    return res.status(201).json(user);
  }

  async findAll(req: Request, res: Response) {
    const users = await userService.findAll();
    return res.json(users);
  }
}
