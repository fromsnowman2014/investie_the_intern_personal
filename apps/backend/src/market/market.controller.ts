import { Controller, Get, Param } from '@nestjs/common';
import { MockDataService } from './market.service';
import { MarketSummaryData, StockCardData, StockSymbol, APIResponse } from '@investie/types';

@Controller()
export class MarketController {
  constructor(private readonly mockDataService: MockDataService) {}

  @Get('health')
  getHealth() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }

  @Get('market-summary')
  getMarketSummary(): APIResponse<MarketSummaryData> {
    const data = this.mockDataService.getMarketSummary();
    return {
      data,
      status: 'success',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('stocks/:symbol')
  getStock(@Param('symbol') symbol: string): APIResponse<StockCardData> {
    const data = this.mockDataService.getStock(symbol.toUpperCase() as StockSymbol);
    
    if (!data) {
      return {
        data: null as any,
        status: 'error',
        message: `Stock symbol '${symbol}' not found`,
        timestamp: new Date().toISOString(),
      };
    }

    return {
      data,
      status: 'success',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('stocks')
  getAllStocks(): APIResponse<StockCardData[]> {
    const data = this.mockDataService.getAllStocks();
    return {
      data,
      status: 'success',
      timestamp: new Date().toISOString(),
    };
  }
}