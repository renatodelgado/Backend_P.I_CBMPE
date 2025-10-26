import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Regiao } from "./Regiao";
import { AIS } from "./AIS";


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

  @ManyToOne(() => AIS, { nullable: false })
  @JoinColumn({name: "aisId"})
  ais!: AIS;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;

}