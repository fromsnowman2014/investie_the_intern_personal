# Investie - 앱 정보 구성 설계 (최종)

**📱 앱 정보 구성 설계: 요약 보기 모드(Phase 1) vs 상세 보기 모드(Phase 2)**

> 📌 **대상**: 미국 주식 시장 초보~중급 투자자  
> 🎯 **목적**: 투자 판단에 직접 도움이 되는 핵심 정보만 제공  
> 🧩 **모드**: "요약 보기" (MVP 기본), "상세 보기" (Phase 2 확장)  
> 📱 **플랫폼**: React Native 모바일 우선, 카드 기반 UI

---

## 1. Phase 1: 요약 보기 (MVP - 카드뉴스 스타일)

### 🎯 목적
**복잡한 시장/종목 정보를 2-3분 내에 빠르게 파악할 수 있도록 핵심만 직관적으로 요약**

### 📊 매크로(시장 전반) 정보 카드 (1개)

**데이터 소스 및 구현 방식:**
- **🧠 CNN Fear & Greed Index**: Claude Search API로 실시간 수집 → 색상 시각화 (공포/중립/탐욕)
- **🌪️ VIX (변동성 지수)**: Google Finance API → 색상 상태표시 (초록/노랑/빨강)
- **💰 미국 기준금리**: FRED API → Claude가 전망 문구 생성 ("기준금리 정점 도달 예상" 등)
- **🛒 미국 CPI**: FRED API → 전월 대비 증감 + 방향 표시 (↑↓)
- **🧑‍💼 미국 실업률**: FRED API → 최신 수치 + 전월 대비 변화
- **📈 S&P500 요약**: Google Finance API → 1주일 스파크라인

### 🔬 개별 종목 정보 카드 (10개)

**기본 종목 (비로그인)**: AAPL, TSLA, MSFT, GOOGL, AMZN, NVDA, META, NFLX, AVGO, AMD  
**개인화 종목 (로그인)**: 사용자 선택 10개 관심종목

**각 종목당 표시 정보:**
- **💰 현재가 & 변동률**: Google Finance API → 실시간 수집
- **📊 PER**: Google Finance API → 동종업계 평균 대비 평가
- **📈 시가총액 & 거래량**: Google Finance API
- **🎯 52주 최고/최저**: Google Finance API
- **⚖️ RSI**: 계산값 → 과매수/과매도 상태만 표시
- **📰 뉴스 요약**: Google News API + Claude API → 한 줄 요약
- **🏭 섹터 성과**: 해당 종목 섹터의 주간 성과

### 🔄 데이터 업데이트 전략
- **업데이트 주기**: 1일 2회 (오전 6시, 오후 4시 EST)
- **캐싱 전략**: 
  - 주가 데이터: 5분 캐시 (시장 시간 중)
  - AI 요약: 12시간 캐시
  - 경제 지표: 24시간 캐시

---

## 2. Phase 2: 상세 보기 모드 (향후 확장)

### 🎯 목적
**중급~고급 투자자를 위한 심화 분석 정보 제공**

### 📊 매크로 상세 정보
- **📈 1년 추이 차트**: 각 지표별 트렌드 표시
- **📅 경제 캘린더**: FOMC, CPI 발표일 등
- **🏦 주요 지수 트렌드 차트**: S&P500, 나스닥, 다우

### 🔬 개별 종목 상세 정보
- **📊 최근 4분기 EPS, PER, 매출 증가율 차트**
- **📈 선택 가능한 기술적 지표**: RSI, MACD 등
- **🏢 기관 보유 및 내부자 거래 정보**
- **📰 관련 뉴스 Top 3-5**: 접었다 펼 수 있는 UI
- **⚖️ 동종업계 비교 테이블**: PER, EPS 비교
- **🎯 섹터 성과 히트맵**
- **📊 애널리스트 의견 요약**: 매수/보유/매도 비율 시각화

---

## 🛠 기술 구현 사양

### Frontend (React Native + Expo)
```typescript
// 컴포넌트 구조
src/
├── components/
│   ├── cards/
│   │   ├── MarketSummaryCard.tsx
│   │   └── StockCard.tsx
│   ├── charts/
│   │   └── SparklineChart.tsx
│   └── ui/
│       └── ModeToggle.tsx
```

### Backend (NestJS + PostgreSQL + Redis)
```typescript
// API 엔드포인트
/api/v1/
├── market-summary     // 매크로 정보
├── stocks/:symbol     // 개별 종목 정보
├── news/:symbol       // 뉴스 요약
└── user/watchlist     // 개인 관심종목
```

### 데이터 파이프라인
```
External APIs → NestJS Backend → Redis Cache → React Native App
     ↓              ↓              ↓
Google Finance   PostgreSQL   12시간 캐시
FRED API        (영구 저장)   (AI 요약)
Claude API                   5분 캐시
Google News                  (주가 데이터)
```

---

## 🎨 UX/UI 설계 원칙

### 모바일 우선 디자인
- **카드 기반 레이아웃**: 각 정보를 독립적인 카드로 구성
- **색상 코딩**: 직관적인 상승/하락, 긍정/부정 색상
- **모드 전환**: 우측 상단 "기본/상세" 토글 버튼
- **반응형**: NativeWind(Tailwind CSS)로 다양한 화면 크기 지원

### 사용자 플로우
```
앱 실행 → 최신 캐시 데이터 즉시 표시
    ↓
로그인 여부 확인
    ↓               ↓
비로그인          로그인
(기본 10개 종목)   (개인 관심종목 10개)
    ↓               ↓
11개 카드 스크롤 탐색
    ↓
Pull-to-refresh 또는 자동 업데이트
    ↓
Phase 2: 상세 모드 전환 (향후)
```

---

## 🔐 인증 및 개인화

### 인증 시스템 (Firebase Auth)
- **익명 사용**: 기본 10개 종목 카드 제공
- **소셜 로그인**: Google, Facebook, GitHub 계정 연동
- **개인화 기능**: 관심종목 설정, 알림 설정

### 데이터 보호
- HTTPS 통신 강제
- API 키 환경변수 관리
- 개인정보 최소 수집 원칙

---

## 📈 성공 지표 (KPI)

### Phase 1 목표 (3개월)
- **DAU**: 1,000명
- **앱 평점**: 4.5/5.0 이상
- **세션 시간**: 평균 2-3분
- **재방문률**: 70% 이상

### 기술적 성능 목표
- **앱 로딩 시간**: 3초 이내
- **API 응답 시간**: 평균 500ms 이하
- **캐시 적중률**: 90% 이상

---

## ⚠️ 제외 사항 및 제약

### 두 모드에서 공통으로 제외할 정보
- **과도한 기술적 분석**: 복잡한 지표는 Phase 2에서만 선택적 제공
- **전체 재무제표**: 모바일 환경에 부적절
- **해외 시장 정보**: Phase 1에서는 미국 시장만 집중
- **실시간 채팅/커뮤니티**: Phase 1 범위 외

### 기술적 제약사항
- **API 비용 관리**: Claude API 12시간 캐싱으로 비용 최적화
- **Google Finance API 한도**: Alpha Vantage 백업 API 준비
- **모바일 성능**: 이미지 최적화, 코드 스플리팅 적용

---

## 🚀 개발 로드맵

### Week 1: 기반 구축
- [x] 프로젝트 스캐폴딩 (Expo + NestJS)
- [x] API 통합 테스트
- [x] 디자인 시스템 구현

### Week 2: 핵심 개발
- [x] 시장 요약 카드 구현
- [x] 종목 카드 개발 (기본 버전)
- [x] 백엔드 API 엔드포인트

### Week 3: 통합 & 기능
- [x] 프론트엔드-백엔드 통합
- [x] 인증 시스템 구현
- [x] 데이터 캐싱 설정

### Week 4: 테스트 & 배포
- [x] 통합 테스트
- [x] 성능 최적화
- [x] 앱스토어 제출 준비

---

## 📋 팀 구조 및 역할 분담 (4명)

### Option 1: 전문 분야별 분업
| 역할 | 담당 업무 | 비중 | 핵심 기술 |
|------|-----------|------|-----------|
| Frontend Developer 1 | React Native 앱 개발, 카드 UI 구현 | 25% | React Native, TypeScript |
| Frontend Developer 2 | 차트 컴포넌트, 상태 관리, 사용자 인터랙션 | 25% | React Native, Recharts, Zustand |
| Backend Developer 1 | API 서버, 데이터베이스, 인증 시스템 | 25% | Node.js, PostgreSQL, Firebase Auth |
| Backend Developer 2 | Claude API 연동, 데이터 파이프라인, 외부 API 통합 | 25% | Claude API, Google Finance API, FRED API |

### Option 2: 모듈별 독립 개발 (풀스택)
| 개발자 | 모듈 | Frontend 업무 | Backend 업무 |
|--------|------|---------------|---------------|
| **Developer A** | 시장 요약 카드 모듈 | Fear & Greed, VIX UI | FRED API, Claude Search 연동 |
| **Developer B** | 개별 종목 카드 모듈 | 종목 카드 UI (AAPL, TSLA, MSFT) | Google Finance API 연동 |
| **Developer C** | 개별 종목 카드 모듈 | 종목 카드 UI (GOOGL, AMZN, NVDA, META) | News API, 데이터 캐싱 |
| **Developer D** | 인증 & 개인화 모듈 | 로그인 UI, 설정 화면, 종목 카드 UI (NFLX, AVGO, AMD) | 소셜 인증, 사용자 데이터 관리 |

---

이 설계는 PRD와 기술 스택 문서의 모든 요구사항을 반영하여 일관성 있는 앱 구조를 제시합니다. Phase 1 MVP는 카드 기반의 간단한 요약 정보에 집중하고, Phase 2에서 상세 분석 기능을 확장하는 단계별 접근 방식을 따릅니다.