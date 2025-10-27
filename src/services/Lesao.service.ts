import { Lesao } from "../entities/Lesao";
import { LesaoRepository } from "../repositories/Lesao.repository";

export class LesaoService {
    static findAll() {
        throw new Error("Method not implemented.");
    }

    async findAll(): Promise<Lesao[]> {
        return await LesaoRepository.find();
    }
    async findById(id: number): Promise<Lesao | null> {
        return await LesaoRepository.findOneBy({ id });
    }
}
