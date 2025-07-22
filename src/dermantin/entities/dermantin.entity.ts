import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../../category/entities/category.entity";
import { DermantinImage } from "../../dermantin-image/entities/dermantin-image.entity";
import { Store } from "../../store/entities/store.entity";
import { Advertisement } from "../../advertisements/entities/advertisement.entity";
import { History } from "../../history/entities/history.entity";

@ObjectType()
@Entity()
export class Dermantin {
    @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  store_id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column('decimal')
  price: number;

  @Field()
  @Column('float')
  rating: number;

  @Field()
  @Column({
    type: 'enum',
    enum: ['A', 'B', 'C'], // Example values for class
  })
  class: string;

  @Field(()=> Category)
  @ManyToOne(() => Category, (category) => category.dermantins)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Field(()=> DermantinImage)
  @OneToMany(() => DermantinImage, (img) => img.dermantin, { cascade: true })
  images: DermantinImage[];

  @Field(() => Store)
  @ManyToOne(() => Store, store => store.dermantins)
  @JoinColumn({ name: 'store_id' })
  store: Store;

  @Field(() => [Advertisement], { nullable: true })
  @OneToMany(() => Advertisement, ad => ad.dermantin)
  advertisements: Advertisement[];

  @Field(()=> [History], { nullable: true })
  @OneToMany(() => History, history => history.dermantin)
  histories: History[]
}
