import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Store } from '../../store/entities/store.entity';
import { Request } from '../../request/entities/request.entity';
import { Chat } from '../../chat/entities/chat.entity';
import { History } from '../../history/entities/history.entity';
import { Oreder } from '../../oreder/entities/oreder.entity';

@ObjectType()
@Entity('users')
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  fullname: string;

  @Field()
  @Column()
  phone: string;

  @Field()
  @Column()
  refresh_token: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column({ type: 'enum', enum: ['ADMIN', 'MANAGER', 'STAFF'] }) // adjust enum values
  role: string;

  @Field()
  @Column({ type: 'bigint' })
  is_verified: number;

  @Field()
  @Column({ type: 'enum', enum: ['UZ', 'RU', 'EN'] })
  lang: string;

  @Field()
  @Column({ type: 'enum', enum: ['TASHKENT', 'SAMARKAND', 'OTHER'] })
  region: string;

  @Field(() => [Store], { nullable: true })
  @OneToMany(() => Store, store => store.manager)
  stores?: Store[];

  @Field(() => [Request], { nullable: true })
  @OneToMany(() => Request, request => request.users)
  requests?: Request[];

  @Field(() => [Chat], { nullable: true })
  @OneToMany(() => Chat, chat => chat.user)
  chats: Chat[];

  @Field(() => [History], { nullable: true })
  @OneToMany(() => History, history => history.user)
  histories: Chat[];

  @Field(() => [Oreder], { nullable: true })
  @OneToMany(() => Oreder, oreder => oreder.user)
  orders: Oreder[];
}
