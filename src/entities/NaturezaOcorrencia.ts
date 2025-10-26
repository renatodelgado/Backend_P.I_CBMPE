import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("naturezas_ocorrencias")
export class NaturezaOcorrencia {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    nome!: string;

    @CreateDateColumn({ type: "timestamp" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt!: Date;

}