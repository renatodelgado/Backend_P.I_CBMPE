import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity("lesao")
export class Lesao {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "tipo_lesao", nullable: false })
  tipoLesao!: string;


}