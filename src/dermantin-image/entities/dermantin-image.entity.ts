import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Dermantin } from "../../dermantin/entities/dermantin.entity";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity()
export class DermantinImage {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  image_url: string;

  @Field()
  @Column({ default: false })
  is_main: boolean;

  @Field(()=> Dermantin)
  @ManyToOne(() => Dermantin, (dermantin) => dermantin.images)
  @JoinColumn({ name: 'dermation_id' })
  dermantin: Dermantin;
}
