import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@ObjectType()
@Entity()
export class Request {
    @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  text: number;

  @Field()
  @Column()
  user_id: number;

  @Field()
  @Column()
  status: string;

  @Field(()=> User)
  @ManyToOne(() => User, user => user.requests)
  @JoinColumn({ name: 'user_id' })
  users: User;
}
