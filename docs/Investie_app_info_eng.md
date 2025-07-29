# Investie - App Information Architecture Design (Final)

**📱 App Information Architecture: Summary View Mode (Phase 1) vs Detailed View Mode (Phase 2)**

> 📌 **Target**: Beginner to intermediate US stock market investors  
> 🎯 **Purpose**: Provide only essential information directly relevant to investment decisions  
> 🧩 **Modes**: "Summary View" (MVP default), "Detailed View" (Phase 2 expansion)  
> 📱 **Platform**: React Native mobile-first, card-based UI

---

## 1. Phase 1: Summary View (MVP - Card News Style)

### 🎯 Purpose
**Summarize complex market/stock information intuitively so users can quickly understand key insights within 2-3 minutes**

### 📊 Macro (Market Overview) Information Card (1 card)

**Data Sources and Implementation:**
- **🧠 CNN Fear & Greed Index**: Real-time collection via Claude Search API → Color visualization (Fear/Neutral/Greed)
- **🌪️ VIX (Volatility Index)**: Google Finance API → Color status display (Green/Yellow/Red)
- **💰 US Federal Funds Rate**: FRED API → Claude generates outlook phrases ("Fed rate expected to peak" etc.)
- **🛒 US CPI**: FRED API → Month-over-month change + directional indicators (↑↓)
- **🧑‍💼 US Unemployment Rate**: FRED API → Latest figures + month-over-month change
- **📈 S&P500 Summary**: Google Finance API → 1-week sparkline

### 🔬 Individual Stock Information Cards (10 cards)

**Default Stocks (Non-logged users)**: AAPL, TSLA, MSFT, GOOGL, AMZN, NVDA, META, NFLX, AVGO, AMD  
**Personalized Stocks (Logged users)**: User-selected 10 watchlist stocks

**Information displayed per stock:**
- **💰 Current Price & Change**: Google Finance API → Real-time collection
- **📊 P/E Ratio**: Google Finance API → Evaluation vs industry average
- **📈 Market Cap & Volume**: Google Finance API
- **🎯 52-Week High/Low**: Google Finance API
- **⚖️ RSI**: Calculated values → Display only overbought/oversold status
- **📰 News Summary**: Google News API + Claude API → One-line summaries
- **🏭 Sector Performance**: Weekly performance of the stock's sector

### 🔄 Data Update Strategy
- **Update Frequency**: Twice daily (6 AM, 4 PM EST)
- **Caching Strategy**: 
  - Stock data: 5-minute cache (during market hours)
  - AI summaries: 12-hour cache
  - Economic indicators: 24-hour cache

---

## 2. Phase 2: Detailed View Mode (Future Expansion)

### 🎯 Purpose
**Provide advanced analysis information for intermediate to advanced investors**

### 📊 Detailed Macro Information
- **📈 1-Year Trend Charts**: Trend indicators for each metric
- **📅 Economic Calendar**: FOMC, CPI announcement dates, etc.
- **🏦 Major Index Trend Charts**: S&P500, NASDAQ, Dow Jones

### 🔬 Detailed Individual Stock Information
- **📊 Recent 4-Quarter EPS, P/E, Revenue Growth Charts**
- **📈 Selectable Technical Indicators**: RSI, MACD, etc.
- **🏢 Institutional Holdings and Insider Trading Information**
- **📰 Related News Top 3-5**: Collapsible/expandable UI
- **⚖️ Peer Comparison Table**: P/E, EPS comparison
- **🎯 Sector Performance Heatmap**
- **📊 Analyst Opinion Summary**: Buy/Hold/Sell ratio visualization

---

## 🛠 Technical Implementation Specifications

### Frontend (React Native + Expo)
```typescript
// Component Structure
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
// API Endpoints
/api/v1/
├── market-summary     // Macro information
├── stocks/:symbol     // Individual stock information
├── news/:symbol       // News summaries
└── user/watchlist     // Personal watchlist
```

### Data Pipeline
```
External APIs → NestJS Backend → Redis Cache → React Native App
     ↓              ↓              ↓
Google Finance   PostgreSQL   12-hour cache
FRED API        (Persistent)   (AI summaries)
Claude API                    5-minute cache
Google News                   (Stock data)
```

---

## 🎨 UX/UI Design Principles

### Mobile-First Design
- **Card-Based Layout**: Organize each piece of information into independent cards
- **Color Coding**: Intuitive colors for up/down, positive/negative
- **Mode Toggle**: "Basic/Detailed" toggle button in top-right corner
- **Responsive**: NativeWind (Tailwind CSS) for various screen sizes

### User Flow
```
App Launch → Display Latest Cached Data Immediately
    ↓
Check Login Status
    ↓               ↓
Non-logged        Logged In
(Default 10 stocks) (Personal watchlist 10 stocks)
    ↓               ↓
Scroll Through 11 Cards
    ↓
Pull-to-refresh or Auto-update
    ↓
Phase 2: Switch to Detailed Mode (Future)
```

---

## 🔐 Authentication and Personalization

### Authentication System (Firebase Auth)
- **Anonymous Use**: Provide default 10 stock cards
- **Social Login**: Google, Facebook, GitHub account integration
- **Personalization Features**: Watchlist settings, notification preferences

### Data Protection
- Enforce HTTPS communication
- Manage API keys via environment variables
- Minimal personal information collection principle

---

## 📈 Success Metrics (KPIs)

### Phase 1 Goals (3 months)
- **DAU**: 1,000 users
- **App Rating**: 4.5/5.0 or higher
- **Session Duration**: Average 2-3 minutes
- **Return Rate**: 70% or higher

### Technical Performance Goals
- **App Loading Time**: Within 3 seconds
- **API Response Time**: Average under 500ms
- **Cache Hit Rate**: 90% or higher

---

## ⚠️ Exclusions and Constraints

### Information to Exclude in Both Modes
- **Excessive Technical Analysis**: Complex indicators only selectively provided in Phase 2
- **Complete Financial Statements**: Inappropriate for mobile environment
- **International Market Information**: Focus only on US markets in Phase 1
- **Real-time Chat/Community**: Outside Phase 1 scope

### Technical Constraints
- **API Cost Management**: Optimize costs with 12-hour caching for Claude API
- **Google Finance API Limits**: Prepare Alpha Vantage as backup API
- **Mobile Performance**: Apply image optimization, code splitting

---

## 🚀 Development Roadmap

### Week 1: Foundation Setup
- [x] Project scaffolding (Expo + NestJS)
- [x] API integration testing
- [x] Design system implementation

### Week 2: Core Development
- [x] Market summary card implementation
- [x] Stock cards development (basic version)
- [x] Backend API endpoints

### Week 3: Integration & Features
- [x] Frontend-backend integration
- [x] Authentication system implementation
- [x] Data caching setup

### Week 4: Testing & Deployment
- [x] Integration testing
- [x] Performance optimization
- [x] App store submission preparation

---

## 📋 Team Structure and Role Assignment (4 people)

### Option 1: Specialization-Based Division
| Role | Responsibilities | Share | Key Technologies |
|------|------------------|-------|------------------|
| Frontend Developer 1 | React Native app development, card UI implementation | 25% | React Native, TypeScript |
| Frontend Developer 2 | Chart components, state management, user interactions | 25% | React Native, Recharts, Zustand |
| Backend Developer 1 | API server, database, authentication system | 25% | Node.js, PostgreSQL, Firebase Auth |
| Backend Developer 2 | Claude API integration, data pipeline, external API integration | 25% | Claude API, Google Finance API, FRED API |

### Option 2: Module-Based Independent Development (Full-Stack)
| Developer | Module | Frontend Tasks | Backend Tasks |
|-----------|--------|----------------|---------------|
| **Developer A** | Market Summary Card Module | Fear & Greed, VIX UI | FRED API, Claude Search integration |
| **Developer B** | Individual Stock Card Module | Stock card UI (AAPL, TSLA, MSFT) | Google Finance API integration |
| **Developer C** | Individual Stock Card Module | Stock card UI (GOOGL, AMZN, NVDA, META) | News API, data caching |
| **Developer D** | Authentication & Personalization Module | Login UI, settings screen, stock card UI (NFLX, AVGO, AMD) | Social authentication, user data management |

---

## 🔄 Data Update Strategy Details

### Update Schedule (EST)
- **6:00 AM**: Pre-market summary generation
  - Overnight news analysis
  - Asian market impact assessment
  - Economic calendar for the day
- **4:00 PM**: Post-market summary generation
  - Daily performance analysis
  - After-hours news integration
  - Next trading day outlook

### Caching Architecture
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

## 🎯 Key Differentiators

1. **Mobile-First Design**: Optimized for smartphone usage patterns
2. **AI-Powered Summaries**: Claude integration for intelligent market analysis
3. **Real-time Updates**: Twice-daily refresh aligned with market hours
4. **Personalization**: Social login with custom watchlists
5. **Performance**: Aggressive caching for fast loading times
6. **Scalability**: Modular architecture for easy feature expansion

---

## ⚠️ Technical Risks and Mitigation

### High Priority Risks
1. **Google Finance API Rate Limits**
   - **Risk**: Service disruption during high usage
   - **Mitigation**: Alpha Vantage backup API, aggressive caching strategy

2. **Claude API Costs**
   - **Risk**: Escalating costs with user growth
   - **Mitigation**: Optimized prompts, summary length limits, 12-hour caching

3. **Mobile Performance**
   - **Risk**: Slow loading on older devices
   - **Mitigation**: Code splitting, image optimization, efficient rendering

### Medium Priority Risks
1. **Real-time Data Synchronization**
   - **Risk**: Data inconsistencies between APIs
   - **Mitigation**: Timestamp validation, data quality checks

2. **App Store Approval**
   - **Risk**: Financial app review delays
   - **Mitigation**: Clear disclaimers, compliance documentation

---

## 🚀 Future Expansion Plans

| Feature | Proposed Technology/Method |
|---------|---------------------------|
| Web Application | Next.js (code sharing with React Native) |
| Real-time Notifications | Expo Notifications + Firebase Cloud Messaging |
| Premium Features | Stripe integration, In-App Purchase |
| Social Features | Supabase or Firebase (Realtime DB) |
| AI Enhancements | Claude API advanced features, custom models |
| International Markets | Multi-region API support, localization |

---

This design reflects all requirements from the PRD and Technology Stack documents, maintaining consistency across the app architecture. Phase 1 MVP focuses on card-based simple summary information, with Phase 2 expanding detailed analysis features through a phased approach.