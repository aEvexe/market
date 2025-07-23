import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Oreder } from '../oreder/entities/oreder.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Oreder])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
