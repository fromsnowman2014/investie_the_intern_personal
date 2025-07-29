# Investie - Technology Stack (Updated)

# 📈 Investie Technology Stack Proposal (App Architecture Design)

Technology stack proposal for developing **Investie**, a market summary app for US stock investors.

Phase 1 focuses on **mobile-first MVP** using React Native, with web expansion considered for future phases.

---

## 🔧 Overall Architecture Summary

| Domain | Technology Stack | Description |
| --- | --- | --- |
| Frontend | **React Native (Expo)** + TypeScript | Cross-platform mobile development, code reusability |
| Styling | **Tailwind CSS (NativeWind)** | Fast UI development + mobile responsive design |
| Charts | **Recharts** | Simple charts and sparklines for mobile |
| State Management | **Zustand** | Lightweight state management |
| Backend | **Node.js (NestJS)** | Modular structure, strong scalability |
| Data Collection | External APIs | Google Finance, FRED, Claude, Google News |
| Data Storage | **PostgreSQL + Redis** | Structured storage + fast caching |
| Authentication | **Firebase Auth** | Social login (Google, Facebook, GitHub) |
| Deployment | **Expo** (mobile), **Render/Fly.io** (backend) | Fast and simple deployment |
| Monitoring | Sentry, LogRocket, UptimeRobot | Real-time status monitoring and bug tracking |
| Collaboration | GitHub + GitHub Projects + Notion | Collaboration and task/role management |

---

## 🔄 API Configuration and Data Flow

### 📊 **Primary Data Sources**
| API | Purpose | Update Frequency | Caching Strategy |
| --- | --- | --- | --- |
| **Google Finance API** ⭐ | Stock prices, P/E ratios, VIX, market cap | Real-time (market hours) | 5-minute cache |
| **FRED API** | Economic indicators (rates, CPI, unemployment) | Based on release dates | 24-hour cache |
| **Claude API** | AI summaries, infographics, Fear & Greed search | Twice daily (6 AM, 4 PM EST) | 12-hour cache |
| **Google News API** | Stock-related news | Hourly | 1-hour cache |

### 🔄 **Data Processing Pipeline**
```
1. Data Collection → External APIs
2. Data Processing → Claude AI summarization
3. Data Caching → Redis (multi-tier caching)
4. Data Storage → PostgreSQL (daily snapshots)
5. Data Delivery → React Native app
```

---

## 📱 Phase 1: Summary View Mode (MVP)

### ✅ **Core Features Implementation**
| Feature | Technology/Tool | Description |
| --- | --- | --- |
| Market Summary Card | Google Finance + FRED + Claude APIs | Fear & Greed, VIX, rates, CPI, unemployment |
| 10 Stock Cards | Google Finance API + Claude summarization | AAPL, TSLA, MSFT, GOOGL, AMZN, NVDA, META, NFLX, AVGO, AMD |
| News Summaries | Google News API + Claude AI | One-line summaries per stock |
| UI Implementation | React Native + NativeWind | Card-based layout, mobile-optimized |
| Authentication | Firebase Auth | Social login (Google, Facebook, GitHub) |
| Data Updates | Automated cron jobs | Twice daily (6 AM, 4 PM EST) |

### 🎨 **Frontend Technology Stack**
```javascript
// Core Framework
React Native (Expo managed workflow)
TypeScript (strict mode)
NativeWind (Tailwind CSS for React Native)

// State Management
Zustand (lightweight global state)
React Query (API caching and synchronization)

// Charts & Visualization
Recharts (simple charts for mobile)
Victory Native (alternative for complex charts)

// Navigation
React Navigation v6

// Testing
Jest + React Native Testing Library
```

### 🔧 **Backend Technology Stack**
```javascript
// Core Framework
Node.js + NestJS
TypeScript (full-stack consistency)

// Database
PostgreSQL (primary data storage)
Redis (caching layer)

// APIs & Services
Google Finance API (stock data)
FRED API (economic indicators)
Claude API (AI processing)
Google News API (news data)

// Authentication
Firebase Auth (social login)
JWT tokens (session management)

// Deployment
Docker containers
Fly.io or Render (backend hosting)
```

---

## 📊 Phase 2: Detailed View Mode (Future)

| Feature | Technology/Tool | Description |
| --- | --- | --- |
| 1-year Trend Charts | Recharts / D3.js | Trend indicators for each metric |
| Economic Calendar | Custom DB + external APIs | FOMC, CPI announcement dates |
| Detailed Stock Info | Enhanced charts + summary data | EPS, P/E, RSI, MACD, etc. |
| Institutional/Insider Trading | OpenInsider / WhaleWisdom | Web scraping or API integration |
| News Top 3-5 | Google News + Claude | Collapsible/expandable UI |
| Peer Comparison | Table or heatmap | P/E, EPS comparison |
| Analyst Opinions | TipRanks or Zacks | Buy/Hold/Sell ratio visualization |

---

## 📦 Project Structure (React Native + NestJS)

```
investie/
├── apps/
│   ├── mobile/          # React Native app (Expo)
│   └── backend/         # NestJS API server
├── packages/
│   ├── ui/              # Shared UI components
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Formatting, API helpers
├── docs/                # Planning and technical docs
├── scripts/             # Deployment and automation scripts
└── .github/             # CI/CD, issue templates
```

### 📱 **Mobile App Structure**
```
apps/mobile/
├── src/
│   ├── components/
│   │   ├── cards/       # Market & stock cards
│   │   ├── charts/      # Chart components
│   │   └── ui/          # Common UI components
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API service layer
│   ├── store/           # Zustand stores
│   └── types/           # TypeScript types
├── app.config.js        # Expo configuration
└── package.json
```

---

## 🧑‍💻 Team Structure (4 people) - Updated

### 🏗️ **Option 1: Specialization-based Division**
| Role | Responsibilities | Share | Key Technologies |
| --- | --- | --- | --- |
| **Mobile Developer 1** | React Native app, card UI components | 25% | React Native, TypeScript, NativeWind |
| **Mobile Developer 2** | Charts, state management, navigation | 25% | React Native, Recharts, Zustand |
| **Backend Developer 1** | NestJS API, database, authentication | 25% | Node.js, PostgreSQL, Firebase Auth |
| **Backend Developer 2** | External API integration, data pipeline | 25% | Claude API, Google Finance, FRED APIs |

### ⚡ **Option 2: Module-based Independent Development**
| Developer | Module | Mobile Tasks | Backend Tasks |
| --- | --- | --- | --- |
| **Developer A** | Market Summary Module | Market card UI, economic indicators | FRED API, Claude search integration |
| **Developer B** | Stock Cards Module (1-3) | AAPL, TSLA, MSFT card UI | Google Finance API integration |
| **Developer C** | Stock Cards Module (4-7) | GOOGL, AMZN, NVDA, META card UI | News API, caching optimization |
| **Developer D** | Auth & Stock Cards (8-10) | Login UI, NFLX, AVGO, AMD cards | Social auth, user data management |

---

## 🔄 Data Update Strategy

### ⏰ **Update Schedule (EST)**
- **6:00 AM**: Pre-market summary generation
  - Overnight news analysis
  - Asian market impact assessment
  - Economic calendar for the day
- **4:00 PM**: Post-market summary generation
  - Daily performance analysis
  - After-hours news integration
  - Next trading day outlook

### 💾 **Caching Architecture**
```
Client (React Native)
├── Local Storage (user preferences)
├── React Query Cache (API responses)
└── Image Cache (Expo)

Backend (NestJS)
├── Redis L1 Cache (5-minute stock data)
├── Redis L2 Cache (12-hour AI summaries)
└── PostgreSQL (persistent storage)
```

---

## 🚀 Future Expansion Plans

| Feature | Proposed Technology/Method |
| --- | --- |
| Web Application | Next.js (code sharing with React Native) |
| Real-time Notifications | Expo Notifications + Firebase Cloud Messaging |
| Premium Features | Stripe integration, In-App Purchase |
| Social Features | Supabase or Firebase (Realtime DB) |
| AI Enhancements | Claude API advanced features, custom models |
| International Markets | Multi-region API support, localization |

---

## ⚠️ Technical Risks and Mitigation

### 🔴 **High Priority Risks**
1. **Google Finance API Rate Limits**
   - **Risk**: Service disruption during high usage
   - **Mitigation**: Alpha Vantage backup API, aggressive caching strategy
   
2. **Claude API Costs**
   - **Risk**: Escalating costs with user growth
   - **Mitigation**: Optimized prompts, summary length limits, 12-hour caching

3. **Mobile Performance**
   - **Risk**: Slow loading on older devices
   - **Mitigation**: Code splitting, image optimization, efficient rendering

### 🟡 **Medium Priority Risks**
1. **Real-time Data Synchronization**
   - **Risk**: Data inconsistencies between APIs
   - **Mitigation**: Timestamp validation, data quality checks

2. **App Store Approval**
   - **Risk**: Financial app review delays
   - **Mitigation**: Clear disclaimers, compliance documentation

---

## 📊 Development Timeline (4 weeks)

### Week 1: Foundation Setup
- [ ] Project scaffolding (Expo + NestJS)
- [ ] Development environment setup
- [ ] API integration testing
- [ ] Design system implementation

### Week 2: Core Development
- [ ] Market summary card implementation
- [ ] Stock cards development (basic version)
- [ ] Backend API endpoints
- [ ] Database schema setup

### Week 3: Integration & Features
- [ ] Frontend-backend integration
- [ ] Authentication implementation
- [ ] Data caching setup
- [ ] Error handling & loading states

### Week 4: Testing & Deployment
- [ ] End-to-end testing
- [ ] Performance optimization
- [ ] App store submission preparation
- [ ] Production deployment

---

## ✅ Technology Summary

| Category | Selected Technology | Rationale |
| --- | --- | --- |
| **Mobile Framework** | React Native (Expo) | Cross-platform, rapid development, strong ecosystem |
| **Backend Framework** | Node.js (NestJS) | TypeScript consistency, modular architecture, scalability |
| **Database** | PostgreSQL + Redis | Reliability + performance, structured data + caching |
| **APIs** | Google Finance + FRED + Claude | Comprehensive data coverage, AI capabilities |
| **Authentication** | Firebase Auth | Social login support, enterprise-grade security |
| **Deployment** | Expo + Fly.io/Render | Simple mobile deployment + backend hosting |

---

## 🎯 Key Differentiators

1. **Mobile-First Design**: Optimized for smartphone usage patterns
2. **AI-Powered Summaries**: Claude integration for intelligent market analysis
3. **Real-time Updates**: Twice-daily refresh aligned with market hours
4. **Personalization**: Social login with custom watchlists
5. **Performance**: Aggressive caching for fast loading times
6. **Scalability**: Modular architecture for easy feature expansion

---

> This technology stack is optimized for 2025, considering maintainability, scalability, and learning curve for a 4-person development team building a mobile-first financial information app.