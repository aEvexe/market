import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Store } from "../../store/entities/store.entity";
import { Message } from "../../message/entities/message.entity";

@ObjectType()
@Entity()
export class Chat {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field(()=> User)
    @ManyToOne(()=>User, user=> user.chats)
    @JoinColumn({ name: 'user_id' })
    user: User

    @Field(()=> Store)
    @ManyToOne(()=>Store, store=> store.chats)
    @JoinColumn({ name: 'store_id' })
    store: Store

    @Field(()=>[Message], { nullable: true })
    @OneToMany(()=> Message, message =>message.chat)
    messages: Message[]

}
