import { userRepository } from "../repositories/User.repository";
import { User } from "../entities/User";

export class UserService {
  async create(userdata: Omit<User, "matricula">): Promise<User> {
    const lastUser = await userRepository.
      createQueryBuilder("user")
      .orderBy("user.matricula", "DESC")
      .getOne();

      const nextNumber = lastUser
         ? Number(lastUser.matricula.replace(/\D/g, '')) + 1
          : 1;

          const prefix = "CBMPE";

          const matricula = `${prefix}${nextNumber.toString().padStart(5, '0')}`;

          const newUser = userRepository.create({
            ...userdata,
            matricula,
          });
          return await userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await userRepository.find();
  }

  async findByMatricula(matricula: string): Promise<User | null> {
    return await userRepository.findOneBy({ matricula });
  }
}
