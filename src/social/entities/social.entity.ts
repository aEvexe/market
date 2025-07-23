import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Store } from "../../store/entities/store.entity";

@ObjectType()
@Entity()
export class Social {
    @Field()
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    name: string

    @Field()
    @Column()
    type: string //enum

    @Field()
    @Column()
    link: string

    @Field(()=> Store)
    @ManyToOne(()=> Store, store=>store.socials)
    @JoinColumn({name: "store_id"})
    store: Store

}
