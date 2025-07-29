# Claude Code Development Guide - Investie App

## Project Overview
Stock market summary app for US investors. Provides intuitive presentation of complex financial information through card-based simple UI.

**Core Goal**: Provide 1-2 page summary information that even beginner investors can easily understand

## Development Priorities

### Phase 1 (MVP) - 4 Week Target
1. **Market Summary Cards**: Fear & Greed Index, VIX, Interest Rates, CPI, Unemployment Rate
2. **Stock Cards (3 items)**: PER, EPS, RSI, News Summary, Sector Information
3. **Mobile Optimization**: UI capable of digesting all information in 1-2 pages

### Phase 2 (Expansion)
- Detailed view mode (charts, trend graphs)
- Personalization features (watchlist settings)

## Tech Stack Guide

### Required Stack
```bash
# Frontend
next.js@14+ typescript tailwindcss
zustand react-query recharts

# Backend  
nestjs postgresql redis
axios node-cron

# APIs
alpha-vantage fred-api openai
```

### Development Focus Areas

#### 1. Data-Centric Thinking
- Design all components starting from data structure
- Define API response schema first, then implement UI
- Handle null/undefined values in financial data

#### 2. Card-Based Component Design
```typescript
// Example structure
type MarketSummaryCard = {
  fearGreedIndex: number;
  vixLevel: 'low' | 'medium' | 'high';
  interestRate: {
    current: number;
    trend: 'up' | 'down' | 'stable';
  };
}
```

#### 3. Mobile-First Development
- Tailwind breakpoints: sm(640px), md(768px), lg(1024px)
- Consider touch interfaces (minimum 44px touch area)
- Scrollable card layout

## Code Writing Guide

### Component Writing Pattern
```typescript
// 1. Define types first
type Props = {
  marketData: MarketData;
  isLoading?: boolean;
};

// 2. Implement component
export function MarketSummaryCard({ marketData, isLoading }: Props) {
  // 3. Hooks and state management
  const { data, error } = useMarketData();
  
  // 4. Early return pattern
  if (isLoading) return <CardSkeleton />;
  if (error) return <ErrorCard message={error.message} />;
  
  // 5. Rendering
  return (
    <Card className="p-4 mobile-optimized">
      {/* Simple and intuitive UI */}
    </Card>
  );
}
```

### API Design Principles
```typescript
// RESTful design
GET /api/market/summary     // Market summary
GET /api/stocks/featured    // Top 3 stocks
GET /api/stocks/:symbol     // Individual stock details

// Unified response structure
{
  success: boolean;
  data: T;
  error?: string;
  timestamp: string;
}
```

## Performance Optimization Checklist

### Frontend
- [ ] Use Next.js Image component
- [ ] API caching with React Query (5-minute intervals)
- [ ] Lazy loading for chart data
- [ ] Component memoization (React.memo)

### Backend  
- [ ] Redis caching (market data 15min, stock data 5min)
- [ ] Pre-collect data with batch jobs
- [ ] Database index optimization
- [ ] API response compression (gzip)

## Debugging and Monitoring

### Development Environment
```bash
# Required environment variables
ALPHA_VANTAGE_API_KEY=your_key
FRED_API_KEY=your_key  
OPENAI_API_KEY=your_key
DATABASE_URL=your_db_url
REDIS_URL=your_redis_url
```

### Log Management
- Always log financial API calls
- Include detailed context when errors occur
- Track user behavior (page views, card clicks)

## Testing Strategy

### Unit Test Priorities
1. Financial data formatting functions
2. API response parsing logic  
3. Card component rendering
4. Caching logic

### E2E Test Scenarios
- App load → Display market summary cards
- Stock card click → Show detailed information
- Network error → Display error UI

## Deployment and Operations

### Deployment Checklist
- [ ] Verify environment variable settings
- [ ] Validate API key functionality
- [ ] Execute database migrations
- [ ] Test Redis connections
- [ ] Test mobile responsiveness

### Monitoring Metrics
- API response time (<2 seconds target)
- Error rate (<1% target)
- User session length
- Click-through rate by card

## Information to Include When Asking Questions
- Current development Phase (1 or 2)
- Related component/API name
- Error messages (if any)
- Expected behavior vs actual behavior