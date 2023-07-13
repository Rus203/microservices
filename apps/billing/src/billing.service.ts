import { Injectable } from '@nestjs/common';

@Injectable()
export class BillingService {
  bill(data: any): void {
    console.log('bill...', data);
  }
}
