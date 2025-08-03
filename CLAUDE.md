# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🎯 Project Overview

**Investie** is an AI-powered market summary app for beginner-to-intermediate US stock investors. This is designed as a mobile-first React Native app with web expansion capabilities, providing concise, actionable market information through card-based UI.

**Current Status**: Project is in Phase 0 setup - requires monorepo initialization with Nx workspaces before development can begin.

### Key Project Details
- **Architecture**: Nx monorepo with mobile (React Native + Expo), web (Next.js 14), and backend (NestJS)
- **Phase 1 MVP**: 11 summary cards (1 Market Summary + 10 Stock Cards)
- **Target Stocks**: AAPL, TSLA, MSFT, GOOGL, AMZN, NVDA, META, NFLX, AVGO, AMD
- **Update Schedule**: Twice daily (6 AM & 4 PM EST)
- **Target Users**: Beginner-to-intermediate US stock investors

## 🛠 Technology Stack (Latest Versions - 2025)

### Monorepo Framework
- **Nx**: Latest (migration via `nx migrate latest` → `nx migrate --run-migrations`)
- **Node.js**: 18.x+ recommended (14.17+ minimum for TypeScript 5.x)
- **Package Manager**: npm 9+ or yarn 4.x (latest versions)

### Monorepo Architecture (Nx Workspaces)
- **Mobile**: React Native 0.77+ (Expo SDK 51+) + TypeScript 5.x + NativeWind
- **Web**: Next.js 15.1.8+ (App Router with async Request APIs) + TypeScript 5.x + Tailwind CSS 3.x
- **Backend**: NestJS 10.x + TypeScript 5.x + PostgreSQL 14+ + Redis 7.x
- **Shared**: TypeScript 5.x types, mock data, utility functions

### Technology Version Details
**Frontend Stack:**
- **React**: 18.x+ (19.x with Next.js 15+) 
- **React Native**: 0.77+ stable (0.80+ upcoming with React 19 support)
- **Expo**: SDK 51+ (latest managed workflow)
- **Next.js**: 15.1.8+ stable (15.4.0-canary for latest features)
- **TypeScript**: 5.x (ES2020 target, Node.js 14.17+ requirement)
- **TanStack Query**: v5+ (formerly React Query)

**Backend Stack:**
- **NestJS**: 10.x series (requires Node.js 18+ for optimal performance)
- **PostgreSQL**: 14+ (latest stable recommended)  
- **Redis**: 7.x+ (caching and session management)
- **Firebase Auth**: Latest SDK (social authentication)

### External APIs & Services
- **Google Finance API** (Primary): Stock prices, P/E ratios, VIX, market cap
- **FRED API**: Economic indicators (rates, CPI, unemployment)
- **Claude API**: AI summaries, Fear & Greed search
- **Google News API**: Stock-related news
- **Firebase Auth**: Social login (Google, Facebook, GitHub)

## 📁 Required Project Structure

Based on the Phase 0 development guide, the project must follow this Nx monorepo structure:

```
investie/
├── apps/
│   ├── mobile/          # React Native (Expo) Application
│   ├── web/             # Next.js 14 Application  
│   └── backend/         # NestJS API Server
├── packages/
│   ├── types/           # Shared TypeScript Types (The Contract)
│   ├── mock/            # Shared Mock Data (JSON files)
│   └── utils/           # Shared Helper Functions
└── package.json         # Root scripts and dependency management
```

## 🏗 Development Commands

### Phase 0 Setup (Required First)
```bash
# Create fresh Nx monorepo with latest versions
npx create-nx-workspace@latest investie --preset=empty --pm=npm

# Generate applications
nx g @nx/react-native:app mobile
nx g @nx/next:app web  
nx g @nx/nest:app backend

# Generate shared packages
nx g @nx/js:lib types
nx g @nx/js:lib mock
nx g @nx/js:lib utils
```

### Version Update Commands (Keep Dependencies Current)
```bash
# Update Nx workspace to latest
npx nx migrate latest
npx nx migrate --run-migrations

# Update Next.js to 15.x with codemod
npx @next/codemod@canary upgrade latest
npm install next@latest react@latest react-dom@latest eslint-config-next@latest

# Update TypeScript to 5.x
npm install -D typescript@latest

# Update NestJS to 10.x
npm install @nestjs/core@latest @nestjs/common@latest @nestjs/platform-express@latest

# Update React Native to 0.77+
# Note: Follow React Native upgrade guide for breaking changes
npx @react-native-community/cli upgrade

# Update TanStack Query to v5
npm install @tanstack/react-query@latest
```

### Development Commands (After Setup)
```bash
# Start all applications concurrently
npm run dev

# Individual development servers
npm run dev:mobile    # nx run mobile:start
npm run dev:web       # nx run web:dev  
npm run dev:backend   # nx run backend:start:dev

# Type checking across monorepo
npm run typecheck     # tsc -b

# Build all applications
nx run-many --target=build --all

# Test all applications
nx run-many --target=test --all

# Lint all applications
nx run-many --target=lint --all
```

### Mobile Development
```bash
# Start Expo development server
cd apps/mobile && expo start

# Run on iOS simulator
cd apps/mobile && expo start --ios

# Run on Android emulator  
cd apps/mobile && expo start --android

# Run on web browser
cd apps/mobile && expo start --web
```

### Backend Development
```bash
# Start backend in development mode
cd apps/backend && npm run start:dev

# Run backend tests
cd apps/backend && npm run test

# Run backend e2e tests
cd apps/backend && npm run test:e2e
```

## 🔄 Core Data Structures

The shared types package defines the contract between frontend and backend:

### Market Summary Data
```typescript
// packages/types/src/index.ts
export interface MarketSummaryData {
  fearGreedIndex: { value: number; status: 'fear' | 'neutral' | 'greed' };
  vix: { value: number; status: 'low' | 'medium' | 'high' };
  interestRate: { value: number; aiOutlook: string };
  cpi: { value: number; monthOverMonth: number; direction: 'up' | 'down' };
  unemploymentRate: { value: number; monthOverMonth: number };
  sp500Sparkline: { data: number[]; weeklyTrend: 'up' | 'down' | 'flat' };
}
```

### Stock Card Data  
```typescript
export type StockSymbol = 'AAPL' | 'TSLA' | 'MSFT' | 'GOOGL' | 'AMZN' | 'NVDA' | 'META' | 'NFLX' | 'AVGO' | 'AMD';

export interface StockCardData {
  symbol: StockSymbol;
  name: string;
  price: { current: number; change: number; changePercent: number };
  fundamentals: { pe: number; marketCap: number; volume: number; fiftyTwoWeekHigh: number; fiftyTwoWeekLow: number };
  technicals: { rsi: number; rsiStatus: 'oversold' | 'neutral' | 'overbought' };
  newsSummary: { headline: string; sentiment: 'positive' | 'neutral' | 'negative' };
  sectorPerformance: { name: string; weeklyChange: number };
}
```

## 📋 Phase 0 Completion Checklist

Before any feature development can begin, these must be completed:

- [ ] `packages/types` compiles successfully with `tsc -p packages/types`
- [ ] `npm run dev` spawns Expo, Next.js, and NestJS without errors
- [ ] Mobile app launches and displays "Hello Investie Mobile" placeholder
- [ ] Web homepage (http://localhost:3001) displays "Hello Investie Web" placeholder  
- [ ] Backend endpoints `/api/v1/market-summary` and `/api/v1/stocks/AAPL` return 200 OK with mock data
- [ ] All stub components and services export correctly, passing ESLint
- [ ] All developers can run `npm install` and `npm run dev` successfully

## 🔐 Environment Variables

```bash
# External API Keys
GOOGLE_FINANCE_API_KEY=
FRED_API_KEY=
CLAUDE_API_KEY=
GOOGLE_NEWS_API_KEY=

# Database & Caching
DATABASE_URL=
REDIS_URL=

# Authentication
FIREBASE_CONFIG=

# Development URLs
MOBILE_API_URL=http://localhost:3000
WEB_API_URL=http://localhost:3000
```

## 🎨 Styling Conventions

### Mobile (NativeWind)
```typescript
const styles = {
  card: 'bg-white rounded-xl p-4 shadow-sm mb-4',
  cardTitle: 'text-lg font-semibold text-gray-900 mb-2',
  priceUp: 'text-positive font-medium',    // green-500
  priceDown: 'text-negative font-medium',  // red-500
  neutral: 'text-neutral',                 // gray-500
  sparkline: 'h-8 w-full',
};
```

### Web (Tailwind CSS)
```typescript
const webStyles = {
  card: 'bg-white rounded-xl p-6 shadow-sm mb-6',
  cardTitle: 'text-xl font-semibold text-gray-900 mb-3',
  // Same color conventions as mobile
};
```

### Color System
```javascript
// tailwind.config.js (shared)
colors: {
  positive: '#10B981', // green-500
  negative: '#EF4444', // red-500
  neutral: '#6B7280',  // gray-500
  fear: '#EF4444',     // red-500
  greed: '#10B981',    // green-500
}
```

## 🔄 Data Pipeline Architecture

```
External APIs → Backend (NestJS) → Cache (Redis) → Frontend Apps
     ↓              ↓                  ↓
Google Finance   PostgreSQL      Multi-tier caching:
FRED API        (Persistent)     - 5min (stock data)
Claude API                       - 12h (AI summaries) 
Google News                      - 24h (economic data)
```

### Caching Strategy
- **Stock Data**: 5-minute cache during market hours
- **AI Summaries**: 12-hour cache (cost optimization)
- **Economic Indicators**: 24-hour cache
- **News**: 1-hour cache

## 🧑‍💻 Team Development Structure

### Module-Based Development (4 developers)
- **Developer A**: Market Summary Module (FRED API, Fear & Greed, macro indicators)
- **Developer B**: Stock Cards Module (Group 1) - AAPL, TSLA, MSFT, GOOGL
- **Developer C**: Stock Cards Module (Group 2) - AMZN, NVDA, META, NFLX  
- **Developer D**: Authentication + Stock Cards (Group 3) - AVGO, AMD + Firebase Auth

### Shared Development Patterns
```typescript
// Custom Hook Pattern (shared across mobile/web)
export const useMarketData = () => {
  return useQuery({
    queryKey: ['market-summary'],
    queryFn: () => marketApi.getSummary(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Component Pattern with error handling
export const MarketSummaryCard: React.FC = () => {
  const { data, isLoading, error, refetch } = useMarketData();
  
  if (isLoading) return <SkeletonCard />;
  if (error) return <ErrorCard retry={() => refetch()} />;
  
  return (
    <Card className="bg-white rounded-xl p-4 shadow-sm">
      <FearGreedIndicator data={data.fearGreedIndex} />
      <VIXIndicator data={data.vix} />
    </Card>
  );
};
```

## 📱 Mobile-First Design Principles

### Responsive Design
- Design for 375px width (iPhone SE) as minimum
- Touch-friendly tap targets (44px minimum)
- Optimize for portrait and landscape modes

### Accessibility
```typescript
<TouchableOpacity
  accessible={true}
  accessibilityLabel="Apple stock card"
  accessibilityHint="Double tap to view detailed information"
  accessibilityRole="button"
>
  <StockCard data={appleData} />
</TouchableOpacity>
```

## 🧪 Testing Strategy

### Key Testing Areas
- Financial data calculations and formatting
- API response validation and error handling  
- Component rendering with different data states
- Caching mechanisms and data freshness
- Cross-platform consistency (mobile vs web)

### Testing Commands
```bash
# Run all tests
nx run-many --target=test --all

# Test specific app
nx test mobile
nx test web  
nx test backend

# E2E testing
nx e2e mobile-e2e
nx e2e web-e2e
nx e2e backend-e2e

# Test shared packages
nx test types
nx test utils
```

## 🚀 Implementation Priority

### Phase 0: Foundation (Current)
1. Set up Nx monorepo structure
2. Create shared packages (types, mock, utils)
3. Initialize mobile, web, and backend applications
4. Verify development environment setup

### Phase 1: MVP Development  
1. Implement shared TypeScript interfaces
2. Create mock data files for development
3. Build card components (mobile and web)
4. Set up backend API endpoints
5. Implement authentication system

### Phase 2: Production Features
1. Integrate external APIs
2. Implement caching strategies  
3. Add real-time data updates
4. Performance optimization
5. App store submission

## ⚠️ Version Compatibility & Breaking Changes

### Node.js & TypeScript Requirements
- **TypeScript 5.x**: Requires Node.js 14.17+ minimum (18.x+ recommended)
- **NestJS 10.x**: Optimal performance with Node.js 18.x+
- **Next.js 15.x**: Breaking changes with async Request APIs, requires React 18+

### Migration Considerations  
- **React Native 0.77 → 0.80**: React 19 support, potential component API changes
- **Next.js 14 → 15**: Async Request/Response APIs, caching behavior changes
- **TanStack Query v4 → v5**: API changes, updated hook patterns
- **NestJS 9 → 10**: Improved performance, potential middleware changes

### Critical Compatibility Notes
- Ensure all team members use **Node.js 18.x+** for consistent development
- **Expo SDK 51+** required for React Native 0.77+ compatibility
- **Firebase Auth SDK**: Update to latest for React 18+ compatibility
- **TypeScript ESLint**: Update parser and rules for TypeScript 5.x

## ⚠️ Critical Development Notes

- **Shared Types First**: All API contracts must be defined in `packages/types` before implementation
- **Mock Data Development**: Use `packages/mock` for consistent development data across all apps
- **Component API Consistency**: Mobile and web components should have identical props and behavior
- **Cache Strategy**: Implement aggressive caching to minimize API costs and improve performance
- **Error Handling**: All components must handle loading, error, and empty states
- **TypeScript Strict Mode**: Maintain strict TypeScript configuration across all packages
- **Version Pinning**: Pin major versions to avoid breaking changes during development