import { StockSymbol } from '@investie/types';

// Stock symbol validation
export const isValidStockSymbol = (symbol: string): symbol is StockSymbol => {
  const validSymbols: StockSymbol[] = ['AAPL', 'TSLA', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'NFLX', 'AVGO', 'AMD'];
  return validSymbols.includes(symbol as StockSymbol);
};

// API response validation
export const isValidMarketData = (data: any): boolean => {
  return data && 
    typeof data.fearGreedIndex === 'object' &&
    typeof data.vix === 'object' &&
    typeof data.interestRate === 'object' &&
    typeof data.cpi === 'object' &&
    typeof data.unemploymentRate === 'object' &&
    typeof data.sp500Sparkline === 'object';
};

// Price validation
export const isValidPrice = (price: number): boolean => {
  return typeof price === 'number' && price >= 0 && !isNaN(price);
};

// Percentage validation
export const isValidPercentage = (percentage: number): boolean => {
  return typeof percentage === 'number' && !isNaN(percentage);
};