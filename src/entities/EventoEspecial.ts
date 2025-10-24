import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";


@Entity("eventos_especiais")
export class EventoEspecial {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    nomeEvento!: string;

    @Column({ type: "date", nullable: false })
    dataInicio!: Date;

    @Column({ type: "date", nullable: false })
    dataFim!: Date;

    @CreateDateColumn({ type: "timestamp" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt!: Date;
}
