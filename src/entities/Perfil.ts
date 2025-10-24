import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("perfis")
export class Perfil {
  
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({unique: true, nullable: false})
  nome!: string;

  @Column({nullable: true})
  descricao!: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;
}   