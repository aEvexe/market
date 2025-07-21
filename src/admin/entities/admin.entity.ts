import { ObjectType, Field, ID } from '@nestjs/graphql';
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'


@ObjectType()
@Entity()
export class Admin {
    @Field(()=>ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    full_name: string;

    @Field()
    @Column()
    email: string;

    @Field({nullable: true})
    @Column({nullable: true})
    phone: string

    @Field()
    @Column()
    password: string

    @Field()
    @Column()
    is_active: boolean

    @Field()
    @Column()
    is_creator: boolean

    @Column({ nullable: true })
    refresh_token?: string;


    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date
}
