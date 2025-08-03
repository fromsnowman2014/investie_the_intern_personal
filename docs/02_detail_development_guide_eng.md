Investie: Detailed Development Guide for a 4-Person Team (Mobile + Desktop Web)
🎯 Objective of this Guide
This document provides a detailed development plan for a 4-person engineering team (2 Frontend, 2 Backend) to build the Investie MVP. It is designed to enable independent yet collaborative work, with all development based on the monorepo skeleton and mock data established in Phase 0.

Each phase is broken down into small, manageable modules, with the goal of incrementally completing working features.

👥 Team Role Definitions
Frontend 1 (FE1 - Graphs & Visualization): Responsible for developing charts and data visualization components. (For both Mobile & Web)

Frontend 2 (FE2 - UI/UX & Layout): Responsible for the overall layout, design system, data display, and user interactions. (For both Mobile & Web)

Backend 1 (BE1 - Financial Data): Responsible for Google Finance, FRED API integration, and related database and caching.

Backend 2 (BE2 - News & AI): Responsible for Google News, Claude API integration, and related AI summary and analysis logic.

Phase 1: Build the Market Summary Card (First Feature Slice)
Goal: To complete the first fully functional feature, the MarketSummaryCard, and validate the end-to-end data flow of the entire architecture.

Role	Tasks
FE1	(Graphs & Visualization)<br>1. Develop S&P500Sparkline Component: Use Recharts to create a sparkline chart that works on both mobile and web. It should accept props based on the MarketSummaryData type from packages/types.<br>2. Develop FearGreedGauge Component: Create a circular gauge component to visualize the Fear & Greed Index.
FE2	(UI/UX & Layout)<br>1. Build MarketSummaryCard Layout: Construct the overall layout of the card, including sections to display text-based data like VIX, Interest Rate, CPI, and Unemployment.<br>2. Integrate FE1 Components: Place the S&P500Sparkline and FearGreedGauge into the layout.<br>3. Data Integration (Mock): Fetch data from the backend's mock endpoint (/api/v1/market-summary) and manage the state, then pass props to child components.
BE1	(Financial Data)<br>1. Implement FinancialDataService: Implement the logic to fetch real data from the FRED API (CPI, Rate, Unemployment) and Google Finance API (VIX, S&P500).<br>2. Implement Scheduler: Create a MarketDataScheduler to periodically update the financial data.<br>3. Apply Caching Strategy: Apply a 24-hour Redis cache for economic indicator data.<br>4. Replace API Mock: Replace the mock data in the controller with actual service calls.
BE2	(News & AI)<br>1. Implement AiContentService: Implement logic to get the real-time Fear & Greed Index using the Claude Search API and generate the aiOutlook text for the interest rate using the Claude API.<br>2. Integrate Service: Integrate the generated AI content into the main MarketSummary data.<br>3. Apply Caching Strategy: Apply a 12-hour Redis cache for AI-generated content.<br>4. Replace API Mock: Replace the relevant mock data in the controller with actual service calls.

Phase 2: Build the Stock Card Foundation (Reusable Component)
Goal: To create the generic, reusable StockCard component that will be used for all 10 stocks. This phase will use mock data to enable rapid frontend development.

Role	Tasks
FE1	(Graphs & Visualization)<br>1. Develop PriceIndicator Component: Create a component to display the stock price, change, and percentage change, complete with appropriate up/down coloring.<br>2. Develop RsiIndicator Component: Create a simple bar-style component to visually represent the overbought/oversold status based on the RSI index.
FE2	(UI/UX & Layout)<br>1. Build StockCard Layout: Build the overall structure of a reusable card component that accepts a StockCardData object from packages/types as its prop.<br>2. Implement Data Display Elements: Create the UI to display text-based data like the stock name, symbol, market cap, P/E ratio, etc.<br>3. Integrate FE1 Components: Integrate the PriceIndicator and RsiIndicator into the card layout.<br>4. Apply Skeleton UI: Create a SkeletonStockCard component to indicate a loading state.
BE1	(Financial Data)<br>1. Implement StocksService Stub: Create the service class containing a getStockBySymbol method.<br>2. Create API Endpoint: Create a controller to handle requests at the /api/v1/stocks/:symbol path.<br>3. Return Mock Data: For now, implement this endpoint to find and return the corresponding symbol's data from packages/mock/stocks.json. This allows the frontend to start development immediately.
BE2	(News & AI)<br>1. Implement NewsService Stub: Create the basic structure for a service that will generate news summaries and technical analysis data.<br>2. Plan Data Augmentation: Design the collaboration point with StocksService to determine how news summaries and RSI data will be added to the base stock data provided by BE1.<br>3. Validate Mock Data: Verify that the news and technical data sections in packages/mock/stocks.json match the expected real API response structure and modify if necessary.


Phase 3: Parallel Feature Integration (All Stock Cards)
Goal: To leverage the foundation from Phase 2 to rapidly build and display all 10 stock card features in parallel on the screen.

Role	Tasks
FE1	(Graphs & Visualization)<br>1. Optimize Component Performance: As 10 cards are rendered, check for any performance degradation related to charts and optimize with React.memo as needed.<br>2. Integration Support: Assist FE2 with any visualization-related issues that arise when displaying the 10 cards on the screen.
FE2	(UI/UX & Layout)<br>1. Implement List on HomeScreen: Use the map function over an array of the 10 default stock symbols to render 10 StockCard components.<br>2. Individual Data Fetching: Implement logic so that each StockCard asynchronously fetches its own data from /api/v1/stocks/:symbol when it mounts.<br>3. State Management: Implement loading (skeleton UI) and error states independently for each card.
BE1	(Financial Data)<br>1. Integrate Real API: Replace the mock logic in the getStockBySymbol method of StocksService with calls to the Google Finance API to fetch real price and financial data.<br>2. Apply 5-Min Caching: Apply a 5-minute Redis cache to the real-time stock data to minimize API calls.<br>3. Monitor Performance: Monitor server performance as the frontend begins to make multiple simultaneous API calls.
BE2	(News & AI)<br>1. Integrate Real Services: Extend the StocksService to augment the data from BE1 with a news summary (from Google News API + Claude API) and the calculated RSI result.<br>2. Combine Data: Complete the getStockBySymbol logic to combine the data from BE1 and BE2 into a single, final StockCardData object to be returned.<br>3. Review Caching Strategy: Set an appropriate cache TTL for the different data types (e.g., 12 hours for news summaries).

Phase 4: Authentication & Personalization
Goal: To implement user login and allow logged-in users to view their own custom watchlist.

Role	Tasks
FE Team	(FE1 & FE2)<br>1. Develop Auth UI: Develop the Login, Signup, and Settings screens. (FE2 leads, FE1 supports).<br>2. Implement Auth Flow: Implement the UI/UX flow for social login button clicks.<br>3. Develop Watchlist UI: Create the UI within the settings screen to add, remove, and reorder stocks in a watchlist.<br>4. Conditional Data Loading: Add logic to the HomeScreen to decide whether to load the default 10 stocks or call the user's watchlist API (/api/v1/user/watchlist) based on login status.
BE Team	(BE1 & BE2)<br>1. Database & API (BE1): Design the users and watchlists table schemas in PostgreSQL and implement the CRUD API (/api/v1/user/watchlist) to manage watchlist data.<br>2. Authentication System (BE2): Integrate Firebase Auth to handle social logins and implement the logic to issue a JWT token upon successful login. Apply a guard to secure the user-specific APIs, requiring a valid token for access.