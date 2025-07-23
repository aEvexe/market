import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Dermantin } from '../../dermantin/entities/dermantin.entity';
import { Chat } from '../../chat/entities/chat.entity';
import { Oreder } from '../../oreder/entities/oreder.entity';
import { Social } from '../../social/entities/social.entity';

@ObjectType()
@Entity('stores')
export class Store {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  logo_url: string;

  @Field(() => Int)
  @Column()
  region_id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field(() => Int)
  @Column()
  rating_id: number;

  @Field()
  @Column({ type: 'enum', enum: ['ACTIVE', 'INACTIVE'] })
  status: string;

  @Field(() => User)
  @ManyToOne(() => User, user => user.stores)
  @JoinColumn({ name: 'manager_id' })
  manager: User;

  @Field(() => [Dermantin], { nullable: true })
  @OneToMany(() => Dermantin, dermantin => dermantin.store)
  dermantins?: Dermantin[];

  @Field(() => [Chat], { nullable: true })
  @OneToMany(() => Chat, chat => chat.store)
  chats?: Chat[];

  @Field(() => [Oreder], { nullable: true })
  @OneToMany(() => Oreder, oreder => oreder.user)
  orders: Oreder[];

  @Field(() => [Social], { nullable: true })
  @OneToMany(() => Social, social => social.store)
  socials: Social[];
}
