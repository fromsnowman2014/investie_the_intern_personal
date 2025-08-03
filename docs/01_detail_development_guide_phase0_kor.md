Investie Phase 0: 프로젝트 리더 준비 가이드 (📱 모바일 + 🌐 웹)
🎯 목표
프론트엔드 및 백엔드 엔지니어 모두에게 **React Native (모바일 앱)**와 **Next.js 14 (반응형 웹)**를 나란히 구동할 수 있는 단일 모노레포(monorepo) 뼈대를 제공하는 것입니다. 이 구조는 타입, 목업 데이터, 유틸리티를 공유하여 4명의 개발자가 첫날부터 병렬로 개발을 시작할 수 있도록 합니다.

📂 0. 모노레포 구조 (Monorepo Layout)
Nx 워크스페이스를 기반으로 프로젝트 구조를 설정합니다. 이는 코드 재사용성을 극대화하고 일관성을 유지하는 핵심입니다.

investie/
├── apps/
│   ├── mobile/        # React-Native (Expo) 애플리케이션
│   ├── web/           # Next.js 14 애플리케이션
│   └── backend/       # NestJS API 서버
├── packages/
│   ├── types/         # 공유 TypeScript 타입 (계약서)
│   ├── mock/          # 공유 목업 데이터 (JSON 파일)
│   └── utils/         # 공유 헬퍼 함수 (빈 껍데기)
└── package.json       # 루트 스크립트 및 의존성 관리

🧬 1. 공유 패키지 설정
1.1. packages/types (공유 타입 정의)
프론트엔드와 백엔드 간의 "단일 진실 공급원 (Single Source of Truth)" 역할을 합니다. 새로운 필드가 필요하면, 반드시 이 타입 파일에 먼저 Pull Request를 생성해야 합니다.

TypeScript

// packages/types/src/index.ts

// API 및 제네릭 타입
export type Status = 'low' | 'medium' | 'high' | 'fear' | 'neutral' | 'greed' | 'oversold' | 'overbought';
export type Trend = 'up' | 'down' | 'flat';

// 시장 요약 카드 타입
export interface MarketSummaryData {
  fearGreedIndex: { value: number; status: 'fear' | 'neutral' | 'greed' };
  vix: { value: number; status: 'low' | 'medium' | 'high' };
  interestRate: { value: number; aiOutlook: string };
  cpi: { value: number; monthOverMonth: number; direction: 'up' | 'down' };
  unemploymentRate: { value: number; monthOverMonth: number };
  sp500Sparkline: { data: number[]; weeklyTrend: 'up' | 'down' | 'flat' };
}

// 개별 주식 카드 타입
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

1.2. packages/mock (목업 데이터)
Phase 0 동안 두 프론트엔드 앱에 데이터를 제공할 작은 JSON 파일들입니다.

packages/mock/src/market-summary.json

JSON

{
  "fearGreedIndex": { "value": 38, "status": "fear" },
  "vix": { "value": 17.5, "status": "medium" },
  "interestRate": { "value": 5.33, "aiOutlook": "연준은 다음 분기까지 금리를 동결할 것으로 예상됩니다." },
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
    "newsSummary": { "headline": "분석가들은 비전 프로 판매 전망에 대해 여전히 긍정적입니다.", "sentiment": "positive" },
    "sectorPerformance": { "name": "Technology", "weeklyChange": 2.1 }
  }
  // ... 나머지 9개 주식에 대한 목업 데이터 추가
}

1.3. packages/utils (유틸리티 함수 껍데기)
로직은 비어있고 컴파일만 가능한 상태로, 포매팅 함수 등의 뼈대를 미리 정의합니다.

TypeScript

// packages/utils/src/formatters.ts
export const formatCurrency = (value: number) => { /* TODO */ };
export const formatPercentage = (value: number) => { /* TODO */ };


🏗️ 2. 애플리케이션 뼈대(스켈레톤) 구성
2.1. 프론트엔드 (Mobile + Web)
모바일과 웹 앱 모두 동일한 컴포넌트 API를 갖도록 뼈대를 구성하여 코드 공유의 기반을 마련합니다.

🔹 React-Native (apps/mobile)
TypeScript

// apps/mobile/src/components/ui/Card.tsx
import { View } from 'react-native';
export const Card = ({ children }) => <View>{children}</View>;

// apps/mobile/src/components/charts/LineChart.tsx
import { View, Text } from 'react-native';
export const LineChart = () => <View><Text>Line Chart Stub</Text></View>;
🔸 Next.js (apps/web)
Next.js 14의 App Router를 사용합니다. 컴포넌트 API는 모바일과 동일하게 유지합니다.

TypeScript

// apps/web/src/components/ui/Card.tsx
export const Card = ({ children }) => <div>{children}</div>;

// apps/web/src/components/charts/LineChart.tsx
export const LineChart = () => <div>Line Chart Stub</div>;

// apps/web/app/page.tsx
import { MarketSummaryCard } from '@/components/cards/MarketSummaryCard'; // 예시

export default function Home() {
  return (
    <main>
      <h1>Hello Investie Web</h1>
      {/* <MarketSummaryCard /> */}
    </main>
  );
}


2.2. 백엔드 (apps/backend)
NestJS 서비스와 컨트롤러 뼈대를 생성합니다. 초기에는 목업 데이터를 반환합니다.

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


🚀 3. 개발자 스크립트
루트 package.json에서 한 번의 명령어로 모든 개발 환경을 시작할 수 있도록 설정합니다.

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


✅ 4. Phase 0 완료 체크리스트
모든 항목이 체크되어야 Phase 1 태스크 보드로 넘어갈 수 있습니다.

[ ] packages/types가 tsc -p packages/types 명령어로 컴파일됩니다.

[ ] npm run dev 명령어가 Expo, Next.js, NestJS 백엔드를 오류 없이 동시에 실행합니다.

[ ] 모바일 앱이 시뮬레이터에서 "Hello Investie Mobile" 플레이스홀더를 표시합니다.

[ ] 웹 홈페이지(http://localhost:3001)가 "Hello Investie Web" 플레이스홀더를 표시합니다.

[ ] 백엔드 엔드포인트 /api/v1/market-summary 와 /api/v1/stocks/AAPL이 200 OK 와 함께 목업 JSON을 반환합니다.

[ ] 모든 뼈대 컴포넌트/서비스가 올바르게 export되어 ESLint 검사를 통과합니다.

[ ] 모든 개발자가 레포지토리를 클론하고, npm install 및 npm run dev를 성공적으로 완료했습니다.

ℹ️ Phase 1 계획을 위한 참고사항
코드 공유: 차트 및 UI 컴포넌트 API는 모바일과 웹에서 동일하므로, Phase 1에서 점진적으로 packages/ui로 추출할 수 있습니다.

스타일링: Tailwind 설정은 공유됩니다. 모바일은 NativeWind를, 웹은 Tailwind CSS 3를 사용합니다.

반응형 디자인: 데스크톱, 태블릿, 모바일 웹이 동일한 레이아웃 기본 요소를 재사용하도록 useBreakpoint 같은 헬퍼를 조기에 도입하는 것이 좋습니다.