import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Store } from "../../store/entities/store.entity";
import { Dermantin } from "../../dermantin/entities/dermantin.entity";
import { Payment } from "../../payment/entities/payment.entity";

@ObjectType()
@Entity()
export class Oreder {
    @Field()
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    total_price: number

    @Field()
    @Column()
    remaining_price: number

    @Field(()=> User)
    @ManyToOne(()=> User, user=>user.orders)
    @JoinColumn({name: "user_id"})
    user: User;

    @Field(() => Store)
    @ManyToOne(()=> Store, store=>store.orders)
    @JoinColumn({name: "store_id"})
    store: Store

    @Field(()=> Dermantin)
    @ManyToOne(()=> Dermantin, dermantin=>dermantin.orders)
    @JoinColumn({name: "dermantin_id"})
    dermantin: Dermantin

    @Field(()=> [Payment], { nullable: true })
    @OneToMany(()=> Payment, Payment=>Payment.order)
    payments: Payment[]
}
