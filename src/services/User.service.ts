import { userRepository } from "../repositories/User.repository";
import { User } from "../entities/User";

export class UserService {
  async create(username: string, password: string): Promise<User> {
    const user = userRepository.create({ username, password });
    return await userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await userRepository.find();
  }

  async findByUsername(username: string): Promise<User | null> {
    return await userRepository.findOneBy({ username });
  }
}
