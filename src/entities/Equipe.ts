import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { UnidadeOperacional } from "./UnidadeOperacional";
import { User } from "./User";

@Entity("equipes")
export class Equipe {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    nome!: string;

    @ManyToOne(() => UnidadeOperacional)
    @JoinColumn({ name: "unidadeOperacionalId" })
    unidadeOperacional!: UnidadeOperacional;

    @ManyToOne(() => User)
    @JoinColumn({ name: "liderID" })
    responsavel!: User;

    @CreateDateColumn()
    createDate?: Date;

    @UpdateDateColumn()
    updateDate?: Date;
}