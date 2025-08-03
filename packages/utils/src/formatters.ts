// Currency formatting utilities
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

// Percentage formatting utilities  
export const formatPercentage = (value: number, decimals: number = 2): string => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`;
};

// Large number formatting (e.g., market cap)
export const formatLargeNumber = (value: number): string => {
  if (value >= 1e12) {
    return `$${(value / 1e12).toFixed(2)}T`;
  }
  if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`;
  }
  if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`;
  }
  if (value >= 1e3) {
    return `$${(value / 1e3).toFixed(2)}K`;
  }
  return formatCurrency(value);
};

// Volume formatting
export const formatVolume = (value: number): string => {
  if (value >= 1e9) {
    return `${(value / 1e9).toFixed(2)}B`;
  }
  if (value >= 1e6) {
    return `${(value / 1e6).toFixed(2)}M`;
  }
  if (value >= 1e3) {
    return `${(value / 1e3).toFixed(2)}K`;
  }
  return value.toLocaleString();
};

// Price change color helper
export const getPriceChangeColor = (change: number): string => {
  if (change > 0) return '#10B981'; // green-500
  if (change < 0) return '#EF4444'; // red-500
  return '#6B7280'; // gray-500
};

// Status color helper
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'fear':
      return '#EF4444'; // red-500
    case 'greed':
      return '#10B981'; // green-500
    case 'high':
      return '#EF4444'; // red-500
    case 'low':
      return '#10B981'; // green-500
    case 'medium':
    case 'neutral':
    default:
      return '#6B7280'; // gray-500
  }
};