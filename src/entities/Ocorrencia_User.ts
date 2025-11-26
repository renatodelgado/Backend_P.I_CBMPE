import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { Ocorrencia } from "./Ocorrencia";
import { User } from "./User";

@Entity("ocorrencia_users")
export class OcorrenciaUser {

    @PrimaryColumn()
    ocorrenciaId!: number;

    @PrimaryColumn()
    userId!: number;

    @ManyToOne(() => Ocorrencia, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "ocorrenciaId" })
    ocorrencia!: Ocorrencia;

    @ManyToOne(() => User, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user!: User;
}
