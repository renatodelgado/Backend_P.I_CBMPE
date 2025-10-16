import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Regiao } from "./Regiao";


@Entity("unidades_operacionais")
export class UnidadeOperacional {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({nullable: false})
  nome!: string;

  @Column({nullable: false})
  tipo!: string;

  @Column({nullable: false})
  sigla!: string;

  @ManyToOne(() => Regiao)
  @JoinColumn({name: "regiao_id"})
  regiao!: Regiao;

  @CreateDateColumn()
  createDate?: Date;

  @UpdateDateColumn()
  updateDate?: Date;

}