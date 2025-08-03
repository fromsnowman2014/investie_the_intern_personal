// Export all formatters
export * from './formatters';

// Export all validators
export * from './validators';

// Export constants
export const STOCK_SYMBOLS = ['AAPL', 'TSLA', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'NFLX', 'AVGO', 'AMD'] as const;

export const API_ENDPOINTS = {
  MARKET_SUMMARY: '/api/v1/market-summary',
  STOCKS: '/api/v1/stocks',
  STOCK_DETAIL: (symbol: string) => `/api/v1/stocks/${symbol}`,
} as const;

export const COLORS = {
  positive: '#10B981', // green-500
  negative: '#EF4444', // red-500
  neutral: '#6B7280',  // gray-500
  fear: '#EF4444',     // red-500
  greed: '#10B981',    // green-500
} as const;