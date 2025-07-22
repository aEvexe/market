import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Dermantin } from "../../dermantin/entities/dermantin.entity";

@ObjectType()
@Entity()
export class Advertisement {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  discount_percent: number;

  @Field()
  @Column({ type: 'enum', enum: ['PERCENT', 'FIXED'] })
  type: string;

  @Field()
  @Column({ type: 'enum', enum: ['ACTIVE', 'INACTIVE'] })
  status: string;

  @Field()
  @Column()
  start_date: Date;

  @Field()
  @Column()
  end_date: Date;

  @Field(() => Dermantin)
  @ManyToOne(() => Dermantin, dermantin => dermantin.advertisements, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'dermantin_id' })
  dermantin: Dermantin;
}
