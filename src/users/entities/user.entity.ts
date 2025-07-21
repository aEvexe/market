import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity('users')
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  fullname: string;

  @Field()
  @Column()
  password: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone: string;

  @Field()
  @Column({ type: 'enum', enum: ['admin', 'user', 'moderator'] })
  role: string;

  @Field()
  @Column({ type: 'bigint', default: 0 })
  is_verified: number;

  @Field()
  @Column({ type: 'enum', enum: ['north', 'south', 'east', 'west'] })
  region: string;

  @Field()
  @Column({ type: 'enum', enum: ['en', 'fr', 'es', 'de'] })
  lang: string;

  @Column({ nullable: true })
  refresh_token?: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
  

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
