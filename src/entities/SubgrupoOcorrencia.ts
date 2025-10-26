import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { GrupoOcorrencia } from "./GrupoOcorrencia";

@Entity("subgruposOcorrencias")
export class SubgrupoOcorrencia {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    nome!: string;

    @ManyToOne(() => GrupoOcorrencia, { nullable: false })
    @JoinColumn({ name: "grupoOcorrenciaId" })
    grupoOcorrencia!: GrupoOcorrencia;

    @CreateDateColumn({ type: "timestamp" })
    createdAt!: Date;
    
    @UpdateDateColumn({ type: "timestamp" })
    updatedAt!: Date;
}