import { Module } from '@nestjs/common';
import { MarketController } from './market.controller';
import { MockDataService } from './market.service';

@Module({
  controllers: [MarketController],
  providers: [MockDataService],
  exports: [MockDataService],
})
export class MarketModule {}