# Investie Development Plan - Vibe Coding Approach

## 🎯 개발 전략
- **Vibe Coding**: 전체 구조를 먼저 설정하고 feature 단위로 점진적 개발
- **Frontend First**: UI를 먼저 완성하여 즉시 시각적 확인 가능
- **Incremental**: 각 단계마다 동작하는 feature 하나씩 추가
- **Dependency Minimization**: 각 feature가 독립적으로 개발 가능하도록 구조화

---

## 📋 Phase 1: 프로젝트 기초 설정 (Foundation)

### Step 1.1: Project Scaffolding
```bash
# 목표: 기본 프로젝트 구조 생성
```
- [ ] React Native + Expo 프로젝트 초기화
- [ ] TypeScript 설정
- [ ] NativeWind 설정 (Tailwind CSS)
- [ ] 기본 폴더 구조 생성
- [ ] Git 설정 및 .gitignore 구성

**결과물**: 빈 화면이지만 실행 가능한 앱

### Step 1.2: Design System Foundation
```bash
# 목표: 일관된 스타일링 기반 구축
```
- [ ] Color palette 정의 (긍정/부정/중립 색상)
- [ ] Typography 시스템 구성
- [ ] 기본 spacing 규칙 설정
- [ ] 공통 컴포넌트 껍데기 생성:
  - `Card` 컴포넌트
  - `Button` 컴포넌트
  - `Text` 컴포넌트

**결과물**: 스타일 가이드가 적용된 빈 카드들

### Step 1.3: Mock Data Structure
```bash
# 목표: 개발용 가짜 데이터 구조 정의
```
- [ ] TypeScript 타입 정의 생성:
  - `MarketSummaryData` 타입
  - `StockCardData` 타입
  - `ApiResponse` 타입
- [ ] Mock data 파일 생성 (`mockData.ts`)
- [ ] 데이터 포맷팅 유틸리티 함수 작성

**결과물**: 실제 데이터 구조를 반영한 mock data

---

## 📋 Phase 2: Core UI Components (UI Foundation)

### Step 2.1: Basic Card Layout
```bash
# 목표: 카드 기본 레이아웃 구현
```
- [ ] `BaseCard` 컴포넌트 구현
  - 그림자, 모서리 둥글게, 패딩 설정
  - 로딩 상태 표시 기능
  - 에러 상태 표시 기능
- [ ] 카드 그리드 레이아웃 구현
- [ ] ScrollView 기본 설정

**결과물**: 11개의 빈 카드가 스크롤 가능한 리스트로 표시

### Step 2.2: Navigation Setup
```bash
# 목표: 기본 네비게이션 구조 구현
```
- [ ] React Navigation 설정
- [ ] HomeScreen 기본 구조
- [ ] 상단 바 (헤더) 구현
  - 앱 로고/제목
  - 로그인 버튼 자리 (빈 버튼)

**결과물**: 네비게이션이 동작하는 기본 화면

### Step 2.3: Loading & Error States
```bash
# 목표: 사용자 경험 개선을 위한 상태 컴포넌트
```
- [ ] `SkeletonCard` 컴포넌트 구현
- [ ] `ErrorCard` 컴포넌트 구현
- [ ] `LoadingSpinner` 컴포넌트 구현
- [ ] Pull-to-refresh 기능 추가

**결과물**: 로딩/에러 상태를 표시할 수 있는 앱

---

## 📋 Phase 3: Market Summary Card (첫 번째 Feature)

### Step 3.1: Market Summary Card Structure
```bash
# 목표: 시장 요약 카드의 기본 구조 구현
```
- [ ] `MarketSummaryCard` 컴포넌트 생성
- [ ] 6개 섹션 레이아웃:
  - Fear & Greed Index
  - VIX Index
  - Interest Rates
  - CPI
  - Unemployment Rate
  - S&P500 Sparkline
- [ ] Mock data로 기본 정보 표시

**결과물**: 가짜 데이터로 채워진 시장 요약 카드

### Step 3.2: Fear & Greed Indicator
```bash
# 목표: Fear & Greed Index 시각화 구현
```
- [ ] 원형 게이지 컴포넌트 구현
- [ ] 색상 기반 상태 표시 (빨강/노랑/초록)
- [ ] 애니메이션 효과 추가
- [ ] 텍스트 라벨 ("Fear", "Neutral", "Greed")

**결과물**: 동적인 Fear & Greed 인디케이터

### Step 3.3: VIX Indicator
```bash
# 목표: VIX 지수 표시 구현
```
- [ ] 숫자 표시 컴포넌트
- [ ] 상태별 색상 변경 (낮음/보통/높음)
- [ ] 전일 대비 변화량 표시
- [ ] 아이콘 추가 (변동성 표시)

**결과물**: VIX 지수가 시각적으로 표시되는 섹션

### Step 3.4: Economic Indicators
```bash
# 목표: 경제 지표 (금리, CPI, 실업률) 표시
```
- [ ] 숫자 포맷팅 유틸리티 적용
- [ ] 월간 변화량 화살표 표시
- [ ] 각 지표별 아이콘 추가
- [ ] 간단한 텍스트 설명 추가

**결과물**: 3개 경제 지표가 표시되는 섹션

### Step 3.5: S&P500 Sparkline
```bash
# 목표: S&P500 미니 차트 구현
```
- [ ] Recharts로 간단한 라인 차트 구현
- [ ] 1주일 데이터 시각화
- [ ] 상승/하락에 따른 색상 변경
- [ ] 터치 인터랙션 추가

**결과물**: 완전히 동작하는 시장 요약 카드

---

## 📋 Phase 4: Stock Cards Foundation (주식 카드 기반)

### Step 4.1: Stock Card Base Component
```bash
# 목표: 개별 주식 카드 기본 구조 구현
```
- [ ] `StockCard` 컴포넌트 기본 틀
- [ ] 주식 심볼 및 회사명 표시
- [ ] 현재 가격 및 변화량 레이아웃
- [ ] 회사 로고 자리 표시

**결과물**: 기본 정보가 표시되는 주식 카드 틀

### Step 4.2: Price Display Component
```bash
# 목표: 주식 가격 표시 기능 구현
```
- [ ] 현재 가격 포맷팅
- [ ] 변화량 및 변화율 표시
- [ ] 상승/하락 색상 적용
- [ ] 화살표 아이콘 추가

**결과물**: 가격 정보가 올바르게 표시되는 컴포넌트

### Step 4.3: Basic Metrics Display
```bash
# 목표: 기본 지표 (P/E, Market Cap, Volume) 표시
```
- [ ] P/E 비율 표시 및 업계 평균 비교
- [ ] Market Cap 포맷팅 (B, M 단위)
- [ ] 거래량 표시
- [ ] 52주 고점/저점 표시

**결과물**: 주요 지표가 표시되는 주식 카드

---

## 📋 Phase 5: Individual Stock Cards (개별 주식 구현)

### Step 5.1: AAPL (Apple) Stock Card
```bash
# 목표: 첫 번째 완전한 주식 카드 구현
```
- [ ] Apple 주식 카드 완성
- [ ] RSI 인디케이터 추가
- [ ] 뉴스 요약 섹션 추가
- [ ] 섹터 성과 표시

**결과물**: 완전히 동작하는 Apple 주식 카드

### Step 5.2: TSLA (Tesla) Stock Card
```bash
# 목표: 두 번째 주식 카드로 재사용성 검증
```
- [ ] Tesla 주식 카드 구현
- [ ] 컴포넌트 재사용성 확인
- [ ] 필요시 리팩토링

**결과물**: 두 번째 완성된 주식 카드

### Step 5.3: Tech Stocks (MSFT, GOOGL, AMZN)
```bash
# 목표: 대형 기술주 카드 구현
```
- [ ] Microsoft 주식 카드
- [ ] Google 주식 카드  
- [ ] Amazon 주식 카드
- [ ] 동일한 템플릿 적용

**결과물**: 5개의 완성된 주식 카드

### Step 5.4: Remaining Stocks (NVDA, META, NFLX, AVGO, AMD)
```bash
# 목표: 나머지 주식 카드 완성
```
- [ ] NVIDIA 주식 카드
- [ ] Meta 주식 카드
- [ ] Netflix 주식 카드
- [ ] Broadcom 주식 카드
- [ ] AMD 주식 카드

**결과물**: 10개 주식 카드 완성된 MVP

---

## 📋 Phase 6: Data Integration (실제 데이터 연동)

### Step 6.1: API Service Layer
```bash
# 목표: API 호출을 위한 서비스 레이어 구축
```
- [ ] API 클라이언트 기본 구조 생성
- [ ] 환경 변수 설정
- [ ] 에러 핸들링 미들웨어
- [ ] Rate limiting 고려사항

**결과물**: API 호출 준비가 완료된 서비스 레이어

### Step 6.2: Mock API to Real API Migration
```bash
# 목표: 가짜 데이터를 실제 API로 점진적 교체
```
- [ ] Google Finance API 연동 (주식 데이터)
- [ ] FRED API 연동 (경제 지표)
- [ ] 캐싱 전략 구현
- [ ] API 응답 검증

**결과물**: 실제 데이터가 표시되는 앱

### Step 6.3: State Management Integration
```bash
# 목표: Zustand로 상태 관리 구현
```
- [ ] 전역 상태 스토어 설정
- [ ] 시장 데이터 상태 관리
- [ ] 주식 데이터 상태 관리
- [ ] 로딩 상태 관리

**결과물**: 상태 관리가 적용된 앱

### Step 6.4: React Query Integration
```bash
# 목표: 데이터 fetching 및 캐싱 최적화
```
- [ ] React Query 설정
- [ ] 커스텀 훅 구현 (`useMarketData`, `useStockData`)
- [ ] 캐싱 전략 적용
- [ ] Background refetch 설정

**결과물**: 효율적인 데이터 관리 시스템

---

## 📋 Phase 7: Authentication & Personalization

### Step 7.1: Firebase Auth Setup
```bash
# 목표: 소셜 로그인 기능 구현
```
- [ ] Firebase 프로젝트 설정
- [ ] Google 로그인 구현
- [ ] Facebook 로그인 구현
- [ ] GitHub 로그인 구현

**결과물**: 동작하는 소셜 로그인 시스템

### Step 7.2: User Preferences
```bash
# 목표: 사용자 설정 기능 구현
```
- [ ] 사용자 설정 화면 구현
- [ ] 워치리스트 관리 기능
- [ ] 설정 저장/불러오기

**결과물**: 개인화된 주식 목록 기능

---

## 📋 Phase 8: Polish & Optimization

### Step 8.1: Performance Optimization
```bash
# 목표: 앱 성능 최적화
```
- [ ] 이미지 최적화
- [ ] 불필요한 리렌더링 방지
- [ ] 메모이제이션 적용
- [ ] 번들 크기 최적화

### Step 8.2: UI/UX Enhancement
```bash
# 목표: 사용자 경험 개선
```
- [ ] 애니메이션 효과 추가
- [ ] 터치 피드백 개선
- [ ] 접근성 개선
- [ ] 다크 모드 지원 (선택사항)

### Step 8.3: Error Handling & Testing
```bash
# 목표: 안정성 확보
```
- [ ] 포괄적인 에러 처리
- [ ] 단위 테스트 작성
- [ ] 통합 테스트 구현
- [ ] 성능 테스트

---

## 📋 Phase 9: Backend Integration (선택적)

### Step 9.1: NestJS Backend Setup
```bash
# 목표: 백엔드 서버 구축 (필요시)
```
- [ ] NestJS 프로젝트 초기화
- [ ] PostgreSQL 연결
- [ ] Redis 캐싱 설정

### Step 9.2: API Endpoints
```bash
# 목표: RESTful API 구현
```
- [ ] 시장 요약 API
- [ ] 주식 데이터 API
- [ ] 사용자 관리 API

---

## 📋 Phase 10: Deployment & Distribution

### Step 10.1: App Store Preparation
```bash
# 목표: 앱 스토어 배포 준비
```
- [ ] 앱 아이콘 제작
- [ ] 스크린샷 준비
- [ ] 앱 설명 작성
- [ ] 법적 고지사항 추가

### Step 10.2: Release
```bash
# 목표: 앱 스토어 배포
```
- [ ] iOS App Store 배포
- [ ] Google Play Store 배포
- [ ] 베타 테스팅 진행

---

## 🎯 각 단계별 성공 기준

### ✅ 각 단계 완료 시 확인사항
1. **시각적 확인**: 해당 기능이 UI에서 정상 동작
2. **독립성**: 다른 기능에 의존하지 않고 동작
3. **재사용성**: 다음 단계에서 활용 가능한 구조
4. **확장성**: 추가 기능을 쉽게 추가할 수 있는 구조

### 🔄 반복 개발 사이클
각 단계마다:
1. **계획** → 2. **구현** → 3. **테스트** → 4. **확인** → 5. **다음 단계**

### 📱 즉시 피드백 원칙
- 매 단계마다 앱을 실행하여 결과 확인
- 변경사항이 즉시 UI에 반영되는지 검증
- 문제 발생 시 즉시 수정 후 진행

이 플랜을 따라가면 매 단계마다 동작하는 기능을 하나씩 추가하면서 최종 MVP를 완성할 수 있습니다. 각 단계는 독립적이면서도 전체 프로젝트의 일부로 기능하도록 설계되었습니다.