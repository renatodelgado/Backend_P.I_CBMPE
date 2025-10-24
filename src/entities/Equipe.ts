import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { UnidadeOperacional } from "./UnidadeOperacional";


@Entity("equipes")
export class Equipe {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    nome!: string;

    @Column({ nullable: false })
    lider!: string;

    @ManyToOne(() => UnidadeOperacional, { nullable: false })
    @JoinColumn({ name: "unidadeOperacionalId" })
    unidadeOperacional!: UnidadeOperacional;


    @CreateDateColumn({ type: "timestamp" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt!: Date;
}