import { Injectable } from '@nestjs/common';
import * as marketSummaryMock from '@investie/mock/src/market-summary.json';
import * as stocksMock from '@investie/mock/src/stocks.json';
import { MarketSummaryData, StockCardData, StockSymbol } from '@investie/types';

@Injectable()
export class MockDataService {
  getMarketSummary(): MarketSummaryData {
    return marketSummaryMock as MarketSummaryData;
  }

  getStock(symbol: StockSymbol): StockCardData {
    return (stocksMock as any)[symbol];
  }

  getAllStocks(): StockCardData[] {
    return Object.values(stocksMock as any);
  }
}