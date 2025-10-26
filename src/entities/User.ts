import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, Unique } from "typeorm";
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

  @ManyToOne(() => Perfil, { nullable: false })
  @JoinColumn({name: "perfilId"})
  perfil!: Perfil;

  @ManyToOne(() => UnidadeOperacional, { nullable: false })
  @JoinColumn({name: "unidadeOperacionalId"})
  unidadeOperacional!: UnidadeOperacional;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;

}
