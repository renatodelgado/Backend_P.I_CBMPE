import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinColumn, ManyToOne, PrimaryColumn, Unique } from "typeorm";
import { Perfil } from "./Perfil";
import { UnidadeOperacional } from "./UnidadeOperacional";

@Entity("users")
@Unique(["matricula", "email"])
export class User {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({nullable: false})
  nome!: string;

  @Column({nullable: false})
  matricula!: string;

  @Column({ unique: true, nullable: false})
  cpf!: string;

  @Column({nullable: false})
  patente!: string;

  @Column({nullable: false})
  funcao!: string;

  @Column({unique: true, nullable: false})
  email!: string;

  @Column({nullable: false})
  senha!: string;

  @ManyToOne(() => UnidadeOperacional)
  @JoinColumn({name: "unidade_operacional_id"})
  unidadeOperacional!: UnidadeOperacional;

  @ManyToOne(() => Perfil)
  @JoinColumn({name: "perfil_id"})
  perfil!: Perfil;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

}
