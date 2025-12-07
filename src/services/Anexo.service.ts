import { AnexoRepository } from "../repositories/Anexo.repository";

export class AnexoService {

    // Deletar um anexo por ID
    async deleteAnexo(id: number) {
        const anexo = await AnexoRepository.findOneBy({ id });
        if (!anexo) throw new Error("Anexo não encontrado");
        await AnexoRepository.delete(id);
        return { message: "Anexo deletado com sucesso" };
    }


}




