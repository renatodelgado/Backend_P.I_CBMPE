import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Regiao } from "./Regiao";

@Entity("ais")
export class AIS {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    codigo!: string;

    @Column({ nullable: false })
    descricao!: string;

    @ManyToOne(() => Regiao, { nullable: false })
    @JoinColumn({ name: "regiaoId" })
    regiao!: Regiao;

    @CreateDateColumn({ type: "timestamp" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt!: Date;
}