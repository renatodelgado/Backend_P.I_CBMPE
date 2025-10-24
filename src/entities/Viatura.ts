import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { UnidadeOperacional } from "./UnidadeOperacional";

@Entity("viaturas")
export class Viatura {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    tipo!: string;

    @Column({ nullable: false })
    numero!: string;

    @Column({ nullable: false })
    placa!: string;

    @ManyToOne(() => UnidadeOperacional, { nullable: false })
    @JoinColumn({ name: "unidadeOperacionalId" })
    unidadeOperacional!: UnidadeOperacional;

    @CreateDateColumn({ type: "timestamp" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt!: Date;
}