import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { UnidadeOperacional } from "./UnidadeOperacional";
import { User } from "./User";
import { EventoEspecial } from "./EventoEspecial";
import { Localizacao } from "./Localizacao";
import { NaturezaOcorrencia } from "./NaturezaOcorrencia";

@Entity("ocorrencias")
export class Ocorrencia {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    numeroOcorrencia!: string;

    @Column({ type: "timestamp", nullable: false })
    dataHoraChamada!: Date;

    @Column({ nullable: false })
    statusAtendimento!: string;

    @Column({ nullable: false })
    motivoNaoAtendimento!: string;

    @Column({ type: "text", nullable: true })
    descricao?: string;

    @Column({ nullable: false })
    formaAcionamento!: string;

    @Column({ type: "timestamp", nullable: true })
    dataSincronizacao?: Date;

    @ManyToOne(() => UnidadeOperacional, { nullable: false })
    @JoinColumn({ name: "unidadeOperacionalId" })
    unidadeOperacional!: UnidadeOperacional;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: "usuarioId" })
    usuario!: User;

    @ManyToOne(() => EventoEspecial, { nullable: true })
    @JoinColumn({ name: "eventoEspecialId" })
    eventoEspecial!: EventoEspecial;

    @ManyToOne(() => Localizacao, { nullable: false })
    @JoinColumn({ name: "localizacaoId" })
    localizacao!: Localizacao;

    @ManyToOne(() => NaturezaOcorrencia, { nullable: false })
    @JoinColumn({ name: "naturezaOcorrenciaId" })
    naturezaOcorrencia!: NaturezaOcorrencia;

    @CreateDateColumn({ type: "timestamp" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt!: Date;
}
