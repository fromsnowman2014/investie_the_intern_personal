# Investie - MVP 개발 전략서: 요약 카드 앱 (Phase 1)

## 🎯 프로젝트 목표

- **일일 시장 개요**: 하루에 한 번 업데이트되는 간결한 미국 주식시장 요약을 1-2페이지로 제공
- **AI 기반 인텔리전스**: AI를 활용해 실시간 데이터를 투자 의사결정에 도움이 되는 인사이트로 합성
- **초보자 친화적 설계**: 카드 중심 UI, 최소한의 차트, 최대한의 명확성으로 초보-중급 투자자를 타겟
- **신속한 개발**: 모듈화된 병렬 개발 방식으로 4인 팀이 4주 내 MVP 완성

---

## 🧠 핵심 전략 요약

| 카테고리 | 세부사항 |
|----------|---------|
| **타겟 사용자** | 초보-중급 미국 주식 투자자 |
| **데이터 전략** | 지능형 캐싱을 활용한 다중 API 통합 (Google Finance, FRED, Claude, News) |
| **핵심 가치** | 하루 2회 AI 요약 시장 인텔리전스 (오전 6시 & 오후 4시 EST) |
| **플랫폼** | 웹 확장 가능성을 고려한 모바일 우선 React Native 앱 |
| **개발 모델** | 병렬적이고 의존성 없는 개발을 가능하게 하는 모듈화 아키텍처 |

---

## ⚙️ 기술 스택 (프로젝트 문서와 연계)

### 🖱️ 프론트엔드 아키텍처
```typescript
- React Native (Expo 관리 워크플로우)
- TypeScript (금융 데이터 안전성을 위한 엄격 모드)
- NativeWind (React Native용 Tailwind CSS)
- Zustand (경량 상태 관리)
- React Query (API 캐싱 및 동기화)
- Recharts (모바일 최적화 차트 및 스파크라인)
- React Navigation v6
```

### 🔧 백엔드 아키텍처  
```typescript
- Node.js + NestJS (모듈식 백엔드 구조)
- PostgreSQL (구조화된 금융 데이터 저장소)
- Redis (다층 캐싱 전략)
- Firebase Auth (소셜 로그인: Google, Facebook, GitHub)
- JWT 토큰 (보안 세션 관리)
```

### 🤖 AI 및 데이터 서비스
```typescript
- Claude API (주요 AI 요약 및 시장 분석)
- Google Finance API ⭐ (주요 주식 데이터 소스)
- FRED API (필수 경제 지표)
- Google News API (맥락적 시장 뉴스)
```

---

## 🧩 기능 아키텍처 (MVP 사양)

### 📊 카드 구조 (총 11개 카드)

#### **[1] 시장 요약 카드 (거시 개요)**
```typescript
interface MarketSummaryCard {
  fearGreedIndex: {
    value: number;
    status: 'fear' | 'neutral' | 'greed';
    color: string;
    source: 'claude_search'; // CNN F&G 실시간 조회
  };
  vix: {
    value: number;
    status: 'low' | 'medium' | 'high';
    color: string;
    source: 'google_finance';
  };
  interestRate: {
    value: number;
    aiOutlook: string; // Claude 생성 해석
    source: 'fred_api';
  };
  cpi: {
    value: number;
    monthOverMonth: number;
    direction: 'up' | 'down';
    source: 'fred_api';
  };
  unemploymentRate: {
    value: number;
    monthOverMonth: number;
    source: 'fred_api';
  };
  sp500Sparkline: {
    data: number[];
    weeklyTrend: 'up' | 'down' | 'flat';
    source: 'google_finance';
  };
}
```

#### **[2] 개별 주식 카드 (10개 카드)**
**기본 포트폴리오**: AAPL, TSLA, MSFT, GOOGL, AMZN, NVDA, META, NFLX, AVGO, AMD

```typescript
interface StockCard {
  symbol: string;
  name: string;
  price: {
    current: number;
    change: number;
    changePercent: number;
    source: 'google_finance';
  };
  fundamentals: {
    pe: number;
    marketCap: number;
    volume: number;
    fiftyTwoWeekHigh: number;
    fiftyTwoWeekLow: number;
    source: 'google_finance';
  };
  technicals: {
    rsi: number;
    rsiStatus: 'oversold' | 'neutral' | 'overbought';
  };
  newsSummary: {
    headline: string; // Claude 생성 한 줄 요약
    sentiment: 'positive' | 'neutral' | 'negative';
    source: 'google_news + claude_ai';
  };
  sectorPerformance: {
    name: string;
    weeklyChange: number;
    source: 'google_finance';
  };
}
```

---

## 👥 모듈화 개발 전략 (4인 팀)

### 🏗️ 모듈 기반 병렬 개발

#### **개발자 A: 시장 요약 모듈**
```typescript
범위: 시장 거시 지표 및 경제 데이터
프론트엔드 작업:
- MarketSummaryCard 컴포넌트
- Fear & Greed Index 시각화
- VIX 상태 표시기
- 경제 지표 표시 (CPI, 실업률, 금리)
- S&P500 스파크라인 통합

백엔드 작업:
- FRED API 서비스 통합
- Fear & Greed Index를 위한 Claude Search API
- 시장 데이터 캐싱 전략
- 경제 데이터 검증 및 포맷팅
```

#### **개발자 B: 주식 카드 모듈 (그룹 1)**
```typescript
범위: AAPL, TSLA, MSFT, GOOGL 주식 카드
프론트엔드 작업:
- StockCard 컴포넌트 템플릿
- 변동 지표가 포함된 가격 표시
- P/E 비율 및 시가총액 포맷팅
- 뉴스 요약 통합
- 반응형 카드 레이아웃

백엔드 작업:
- Google Finance API 서비스
- 주식 데이터 정규화
- 실시간 가격 캐싱 (5분 간격)
- 금융 지표 계산
```

#### **개발자 C: 주식 카드 모듈 (그룹 2)**
```typescript
범위: AMZN, NVDA, META, NFLX 주식 카드
프론트엔드 작업:
- 기술적 지표 표시 (RSI)
- 섹터 성과 시각화
- 52주 고점/저점 지표
- 거래량 및 시가총액 포맷팅

백엔드 작업:
- Google News API 통합
- Claude AI 뉴스 요약
- 기술적 지표 계산
- 뉴스 감정 분석
```

#### **개발자 D: 인증 및 주식 카드 모듈 (그룹 3)**
```typescript
범위: 사용자 관리 + AVGO, AMD 주식 카드
프론트엔드 작업:
- 로그인/로그아웃 UI 컴포넌트
- 소셜 인증 플로우
- 사용자 설정 및 환경설정
- 관심종목 관리 UI
- 마지막 2개 주식 카드 (AVGO, AMD)

백엔드 작업:
- Firebase Auth 통합
- 사용자 데이터 관리
- 소셜 로그인 제공자 (Google, Facebook, GitHub)
- 개인화된 관심종목 저장소
```

### 🔗 모듈 통합 지점

#### **공유 인터페이스 및 타입**
```typescript
// packages/types/src/index.ts
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
  source: string;
}

export interface CacheStrategy {
  key: string;
  ttl: number; // 초 단위 생존 시간
  source: 'redis' | 'memory' | 'persistent';
}

// 모든 모듈에서 공유
export type StockSymbol = 'AAPL' | 'TSLA' | 'MSFT' | 'GOOGL' | 'AMZN' | 
                         'NVDA' | 'META' | 'NFLX' | 'AVGO' | 'AMD';
```

#### **공통 UI 컴포넌트**
```typescript
// packages/ui/src/components/
- Card (기본 카드 컴포넌트)
- SkeletonCard (로딩 상태)
- ErrorCard (에러 처리)
- PriceIndicator (색상으로 표시되는 가격 변동)
- SparklineChart (미니 차트)
- StatusBadge (색상 코딩된 상태 표시기)
```

#### **공유 서비스**
```typescript
// packages/utils/src/
- formatCurrency()
- formatPercentage()
- calculateRSI()
- validateStockData()
- generateCacheKey()
```

---

## 🔄 데이터 플로우 및 업데이트 전략

### ⏰ 동기화된 업데이트 스케줄
```typescript
// 일일 업데이트 오케스트레이션
오전 6:00 EST: 장전 분석
- 밤새 뉴스 처리
- 아시아 시장 영향 평가
- 당일 경제 캘린더 검토
- AI 요약 생성

오후 4:00 EST: 장후 분석  
- 거래일 성과 요약
- 시간외 거래 발전상황
- 다음 거래일 전망 생성
```

### 💾 다층 캐싱 아키텍처
```typescript
// 데이터 타입별 캐싱 전략
interface CacheConfig {
  stockPrices: {
    source: 'google_finance';
    ttl: 300; // 장중 5분
    storage: 'redis_l1';
  };
  
  aiSummaries: {
    source: 'claude_api';
    ttl: 43200; // 12시간
    storage: 'redis_l2';
  };
  
  economicData: {
    source: 'fred_api';
    ttl: 86400; // 24시간
    storage: 'postgresql';
  };
  
  userPreferences: {
    source: 'firebase';
    ttl: 'persistent';
    storage: 'local_async_storage';
  };
}
```

---

## 🧪 개발 워크플로우

### 📋 주차별 개발 계획

#### **1주차: 기반 및 설정**
```typescript
모든 개발자 (공유 작업):
- 프로젝트 스캐폴딩 (Expo + NestJS 모노레포)
- 공유 타입 정의 및 인터페이스
- 공통 UI 컴포넌트 라이브러리 설정
- API 서비스 레이어 아키텍처
- Git 워크플로우 및 코드 리뷰 프로세스
- 개발 환경 표준화

모듈별 설정:
- 개별 API 통합 테스트
- 컴포넌트 스텁 생성
- 병렬 개발을 위한 목 데이터 생성
```

#### **2주차: 핵심 모듈 개발**
```typescript
병렬 개발 단계:
개발자 A: 시장 요약 백엔드 + 프론트엔드 통합
개발자 B: Google Finance 통합을 포함한 주식 카드 (그룹 1)  
개발자 C: 뉴스 API 통합을 포함한 주식 카드 (그룹 2)
개발자 D: 인증 시스템 + 주식 카드 (그룹 3)

통합 체크포인트:
- API 계약 검증을 위한 일일 스탠드업
- 공유 컴포넌트 라이브러리 업데이트
- 모듈 간 의존성 해결
```

#### **3주차: 통합 및 개선**
```typescript
시스템 통합:
- 모듈 연결성 테스트
- 엔드투엔드 데이터 플로우 검증
- 성능 최적화
- 에러 처리 구현
- 로딩 상태 관리

사용자 경험:
- 카드 애니메이션 및 전환
- 당겨서 새로고침 기능  
- 오프라인 기능
- 접근성 개선
```

#### **4주차: 테스트 및 배포**
```typescript
품질 보증:
- 모듈 간 통합 테스트
- 성능 벤치마킹
- 보안 감사 (API 키, 인증)
- 디바이스 호환성 테스트

프로덕션 준비:
- 앱스토어 제출 준비
- 프로덕션 환경 설정
- 모니터링 및 알림 구성
- 베타 사용자 피드백 통합
```

### 🔧 개발 가이드라인

#### **API 통합 패턴**
```typescript
// 모든 모듈을 위한 표준화된 서비스 패턴
@Injectable()
export class BaseDataService<T> {
  constructor(
    private cacheService: CacheService,
    private httpService: HttpService
  ) {}

  async getData(key: string, fetcher: () => Promise<T>): Promise<T> {
    const cached = await this.cacheService.get(key);
    if (cached) return cached;
    
    const fresh = await fetcher();
    await this.cacheService.set(key, fresh, this.getTTL(key));
    return fresh;
  }
  
  private getTTL(key: string): number {
    // 데이터 타입에 따른 동적 TTL
    if (key.includes('stock-price')) return 300; // 5분
    if (key.includes('ai-summary')) return 43200; // 12시간
    return 3600; // 기본 1시간
  }
}
```

#### **컴포넌트 개발 표준**
```typescript
// 모든 모듈에서 일관된 컴포넌트 구조
interface ComponentProps {
  data?: T;
  loading?: boolean;
  error?: Error;
  onRetry?: () => void;
}

export const ExampleCard: React.FC<ComponentProps> = ({
  data,
  loading,
  error,
  onRetry
}) => {
  if (loading) return <SkeletonCard />;
  if (error) return <ErrorCard onRetry={onRetry} />;
  if (!data) return null;
  
  return (
    <Card className="bg-white rounded-xl p-4 shadow-sm mb-4">
      {/* 컴포넌트 내용 */}
    </Card>
  );
};
```

---

## 🔒 품질 보증 및 보안

### 🛡️ 보안 구현
```typescript
// 환경 변수 관리
interface SecurityConfig {
  apiKeys: {
    google_finance: string;
    fred_api: string;
    claude_api: string;
    google_news: string;
  };
  auth: {
    firebase_config: object;
    jwt_secret: string;
  };
  database: {
    postgres_url: string;
    redis_url: string;
  };
}

// 속도 제한 및 검증
const API_LIMITS = {
  google_finance: { requests: 1000, window: '1d' },
  claude_api: { requests: 500, window: '1d' },
  fred_api: { requests: 120, window: '1h' },
} as const;
```

### 📊 성능 모니터링
```typescript
// 추적할 주요 지표
interface PerformanceMetrics {
  appStartTime: number;
  cardLoadTime: number;
  apiResponseTime: Record<string, number>;
  cacheHitRate: number;
  errorRate: number;
  userEngagement: {
    sessionDuration: number;
    cardsViewed: number;
    refreshRate: number;
  };
}
```

---

## 🚀 MVP 이후 확장 전략

### 📈 Phase 2: 향상된 기능 (6개월 후)
- 고급 차트가 포함된 상세 보기 모드
- 인증 사용자를 위한 개인화된 관심종목  
- 중요한 시장 이벤트에 대한 푸시 알림
- 포트폴리오 추적 기능

### 🌐 Phase 3: 플랫폼 확장 (12개월 후)
- Next.js를 사용한 웹 애플리케이션 (React Native와 코드 공유)
- 프리미엄 구독 기능
- 소셜 공유 및 커뮤니티 기능
- 고급 AI 분석 리포트

### 🔧 기술 부채 관리
- 공유 컴포넌트의 지속적인 리팩토링
- API 최적화 및 비용 절감
- 성능 모니터링 및 최적화
- 보안 감사 및 업데이트

---

## 💡 핵심 성공 요인

### ✅ **모듈화 독립성**
각 개발자가 다른 개발자를 막지 않고 할당된 모듈에서 독립적으로 작업할 수 있어 진정한 병렬 개발이 가능합니다.

### ✅ **일관된 아키텍처**  
공유 인터페이스, 컴포넌트, 패턴이 모듈들이 합쳐질 때 원활한 통합을 보장합니다.

### ✅ **AI 우선 접근법**
Claude API 통합이 일반적인 시장 앱과 Investie를 차별화하는 지능형 요약을 제공합니다.

### ✅ **모바일 최적화 UX**
NativeWind를 활용한 카드 기반 설계로 모바일 디바이스에서 빠르고 직관적인 사용자 경험을 보장합니다.

### ✅ **확장 가능한 기반**
PostgreSQL + Redis + NestJS 아키텍처는 대대적인 재작성 없이 향후 기능 확장을 지원합니다.

이 개발 전략은 코드 품질과 시스템 통합을 유지하면서 효율적인 병렬 개발을 가능하게 하여 Investie의 신속한 MVP 완성과 성공적인 시장 진입을 지원합니다.