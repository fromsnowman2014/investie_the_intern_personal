import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Investie Backend API! Phase 0 Setup Complete.';
  }
}