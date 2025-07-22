import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Dermantin } from "../../dermantin/entities/dermantin.entity";
import { User } from "../../users/entities/user.entity";

@ObjectType()
@Entity()
export class History {
    @Field()
    @PrimaryGeneratedColumn()
    id: number

    @Field(()=> Dermantin)
    @ManyToOne(()=>Dermantin, dermantin=>dermantin.histories)
    @JoinColumn({name: "dermantin_id"})
    dermantin: Dermantin

    @Field(()=> User)
    @ManyToOne(()=>User, user=>user.histories)
    @JoinColumn({name: "user_id"})
    user: User
}
