Investie Phase 0: Project Leader Preparation Guide (📱 Mobile + 🌐 Web)
🎯 Goal
The objective is to provide both front-end and back-end engineers with a single monorepo skeleton that boots React Native (mobile app) and Next.js 14 (responsive web) side-by-side. This structure shares types, mock data, and utilities, enabling all four developers to start working in parallel from day one.

📂 0. Monorepo Layout
This project will be set up as a monorepo using Nx workspaces. This is key to maximizing code reusability and maintaining consistency.

Bash

investie/
├── apps/
│   ├── mobile/        # React-Native (Expo) Application
│   ├── web/           # Next.js 14 Application
│   └── backend/       # NestJS API Server
├── packages/
│   ├── types/         # Shared TypeScript Types (The Contract)
│   ├── mock/          # Shared Mock Data (JSON files)
│   └── utils/         # Shared Helper Functions (Stubs)
└── package.json       # Root scripts and dependency management
🧬 1. Shared Package Setup
1.1. packages/types (Shared Type Definitions)
This package serves as the "Single Source of Truth" between the front-end and back-end. If a new field is needed, a Pull Request must be made to this type file first.

TypeScript

// packages/types/src/index.ts

// API & Generic Types
export type Status = 'low' | 'medium' | 'high' | 'fear' | 'neutral' | 'greed' | 'oversold' | 'overbought';
export type Trend = 'up' | 'down' | 'flat';

// Market Summary Card Types
export interface MarketSummaryData {
  fearGreedIndex: { value: number; status: 'fear' | 'neutral' | 'greed' };
  vix: { value: number; status: 'low' | 'medium' | 'high' };
  interestRate: { value: number; aiOutlook: string };
  cpi: { value: number; monthOverMonth: number; direction: 'up' | 'down' };
  unemploymentRate: { value: number; monthOverMonth: number };
  sp500Sparkline: { data: number[]; weeklyTrend: 'up' | 'down' | 'flat' };
}

// Individual Stock Card Types
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
1.2. packages/mock (Mock Data)
These are small JSON fixtures that will power both front-end apps during Phase 0.

packages/mock/src/market-summary.json

JSON

{
  "fearGreedIndex": { "value": 38, "status": "fear" },
  "vix": { "value": 17.5, "status": "medium" },
  "interestRate": { "value": 5.33, "aiOutlook": "The Fed is expected to hold rates steady through the next quarter." },
  "cpi": { "value": 3.4, "monthOverMonth": 0.1, "direction": "up" },
  "unemploymentRate": { "value": 3.9, "monthOverMonth": 0.1 },
  "sp500Sparkline": { "data": [4780, 4785, 4790, 4770, 4795, 4805, 4800], "weeklyTrend": "up" }
}
packages/mock/src/stocks.json

JSON

{
  "AAPL": {
    "symbol": "AAPL",
    "name": "Apple Inc.",
    "price": { "current": 195.89, "change": 2.34, "changePercent": 1.21 },
    "fundamentals": { "pe": 28.5, "marketCap": 3050000000000, "volume": 45680000, "fiftyTwoWeekHigh": 199.62, "fiftyTwoWeekLow": 164.08 },
    "technicals": { "rsi": 62, "rsiStatus": "neutral" },
    "newsSummary": { "headline": "Analysts remain bullish on Vision Pro sales projections.", "sentiment": "positive" },
    "sectorPerformance": { "name": "Technology", "weeklyChange": 2.1 }
  }
  // ...add mock data for the other 9 stocks
}
1.3. packages/utils (Utility Function Stubs)
Define the structure for shared utilities, like formatters. The logic will be implemented later.

TypeScript

// packages/utils/src/formatters.ts
export const formatCurrency = (value: number) => { /* TODO */ };
export const formatPercentage = (value: number) => { /* TODO */ };
🏗️ 2. Application Skeleton Setup
2.1. Frontend (Mobile + Web)
Both the mobile and web apps will be scaffolded with identical component APIs to establish a foundation for code sharing.

🔹 React-Native (apps/mobile)
TypeScript

// apps/mobile/src/components/ui/Card.tsx
import { View } from 'react-native';
export const Card = ({ children }) => <View>{children}</View>;

// apps/mobile/src/components/charts/LineChart.tsx
import { View, Text } from 'react-native';
export const LineChart = () => <View><Text>Line Chart Stub</Text></View>;
🔸 Next.js (apps/web)
The web app will use the Next.js 14 App Router. Component APIs will mirror the mobile app's structure.

TypeScript

// apps/web/src/components/ui/Card.tsx
export const Card = ({ children }) => <div>{children}</div>;

// apps/web/src/components/charts/LineChart.tsx
export const LineChart = () => <div>Line Chart Stub</div>;

// apps/web/app/page.tsx
import { MarketSummaryCard } from '@/components/cards/MarketSummaryCard'; // Example

export default function Home() {
  return (
    <main>
      <h1>Hello Investie Web</h1>
      {/* <MarketSummaryCard /> */}
    </main>
  );
}
2.2. Backend (apps/backend)
NestJS service and controller stubs will be created to initially serve the mock data.

TypeScript

// apps/backend/src/market/market.service.ts
import { Injectable } from '@nestjs/common';
import * as marketSummaryMock from '@investie/mock/src/market-summary.json';
import * as stocksMock from '@investie/mock/src/stocks.json';
import { MarketSummaryData, StockCardData, StockSymbol } from '@investie/types';

@Injectable()
export class MockDataService {
  getMarketSummary(): MarketSummaryData {
    return marketSummaryMock;
  }
  getStock(symbol: StockSymbol): StockCardData {
    return stocksMock[symbol];
  }
}
🚀 3. Developer Scripts
Set up the root package.json to launch all development environments with a single command.

JSON

{
  "scripts": {
    "dev": "concurrently \"npm:dev:mobile\" \"npm:dev:web\" \"npm:dev:backend\"",
    "dev:mobile": "nx run mobile:start",
    "dev:web": "nx run web:dev",
    "dev:backend": "nx run backend:start:dev",
    "typecheck": "tsc -b"
  }
}
✅ 4. Phase 0 Completion Checklist
All items must be checked off before proceeding to the Phase 1 task board.

[ ] packages/types compiles successfully with the tsc -p packages/types command.

[ ] The npm run dev command spawns Expo, Next.js, and the NestJS backend without any errors.

[ ] The mobile app launches in the simulator and displays the "Hello Investie Mobile" placeholder.

[ ] The web homepage (http://localhost:3001) displays the "Hello Investie Web" placeholder.

[ ] The backend endpoints /api/v1/market-summary and /api/v1/stocks/AAPL return a 200 OK status with the corresponding mock JSON data.

[ ] All stub components and services export correctly, passing the ESLint check.

[ ] All four developers have cloned the repository, run npm install, and successfully executed npm run dev.

ℹ️ Notes for Phase 1 Planning
Code Sharing: Chart and UI component APIs are identical across mobile and web, allowing for their gradual extraction into a shared packages/ui during Phase 1.

Styling: The Tailwind configuration is shared. The mobile app uses NativeWind, while the web app uses Tailwind CSS 3.

Responsive Design: Investing early in a useBreakpoint helper hook is recommended so that the desktop, tablet, and mobile web views can all reuse the same layout primitives.