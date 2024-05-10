import { Module } from '@nestjs/common';
import LiqPay = require('../liqpay/liqpay');

const LIQPAY = 'LIQPAY';
@Module({
  providers: [
    {
      provide: LIQPAY,
      useValue: LiqPay,
    },
  ],
  exports: [LIQPAY],
})
export class LiqpayModule {}
