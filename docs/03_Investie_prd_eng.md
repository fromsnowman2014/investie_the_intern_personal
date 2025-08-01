# Investie: Phased Development Guide (4-Person Team)

## 🎯 Introduction: The "Vibe Coding" Approach

This guide outlines a phased development strategy for the Investie MVP. We will follow a "Vibe Coding" approach:

1.  **Phase 0 (Foundation First):** The Project Leader will establish the entire project skeleton, including shared types, mock data, and placeholder components/services. This unblocks parallel development.
2.  **Phase 1 (Modular Features):** The 4-person team develops features in vertical slices, module by module. Each developer works in their specialized area, but integrates frequently.
3.  **Phase 2 (Integration & Polish):** The team integrates all modules, conducts end-to-end testing, and optimizes the application for launch.

This strategy minimizes dependencies and provides immediate visual feedback, ensuring all team members can work efficiently and in parallel from day one.

---

## 📋 Phase 0: Project Foundation (To-Do for Project Leader)

**Goal:** Create a working monorepo skeleton that compiles everywhere. This enables frontend and backend developers to start their work on Day 1 without waiting for each other.

### Step 1: Initialize Monorepo Structure

Set up an Nx-based monorepo with the following structure.

```bash
investie/
├── apps/
│   ├── mobile/        # React-Native (Expo) App
│   ├── web/           # Next.js 14 App
│   └── backend/       # NestJS API Server
├── packages/
│   ├── types/         # Shared TypeScript interfaces
│   ├── mock/          # Shared mock data (JSON fixtures)
│   └── utils/         # Shared helper functions (stubs)
├── scripts/
│   └── mock-server.ts # Optional: Simple server to serve mock JSON
└── package.json
Step 2: Define Shared Types (packages/types)
Create the single source of truth for all data structures. This is the contract between the frontend and backend.

File: packages/types/src/index.ts

TypeScript

// ===================================
// API & Generic Helper Types
// ===================================
export type Status = 'low' | 'medium' | 'high' | 'fear' | 'neutral' | 'greed' | 'oversold' | 'overbought';
export type Trend = 'up' | 'down' | 'flat';

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
  source: string;
}

// ===================================
// Market Summary Card Types
// ===================================
export interface FearGreedIndex {
  value: number;
  status: 'fear' | 'neutral' | 'greed';
  source: 'claude_search';
}

export interface Vix {
  value: number;
  status: 'low' | 'medium' | 'high';
  source: 'google_finance';
}

export interface InterestRate {
  value: number;
  aiOutlook: string; // Claude-generated text
  source: 'fred_api';
}

export interface Cpi {
  value: number;
  monthOverMonth: number;
  direction: 'up' | 'down';
  source: 'fred_api';
}

export interface UnemploymentRate {
  value: number;
  monthOverMonth: number;
  source: 'fred_api';
}

export interface SP500Sparkline {
  data: number[];
  weeklyTrend: 'up' | 'down' | 'flat';
  source: 'google_finance';
}

export interface MarketSummaryData {
  fearGreedIndex: FearGreedIndex;
  vix: Vix;
  interestRate: InterestRate;
  cpi: Cpi;
  unemploymentRate: UnemploymentRate;
  sp500Sparkline: SP500Sparkline;
}

// ===================================
// Individual Stock Card Types
// ===================================
export type StockSymbol = 'AAPL' | 'TSLA' | 'MSFT' | 'GOOGL' | 'AMZN' | 'NVDA' | 'META' | 'NFLX' | 'AVGO' | 'AMD';

export interface StockPrice {
  current: number;
  change: number;
  changePercent: number;
  source: 'google_finance';
}

export interface StockFundamentals {
  pe: number;
  marketCap: number;
  volume: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  source: 'google_finance';
}

export interface StockTechnicals {
  rsi: number;
  rsiStatus: 'oversold' | 'neutral' | 'overbought';
}

export interface StockNewsSummary {
  headline: string; // Claude-generated one-liner
  sentiment: 'positive' | 'neutral' | 'negative';
  source: 'google_news + claude_ai';
}

export interface SectorPerformance {
  name: string;
  weeklyChange: number;
  source: 'google_finance';
}

export interface StockCardData {
  symbol: StockSymbol;
  name: string;
  price: StockPrice;
  fundamentals: StockFundamentals;
  technicals: StockTechnicals;
  newsSummary: StockNewsSummary;
  sectorPerformance: SectorPerformance;
}
Step 3: Create Mock Data (packages/mock)
Generate JSON files based on the types defined above.

File: packages/mock/src/market-summary.json

JSON

{
  "fearGreedIndex": {
    "value": 38,
    "status": "fear",
    "source": "claude_search"
  },
  "vix": {
    "value": 17.5,
    "status": "medium",
    "source": "google_finance"
  },
  "interestRate": {
    "value": 5.33,
    "aiOutlook": "Fed rate expected to hold steady through the next quarter.",
    "source": "fred_api"
  },
  "cpi": {
    "value": 3.4,
    "monthOverMonth": 0.1,
    "direction": "up"
  },
  "unemploymentRate": {
    "value": 3.9,
    "monthOverMonth": 0.1
  },
  "sp500Sparkline": {
    "data": [4780, 4785, 4790, 4770, 4795, 4805, 4800],
    "weeklyTrend": "up",
    "source": "google_finance"
  }
}
File: packages/mock/src/stocks.json

JSON

{
  "AAPL": {
    "symbol": "AAPL",
    "name": "Apple Inc.",
    "price": {
      "current": 195.89,
      "change": 2.34,
      "changePercent": 1.21
    },
    "fundamentals": {
      "pe": 28.5,
      "marketCap": 3050000000000,
      "volume": 45680000,
      "fiftyTwoWeekHigh": 199.62,
      "fiftyTwoWeekLow": 164.08
    },
    "technicals": {
      "rsi": 62,
      "rsiStatus": "neutral"
    },
    "newsSummary": {
      "headline": "Analysts remain bullish on Vision Pro sales projections despite initial supply chain concerns.",
      "sentiment": "positive"
    },
    "sectorPerformance": {
      "name": "Technology",
      "weeklyChange": 2.1
    }
  },
  "TSLA": {
     "symbol": "TSLA",
     "name": "Tesla, Inc.",
     "price": {
        "current": 250.22,
        "change": -5.67,
        "changePercent": -2.22
     },
     "fundamentals": {
        "pe": 75.4,
        "marketCap": 790000000000,
        "volume": 112000000,
        "fiftyTwoWeekHigh": 299.29,
        "fiftyTwoWeekLow": 101.81
     },
     "technicals": {
        "rsi": 45,
        "rsiStatus": "neutral"
     },
     "newsSummary": {
        "headline": "Tesla announces new factory plans in India, boosting future production capacity.",
        "sentiment": "positive"
     },
     "sectorPerformance": {
        "name": "Consumer Discretionary",
        "weeklyChange": -0.5
     }
  }
  // ... Add mock data for all 10 default stocks (MSFT, GOOGL, AMZN, etc.)
}
Step 4: Scaffold Application Skeletons
Create empty, compilable components and services.

Frontend (apps/mobile & apps/web):

TypeScript

// File: apps/mobile/src/components/cards/MarketSummaryCard.tsx
import React from 'react';
import { Text, View } from 'react-native';

export const MarketSummaryCard = () => <View><Text>Hello Market Summary</Text></View>;

// File: apps/mobile/src/components/cards/StockCard.tsx
import React from 'react';
import { Text, View } from 'react-native';

export const StockCard = ({ symbol }: { symbol: string }) => <View><Text>Hello {symbol}</Text></View>;
Backend (apps/backend):

TypeScript

// File: apps/backend/src/market/market.controller.ts
import { Controller, Get } from '@nestjs/common';
import { MarketService } from './market.service';

@Controller('/api/v1/market-summary')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Get()
  getMarketSummary() {
    return this.marketService.getSummary();
  }
}

// File: apps/backend/src/market/market.service.ts
import { Injectable } from '@nestjs/common';
import * as mockData from '@investie/mock/src/market-summary.json';
import { MarketSummaryData } from '@investie/types';

@Injectable()
export class MarketService {
  getSummary(): MarketSummaryData {
    // Initially, just return the mock data
    return mockData;
  }
}
Step 5: Configure Scripts (package.json)
Set up the root package.json to run all apps concurrently.

JSON

{
  "scripts": {
    "dev": "concurrently \"npm:dev:mobile\" \"npm:dev:web\" \"npm:dev:backend\"",
    "dev:mobile": "nx run mobile:start",
    "dev:web": "nx run web:dev",
    "dev:backend": "nx run backend:start:dev",
    "typecheck": "tsc --noEmit -p tsconfig.base.json"
  }
}
✅ Phase 0 Completion Checklist
[ ] investie monorepo is created and pushed to Git.

[ ] packages/types contains all required interfaces and compiles without error.

[ ] packages/mock contains JSON files for market-summary and all 10 stocks.

[ ] npm run dev successfully starts the Mobile, Web, and Backend servers without errors.

[ ] Mobile app launches in the simulator and shows placeholder text.

[ ] Web app is accessible at localhost:3001 (or configured port) and shows placeholder text.

[ ] Backend endpoint /api/v1/market-summary returns the mock JSON data.

[ ] All four developers have cloned the repo and successfully run npm run dev.

📋 Phase 1: Modular Development (For the 4-Person Team)
With the foundation laid, the team can now begin parallel development. Each step focuses on one feature slice.

Team Roles:

Frontend 1 (FE1 - Graph & Viz): Specialist for charts, data visualization.

Frontend 2 (FE2 - UI/UX & Layout): Specialist for layout, components, and data display.

Backend 1 (BE1 - Financial Data): Specialist for Google Finance & FRED APIs.

Backend 2 (BE2 - News & AI): Specialist for News & Claude APIs.

Step 1: Build the Market Summary Card
Goal: Create the first fully functional feature card.

Role	Tasks
FE1	1. Implement the S&P500Sparkline component using Recharts. <br> 2. Implement the FearGreedIndex circular gauge component. <br> 3. Connect these components to receive props based on the MarketSummaryData type.
FE2	1. Build the main layout for the MarketSummaryCard component. <br> 2. Create UI elements to display VIX, InterestRate, CPI, and UnemploymentRate. <br> 3. Integrate FE1's chart components into the layout. <br> 4. Fetch data from the backend's (mock) /market-summary endpoint and pass props to child components.
BE1	1. Implement services to fetch real data from FRED API (CPI, Rate, Unemployment). <br> 2. Implement service to fetch VIX and S&P500 sparkline data from Google Finance API. <br> 3. Replace the mock data in MarketService with calls to these new services. <br> 4. Implement Redis caching strategy (24-hour cache for economic indicators).
BE2	1. Implement a service to use the Claude Search API to get the real-time CNN Fear & Greed Index value. <br> 2. Implement a service to use the Claude API to generate the aiOutlook text for the interest rate. <br> 3. Integrate these services into the MarketService. <br> 4. Implement Redis caching strategy (12-hour cache for AI summaries).

Export to Sheets
Step 2: Build the Stock Card Foundation
Goal: Create a reusable, data-driven StockCard component.

Role	Tasks
FE1	1. Create a generic PriceIndicator component that shows price, change, and percent change, with appropriate red/green coloring. <br> 2. Implement a simple RSIIndicator that displays "Overbought" or "Oversold" based on the RSI value.
FE2	1. Design and build the main layout for the StockCard component. <br> 2. It should accept a StockCardData object as a prop. <br> 3. Create UI elements to display name, symbol, marketCap, volume, P/E, and 52-week range. <br> 4. Integrate FE1's PriceIndicator and RSIIndicator. <br> 5. Create a placeholder section for the news summary.
BE1	1. Implement a StocksService with a method getStockBySymbol(symbol: StockSymbol). <br> 2. Wire this service to fetch price and fundamental data from the Google Finance API. <br> 3. Create a /api/v1/stocks/:symbol endpoint in StocksController. <br> 4. Implement a 5-minute caching strategy for stock data.
BE2	1. Implement a NewsService and a method to calculate RSI. <br> 2. This service will fetch news from Google News API for a given symbol. <br> 3. It will then use the Claude API to generate a one-line headline and sentiment. <br> 4. Add the calculated technicals (RSI) and news summary to the data payload for the /stocks/:symbol endpoint.

Export to Sheets
Step 3: Parallel Development - Implement All Stock Cards
Goal: Populate the app with all 10 default stock cards.

Role	Tasks
Developer A (Market Summary Module Owner)	- Integrate and display the first 3 stock cards: AAPL, TSLA, MSFT. <br> - Refine the MarketSummaryCard based on integration experience.
Developer B (Stock Cards Module Owner 1)	- Integrate and display the next 3 stock cards: GOOGL, AMZN, NVDA. <br> - Ensure the StockCard component is robust and handles different data shapes gracefully.
Developer C (Stock Cards Module Owner 2)	- Integrate and display the next 2 stock cards: META, NFLX. <br> - Focus on optimizing the performance of the list of cards.
Developer D (Auth & Stock Cards Module Owner)	- Integrate and display the final 2 stock cards: AVGO, AMD. <br> - Begin implementing the authentication UI shell (login/logout buttons).

Export to Sheets
Step 4: Implement Authentication & Personalization
Goal: Add user login and a personalized watchlist.

Role	Tasks
FE1/FE2 (Paired)	1. Build the Login/Settings screens. <br> 2. Implement the UI flows for social login (Google, Facebook, GitHub). <br> 3. Create the UI for managing the 10-stock watchlist. <br> 4. Modify the main screen to show the user's watchlist if logged in, otherwise show the default 10 stocks.
BE1/BE2 (Paired)	1. BE1: Set up PostgreSQL and the user/watchlist database schema. <br> 2. BE2: Integrate Firebase Auth for social login. <br> 3. Create /api/v1/user/watchlist (GET, POST) endpoints to manage user data. <br> 4. Secure the endpoints, requiring a JWT token for access.

Export to Sheets
📋 Phase 2: Integration, Testing & Polish
Goal: Finalize the MVP for a stable, performant release.

Role	Tasks
FE1	- Performance optimization: Analyze and optimize chart rendering. Implement FlatList for the card view. <br> - Implement skeleton loaders (SkeletonCard) for a better loading experience.
FE2	- UI/UX Polish: Add subtle animations and transitions. Ensure a consistent design across all screens. <br> - Implement a global error handling state (e.g., ErrorCard) for API failures. <br> - Add a "Pull-to-Refresh" feature on the main screen.
BE1	- End-to-end (E2E) testing for all financial data endpoints. <br> - Load testing on the /stocks/:symbol endpoint. <br> - Database optimization and backup strategy.
BE2	- E2E testing for AI and news generation pipelines. <br> - API cost monitoring and optimization (e.g., refine Claude prompts). <br> - Finalize security measures (API key management, environment variables).
All	- Participate in cross-functional testing. <br> - Fix bugs identified during the integration phase. <br> - Prepare documentation for app store submission.