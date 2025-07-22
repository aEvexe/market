import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Chat } from "../../chat/entities/chat.entity";

@ObjectType()
@Entity()
export class Message {
    @Field()
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    text: string

    @Field()
    @Column()
    is_read: boolean

    @Field(()=>Chat)
    @ManyToOne(()=>Chat, chat=>chat.messages)
    chat: Chat
}
