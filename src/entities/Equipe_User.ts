import { Entity, ManyToOne, JoinColumn, PrimaryColumn} from "typeorm";
import { Equipe } from "./Equipe";
import { User } from "./User";

@Entity("equipe_users")
export class EquipeUser {

    @PrimaryColumn()
    equipeId!: number;

    @PrimaryColumn()
    userId!: number;

    @ManyToOne(() => Equipe)
    @JoinColumn({ name: "equipeId" })
    equipe!: Equipe;

    @ManyToOne(() => User)
    @JoinColumn({ name: "userId" })
    user!: User;

}
