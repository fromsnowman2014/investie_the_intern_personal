# Investie - 기술 스택 (업데이트)

# 📈 Investie 기술 스택 제안서 (앱 아키텍처 설계 기반)

미국 주식 투자자를 위한 정보 요약 앱 **Investie** 개발을 위한 기술 스택 제안입니다.

Phase 1은 **모바일 우선 MVP**를 React Native로 개발하며, 향후 웹 확장을 고려하여 설계되었습니다.

---

## 🔧 전체 구조 요약

| 영역 | 기술 스택 | 설명 |
| --- | --- | --- |
| 프론트엔드 | **React Native (Expo)** + TypeScript | 크로스 플랫폼 모바일 개발, 코드 재사용성 |
| 스타일링 | **Tailwind CSS (NativeWind)** | 빠른 UI 개발 + 모바일 반응형 디자인 |
| 차트 | **Recharts** | 모바일용 간단한 차트 및 스파크라인 |
| 상태관리 | **Zustand** | 경량 상태관리 |
| 백엔드 | **Node.js (NestJS)** | 모듈 구조, 강력한 확장성 |
| 데이터 수집 | 외부 API | Google Finance, FRED, Claude, Google News |
| 데이터 저장 | **PostgreSQL + Redis** | 구조적 저장 + 빠른 캐싱 |
| 인증/보안 | **Firebase Auth** | 소셜 로그인 (구글, 페이스북, GitHub) |
| 배포 | **Expo** (모바일), **Render/Fly.io** (백엔드) | 빠르고 간단한 배포 |
| 모니터링 | Sentry, LogRocket, UptimeRobot | 실시간 상태 체크 및 버그 추적 |
| 협업 관리 | GitHub + GitHub Projects + Notion | 협업 및 일정/역할 분배 관리 |

---

## 🔄 API 구성 및 데이터 플로우

### 📊 **주요 데이터 소스**
| API | 용도 | 업데이트 주기 | 캐싱 전략 |
| --- | --- | --- | --- |
| **Google Finance API** ⭐ | 주식 가격, PER, VIX, 시가총액 | 실시간 (장중) | 5분 캐시 |
| **FRED API** | 경제 지표 (금리, CPI, 실업률) | 발표일 기준 | 24시간 캐시 |
| **Claude API** | AI 요약, 인포그래픽, Fear & Greed 검색 | 하루 2회 (동부시간 6시, 16시) | 12시간 캐시 |
| **Google News API** | 종목 관련 뉴스 | 시간별 | 1시간 캐시 |

### 🔄 **데이터 처리 파이프라인**
```
1. 데이터 수집 → 외부 API
2. 데이터 처리 → Claude AI 요약
3. 데이터 캐싱 → Redis (다계층 캐싱)
4. 데이터 저장 → PostgreSQL (일일 스냅샷)
5. 데이터 전달 → React Native 앱
```

---

## 📱 Phase 1: 요약 보기 모드 (MVP)

### ✅ **핵심 기능 구현**
| 기능 | 기술/도구 | 설명 |
| --- | --- | --- |
| 시장 요약 카드 | Google Finance + FRED + Claude API | Fear & Greed, VIX, 금리, CPI, 실업률 |
| 10개 종목 카드 | Google Finance API + Claude 요약 | AAPL, TSLA, MSFT, GOOGL, AMZN, NVDA, META, NFLX, AVGO, AMD |
| 뉴스 요약 | Google News API + Claude AI | 종목별 한 줄 요약 |
| UI 구현 | React Native + NativeWind | 카드형 레이아웃, 모바일 최적화 |
| 인증 | Firebase Auth | 소셜 로그인 (구글, 페이스북, GitHub) |
| 데이터 업데이트 | 자동화된 크론 작업 | 하루 2회 (동부시간 6시, 16시) |

### 🎨 **프론트엔드 기술 스택**
```javascript
// 핵심 프레임워크
React Native (Expo managed workflow)
TypeScript (strict mode)
NativeWind (React Native용 Tailwind CSS)

// 상태 관리
Zustand (경량 글로벌 상태)
React Query (API 캐싱 및 동기화)

// 차트 & 시각화
Recharts (모바일용 간단한 차트)
Victory Native (복잡한 차트용 대안)

// 내비게이션
React Navigation v6

// 테스팅
Jest + React Native Testing Library
```

### 🔧 **백엔드 기술 스택**
```javascript
// 핵심 프레임워크
Node.js + NestJS
TypeScript (풀스택 일관성)

// 데이터베이스
PostgreSQL (주요 데이터 저장)
Redis (캐싱 레이어)

// API & 서비스
Google Finance API (주식 데이터)
FRED API (경제 지표)
Claude API (AI 처리)
Google News API (뉴스 데이터)

// 인증
Firebase Auth (소셜 로그인)
JWT 토큰 (세션 관리)

// 배포
Docker 컨테이너
Fly.io 또는 Render (백엔드 호스팅)
```

---

## 📊 Phase 2: 상세 보기 모드 (향후)

| 기능 | 기술/도구 | 설명 |
| --- | --- | --- |
| 1년 추이 그래프 | Recharts / D3.js | 각 지표별 추세 표시 |
| 경제 캘린더 | 자체 DB + 외부 API | FOMC, CPI 발표일 등 표시 |
| 종목 상세 정보 | 향상된 차트 + 요약 데이터 | EPS, PER, RSI, MACD 등 |
| 기관/내부자 거래 | OpenInsider / WhaleWisdom | 웹 크롤링 또는 API 연동 |
| 뉴스 Top 3~5 | Google News + Claude | 접힘/펼침 UI |
| 동종업계 비교 | 테이블 또는 히트맵 | PER, EPS 등 비교 |
| 애널리스트 의견 | TipRanks 또는 Zacks | 매수/보유/매도 비율 시각화 |

---

## 📦 프로젝트 구조 (React Native + NestJS)

```
investie/
├── apps/
│   ├── mobile/          # React Native 앱 (Expo)
│   └── backend/         # NestJS API 서버
├── packages/
│   ├── ui/              # 공유 UI 컴포넌트
│   ├── types/           # TypeScript 타입 정의
│   └── utils/           # 포맷팅, API 헬퍼
├── docs/                # 기획 및 기술 문서
├── scripts/             # 배포 및 자동화 스크립트
└── .github/             # CI/CD, 이슈 템플릿
```

### 📱 **모바일 앱 구조**
```
apps/mobile/
├── src/
│   ├── components/
│   │   ├── cards/       # 시장 & 종목 카드
│   │   ├── charts/      # 차트 컴포넌트
│   │   └── ui/          # 공통 UI 컴포넌트
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── hooks/           # 커스텀 React 훅
│   ├── services/        # API 서비스 레이어
│   ├── store/           # Zustand 스토어
│   └── types/           # TypeScript 타입
├── app.config.js        # Expo 설정
└── package.json
```

---

## 🧑‍💻 팀 구성 (4인) - 업데이트

### 🏗️ **옵션 1: 전문 분야별 분담**
| 역할 | 담당 업무 | 비중 | 주요 기술 |
| --- | --- | --- | --- |
| **모바일 개발자 1** | React Native 앱, 카드 UI 컴포넌트 | 25% | React Native, TypeScript, NativeWind |
| **모바일 개발자 2** | 차트, 상태관리, 내비게이션 | 25% | React Native, Recharts, Zustand |
| **백엔드 개발자 1** | NestJS API, 데이터베이스, 인증 | 25% | Node.js, PostgreSQL, Firebase Auth |
| **백엔드 개발자 2** | 외부 API 연동, 데이터 파이프라인 | 25% | Claude API, Google Finance, FRED API |

### ⚡ **옵션 2: 모듈별 독립 개발**
| 개발자 | 담당 모듈 | 모바일 업무 | 백엔드 업무 |
| --- | --- | --- | --- |
| **개발자 A** | 시장 요약 모듈 | 시장 카드 UI, 경제 지표 | FRED API, Claude 검색 연동 |
| **개발자 B** | 종목 카드 모듈 (1-3) | AAPL, TSLA, MSFT 카드 UI | Google Finance API 연동 |
| **개발자 C** | 종목 카드 모듈 (4-7) | GOOGL, AMZN, NVDA, META 카드 UI | 뉴스 API, 캐싱 최적화 |
| **개발자 D** | 인증 & 종목 카드 (8-10) | 로그인 UI, NFLX, AVGO, AMD 카드 | 소셜 인증, 사용자 데이터 관리 |

---

## 🔄 데이터 업데이트 전략

### ⏰ **업데이트 일정 (동부시간)**
- **오전 6시**: 장 시작 전 요약 생성
  - 해외 뉴스 분석
  - 아시아 시장 영향 평가
  - 당일 경제 캘린더
- **오후 4시**: 장 마감 후 요약 생성
  - 일일 성과 분석
  - 애프터마켓 뉴스 통합
  - 다음 거래일 전망

### 💾 **캐싱 아키텍처**
```
클라이언트 (React Native)
├── 로컬 스토리지 (사용자 설정)
├── React Query 캐시 (API 응답)
└── 이미지 캐시 (Expo)

백엔드 (NestJS)
├── Redis L1 캐시 (5분 주식 데이터)
├── Redis L2 캐시 (12시간 AI 요약)
└── PostgreSQL (영구 저장)
```

---

## 🚀 향후 확장 계획

| 기능 | 제안 기술/방식 |
| --- | --- |
| 웹 애플리케이션 | Next.js (React Native와 코드 공유) |
| 실시간 알림 | Expo Notifications + Firebase Cloud Messaging |
| 프리미엄 기능 | Stripe 연동, In-App Purchase |
| 소셜 기능 | Supabase 또는 Firebase (Realtime DB) |
| AI 강화 | Claude API 고급 기능, 커스텀 모델 |
| 해외 시장 | 다지역 API 지원, 현지화 |

---

## ⚠️ 기술적 리스크 및 대응방안

### 🔴 **고위험 요소**
1. **Google Finance API 요청 한도**
   - **리스크**: 사용량 급증 시 서비스 중단
   - **대응**: Alpha Vantage 백업 API, 적극적 캐싱 전략
   
2. **Claude API 비용**
   - **리스크**: 사용자 증가에 따른 비용 급증
   - **대응**: 최적화된 프롬프트, 요약 길이 제한, 12시간 캐싱

3. **모바일 성능**
   - **리스크**: 구형 기기에서 느린 로딩
   - **대응**: 코드 스플리팅, 이미지 최적화, 효율적 렌더링

### 🟡 **중위험 요소**
1. **실시간 데이터 동기화**
   - **리스크**: API 간 데이터 불일치
   - **대응**: 타임스탬프 검증, 데이터 품질 검사

2. **앱스토어 승인**
   - **리스크**: 금융 앱 심사 지연
   - **대응**: 명확한 면책조항, 컴플라이언스 문서화

---

## 📊 개발 일정 (4주)

### 1주차: 기반 구축
- [ ] 프로젝트 스캐폴딩 (Expo + NestJS)
- [ ] 개발 환경 설정
- [ ] API 연동 테스트
- [ ] 디자인 시스템 구현

### 2주차: 핵심 개발
- [ ] 시장 요약 카드 구현
- [ ] 종목 카드 개발 (기본 버전)
- [ ] 백엔드 API 엔드포인트
- [ ] 데이터베이스 스키마 설정

### 3주차: 통합 & 기능
- [ ] 프론트엔드-백엔드 통합
- [ ] 인증 기능 구현
- [ ] 데이터 캐싱 설정
- [ ] 에러 처리 & 로딩 상태

### 4주차: 테스트 & 배포
- [ ] 종단간 테스트
- [ ] 성능 최적화
- [ ] 앱스토어 제출 준비
- [ ] 프로덕션 배포

---

## ✅ 기술 요약

| 카테고리 | 선택 기술 | 선택 이유 |
| --- | --- | --- |
| **모바일 프레임워크** | React Native (Expo) | 크로스 플랫폼, 빠른 개발, 강력한 생태계 |
| **백엔드 프레임워크** | Node.js (NestJS) | TypeScript 일관성, 모듈화 아키텍처, 확장성 |
| **데이터베이스** | PostgreSQL + Redis | 안정성 + 성능, 구조화된 데이터 + 캐싱 |
| **API** | Google Finance + FRED + Claude | 포괄적 데이터 커버리지, AI 기능 |
| **인증** | Firebase Auth | 소셜 로그인 지원, 엔터프라이즈급 보안 |
| **배포** | Expo + Fly.io/Render | 간단한 모바일 배포 + 백엔드 호스팅 |

---

## 🎯 핵심 차별화 요소

1. **모바일 우선 설계**: 스마트폰 사용 패턴에 최적화
2. **AI 기반 요약**: Claude 연동으로 지능적인 시장 분석
3. **실시간 업데이트**: 시장 시간에 맞춘 하루 2회 새로고침
4. **개인화**: 소셜 로그인을 통한 맞춤형 관심 종목
5. **성능**: 적극적인 캐싱으로 빠른 로딩 시간
6. **확장성**: 쉬운 기능 확장을 위한 모듈화 아키텍처

---

## 🎯 모듈 분할 전략 (옵션 2)

### 📊 **개발자 A: 시장 요약 카드**
```
모바일: Fear & Greed + VIX + 경제지표 UI
백엔드: FRED API + Claude 검색 + 캐싱
```

### 📈 **개발자 B: 종목 카드 (AAPL, TSLA, MSFT)**
```
모바일: 애플, 테슬라, 마이크로소프트 카드 UI
백엔드: Google Finance API (대형 기술주)
```

### 📊 **개발자 C: 종목 카드 (GOOGL, AMZN, NVDA, META)**
```
모바일: 구글, 아마존, 엔비디아, 메타 카드 UI
백엔드: 뉴스 API + 데이터 캐싱 최적화
```

### 🔐 **개발자 D: 인증 & 종목 카드 (NFLX, AVGO, AMD)**
```
모바일: 로그인 UI + 넷플릭스, 브로드컴, AMD 카드 UI
백엔드: 소셜 인증 + 사용자 데이터 관리
```

---

> 이 기술 스택은 2025년 기준으로 4인 개발 팀이 모바일 우선 금융 정보 앱을 구축하는 데 필요한 유지보수성, 확장성, 학습 곡선을 고려하여 최적화되었습니다.