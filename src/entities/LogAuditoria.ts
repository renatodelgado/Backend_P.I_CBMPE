import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, RelationId } from "typeorm";
import { User } from "./User";

@Entity({ name: "log_auditoria" })
export class LogAuditoria {
    
    @PrimaryGeneratedColumn()
    id!: number;

    @CreateDateColumn({ name: "timestamp" })
    timestamp!: Date;

    @Column({ type: "varchar", length: 255 })
    acao!: string;

    @Column({ type: "varchar", length: 255 })
    recurso!: string;

    @Column({ type: "text", nullable: true })
    detalhes?: string;

    @Column({ nullable: true })
    ip?: string;

    @Column({ nullable: false })
    userAgent?: string;

    @Column({ nullable: true })
    justificativa?: string;

    @ManyToOne(() => User, { nullable: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "usuarioId" })
    usuario!: User;

    @RelationId((log: LogAuditoria) => log.usuario)
    usuarioId?: number;


}

