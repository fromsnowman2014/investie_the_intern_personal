# Investie - 기술 스택

# 📈 Investie 기술 스택 제안서 (앱 아키텍처 설계 기반)

미국 주식 투자자를 위한 정보 요약 앱 **Investie** 개발을 위한 기술 스택 제안입니다.

Phase 1은 웹 기반 MVP, 이후 모바일 확장을 고려하여 설계되었습니다.

---

## 🔧 전체 구조 요약

| 영역 | 기술 스택 | 설명 |
| --- | --- | --- |
| 프론트엔드 | **React (Next.js)** + TypeScript | SEO 및 SSR 가능, 확장성 우수 |
| 스타일링 | **Tailwind CSS** | 빠른 UI 구성 + 모바일 반응형 대응 |
| 차트 | **Recharts** + D3.js (선택) | 간단한 건 Recharts, 복잡한 건 D3 |
| 상태관리 | **Zustand** 또는 **React Query** | 경량 상태관리 및 API 캐싱 |
| 백엔드 | **Node.js (NestJS)** 또는 **Python (FastAPI)** | 모듈 구조에 강하고 확장성 있음 |
| 데이터 수집 | 외부 API + 크롤링 (Python) | Alpha Vantage, FRED, yfinance 등 |
| 데이터 저장 | **PostgreSQL + Redis** | 구조적 저장 + 빠른 캐싱 |
| 인증/보안 | **Firebase Auth** 또는 **Clerk.dev** | 익명/로그인 유연 지원 |
| 배포 | **Vercel** (프론트), **Render** 또는 [**Fly.io**](http://fly.io/) (백엔드) | 빠르고 간단한 배포 가능 |
| 모니터링 | Sentry, LogRocket, UptimeRobot | 실시간 상태 체크 및 버그 추적 |
| 협업 관리 | GitHub + GitHub Projects + Notion | 협업 및 일정/역할 분배 관리 |

---

## 📱 요약 보기 모드 (Phase 1)

| 기능 | 기술/도구 | 설명 |
| --- | --- | --- |
| Fear & Greed Index | Alpha Vantage 또는 자체 크롤링 | 색상/그래프 요약 |
| VIX 상태 표시 | FRED API 또는 CBOE 크롤링 | 간단 상태 아이콘 |
| 금리/CPI/실업률 | FRED API | 전월 대비 증감 요약 |
| 개별 종목 요약 | yfinance / Alpha Vantage | PER, EPS, RSI, 섹터 등 |
| 뉴스 요약 | Bing News API + GPT 요약 | 한 줄 요약 생성 |
| UI 구현 | React + Tailwind | 카드형 레이아웃, 반응형 구성 |

---

## 📊 상세 보기 모드 (Phase 2)

| 기능 | 기술/도구 | 설명 |
| --- | --- | --- |
| 1년 추이 그래프 | Recharts / D3.js | 각 지표별 추세 표시 |
| 경제 캘린더 | TradingEconomics API 또는 자체 DB | FOMC, CPI 발표일 등 표시 |
| 종목 상세 정보 | 차트 + 요약 데이터 | EPS, PER, RSI, MACD 등 |
| 기관/내부자 거래 | OpenInsider / WhaleWisdom | 크롤링 또는 요약 제공 |
| 뉴스 Top 3~5 | Bing News + LLM 요약 | 접힘/펼침 UI 적용 |
| 동종업계 비교 | 테이블 or 히트맵 | PER, EPS 등 비교 |
| 애널리스트 의견 | TipRanks 또는 Zacks | 매수/보유/매도 비율 시각화 |

---

## 📦 프로젝트 구조 예시 (Next.js + NestJS 기준)

investie/

├── apps/

│   ├── frontend/    # Next.js (React 기반)

│   └── backend/     # NestJS API 서버

├── packages/

│   ├── ui/          # 공통 UI 컴포넌트

│   └── utils/       # 포맷팅, API 등 유틸

├── docs/            # 기획 및 기술 문서

└── .github/         # CI/CD, 이슈 템플릿 등

---

## 🧑‍💻 팀 구성 예시 (4인 초기 팀)

| 역할 | 주요 담당 |
| --- | --- |
| 👩‍🎨 프론트 1명 | 전체 레이아웃, 요약 보기 UI, 라우팅 |
| 👨‍🎨 프론트 1명 | 차트 컴포넌트, 상세 보기 구성 |
| 🧑‍🔧 백엔드 1명 | API Gateway, 외부 데이터 수집/정제 |
| 🧑‍💼 데이터/기획 1명 | API 리서치, 요약 로직, 문서 관리 |

---

## 🚀 향후 확장 계획

| 항목 | 제안 기술/방식 |
| --- | --- |
| 모바일 앱 | React Native (웹 코드 재사용) 또는 Flutter |
| 실시간 알림 | Firebase Cloud Messaging, OneSignal |
| 유료 기능 | Stripe 연동, In-App Purchase (향후) |
| 댓글/소셜 | Supabase 또는 Firebase (Realtime DB) |
| AI 요약 | OpenAI GPT, Gemini API 등 LLM 활용 |

---

## ✅ 요약

| 항목 | 추천 기술 |
| --- | --- |
| 프론트엔드 | React (Next.js) + Tailwind |
| 백엔드 | Node.js (NestJS) or Python (FastAPI) |
| 데이터 API | Alpha Vantage, FRED, Bing News, yfinance |
| DB | PostgreSQL + Redis |
| 인증/배포 | Firebase Auth / Vercel + Render |
| 추가 기능 | Recharts, GPT 요약, Supabase 등 |

---

> 이 스택은 현재 시점(2025년 기준)에서 유지보수, 확장성, 러닝커브를 고려해 최적화된 구성입니다.
>