import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, } from "typeorm";

@Entity("log_conflitos")
export class LogConflito {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    entidade!: string; //Nome da entidade onde ocorreu o conflito. Exemplos: "ocorrencia", "vitima", "equipe"

    @Column({ nullable: false })
    entidadeId!: number; //ID da entidade onde ocorreu o conflito. Exemplo: ocorrência ID 27 → entidadeId = 27

    @Column("json")
    valoresCliente!: any;

    @Column("json")
    valoresServidor!: any;

    @Column("json")
    valorMantido!: any;

    @CreateDateColumn({ type: "timestamp" })
    data!: Date;

    @Column({ nullable: true })
    usuarioId!: number;
    
}