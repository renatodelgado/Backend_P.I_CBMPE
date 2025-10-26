import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { Vitima } from "./Vitima";
import { Lesao } from "./Lesao";

@Entity("vitima_lesao")
export class VitimaLesao {

  @PrimaryColumn({ name: "vitimaId" })
  vitimaId!: number;

  @PrimaryColumn({ name: "lesaoId" })
  lesaoId!: number;

  @ManyToOne(() => Vitima, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "vitimaId" })
  vitima!: Vitima;

  @ManyToOne(() => Lesao, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "lesaoId" })
  lesao!: Lesao;
}
