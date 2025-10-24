import { Entity, ManyToOne, JoinColumn, PrimaryColumn} from "typeorm";
import { Equipe } from "./Equipe";
import { User } from "./User";

@Entity("equipe_users")
export class EquipeUser {

    @PrimaryColumn()
    equipeId!: number;

    @PrimaryColumn()
    userId!: number;

    @ManyToOne(() => Equipe, { nullable: false })
    @JoinColumn({ name: "equipeId" })
    equipe!: Equipe;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: "userId" })
    user!: User;

}
