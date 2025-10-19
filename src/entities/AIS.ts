import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("ais")
export class AIS {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    codigo!: string;

    @Column({ nullable: false })
    descricao!: string;

    @CreateDateColumn()
    createDate?: Date;

    @UpdateDateColumn()
    updateDate?: Date;
}