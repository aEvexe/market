import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Oreder } from "../../oreder/entities/oreder.entity";

export enum PaymentMethod {
    CASH = 'CASH',
    CARD = 'CARD',
    TRANSFER = 'TRANSFER'
}

export enum PaymentStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED'
}

registerEnumType(PaymentMethod, { name: 'PaymentMethod' });
registerEnumType(PaymentStatus, { name: 'PaymentStatus' });

@ObjectType()
@Entity()
export class Payment {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    amount: number;

    @Field(() => PaymentMethod)
    @Column({ type: 'enum', enum: PaymentMethod })
    method: PaymentMethod;

    @Field(() => PaymentStatus)
    @Column({ type: 'enum', enum: PaymentStatus })
    status: PaymentStatus;

    @Field(() => Oreder)
    @ManyToOne(() => Oreder, oreder => oreder.payments)
    @JoinColumn({ name: "order_id" })
    order: Oreder;
}
