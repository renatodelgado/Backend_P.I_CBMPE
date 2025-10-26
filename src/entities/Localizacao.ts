import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("localizacoes")
export class Localizacao {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    municipio!: string;

    @Column({ nullable: false })
    bairro!: string;

    @Column({ nullable: false })
    logradouro!: string;

    @Column({ nullable: false })
    numero!: string;

    @Column({ nullable: true })
    complemento?: string;

    @Column({ nullable: true })
    pontoReferencia?: string;

    @Column("decimal", { precision: 10, scale: 6, nullable: false })
    latitude!: number;

    @Column("decimal", { precision: 10, scale: 6, nullable: false })
    longitude!: number;

    @CreateDateColumn({ type: "timestamp" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt!: Date;

}