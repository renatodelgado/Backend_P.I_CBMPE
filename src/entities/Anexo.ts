import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Ocorrencia } from "./Ocorrencia";

@Entity({ name: "anexo" })
export class Anexo {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar" })
    urlArquivo!: string;

    @Column({ type: "varchar" })
    nomeArquivo!: string;

    @Column({ type: "varchar" })
    extensaoArquivo!: string;

    @Column({ type: "varchar" })
    tipoArquivo!: string;

    @CreateDateColumn({ name: "dataCriacao" })
    dataCriacao!: Date;

    @ManyToOne(() => Ocorrencia, {nullable: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "ocorrenciaId" })
    ocorrencia!: Ocorrencia;
}