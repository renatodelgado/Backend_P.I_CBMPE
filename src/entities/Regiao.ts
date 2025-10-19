import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { AIS } from "./AIS";

@Entity("regioes")
export class Regiao {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    nome!: string;

    @ManyToOne(() => AIS)
    @JoinColumn({ name: "ais_id" })
    ais!: AIS;

    @CreateDateColumn()
    createDate?: Date;

    @UpdateDateColumn()
    updateDate?: Date;


}