import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Ocorrencia } from "./Ocorrencia";
import { Lesao } from "./Lesao";

@Entity({ name: "vitima" })
export class Vitima {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "cpf_vitima", nullable: true })
    cpfVitima?: string;

    @Column({ nullable: false })
    nome!: string;

    @Column({ type: "int", nullable: true })
    idade?: number;

    @Column({ nullable: true })
    sexo?: string;

    @Column({ nullable: true })
    tipoAtendimento?: string;

    @Column({ type: "text", nullable: true })
    observacoes?: string;

    @Column({ nullable: true })
    etnia?: string;

    @Column({ nullable: true })
    destinoVitima?: string;

    @ManyToOne(() => Ocorrencia, {nullable: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "ocorrenciaId" })
    ocorrencia!: Ocorrencia;

    @ManyToOne(() => Lesao, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "lesaoId" })
    lesao!: Lesao;
    
    @CreateDateColumn({ name: "dataCriacao" })
    dataCriacao!: Date;

    @UpdateDateColumn({ name: "dataAtualizacao" })
    dataAtualizacao!: Date;
}


  