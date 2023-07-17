import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);

  bill(data: any): void {
    console.log('bill...', data);
    this.logger.log('Billing...', data);
  }
}
