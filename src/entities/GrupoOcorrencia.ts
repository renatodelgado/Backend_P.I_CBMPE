import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { NaturezaOcorrencia } from "./NaturezaOcorrencia";

@Entity("gruposOcorrencias")
export class GrupoOcorrencia {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    nome!: string;

    @ManyToOne(() => NaturezaOcorrencia, { nullable: false })
    @JoinColumn({ name: "naturezaOcorrenciaId" })
    naturezaOcorrencia!: NaturezaOcorrencia;

    @CreateDateColumn({ type: "timestamp" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt!: Date;
}