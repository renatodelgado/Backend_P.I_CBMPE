import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Regiao } from "./Regiao";


@Entity("unidadesOperacionais")
export class UnidadeOperacional {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({nullable: false})
  nome!: string;

  @Column({nullable: false})
  pontoBase!: string;

  @Column({nullable: false})
  sigla!: string;

  @ManyToOne(() => Regiao, { nullable: false })
  @JoinColumn({name: "regiaoId"})
  regiao!: Regiao;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;

}