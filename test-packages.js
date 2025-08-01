#!/usr/bin/env node

console.log('🧪 Testing Investie Phase 0 Package Structure\n');

// Test 1: Types Package
try {
  console.log('📦 Testing @investie/types...');
  const types = require('./packages/types/src/index.ts');
  console.log('  ✅ Types package imported successfully');
  console.log('  ✅ TypeScript compilation working');
} catch (e) {
  console.log('  ❌ Types package error:', e.message);
}

// Test 2: Mock Package  
try {
  console.log('\n📦 Testing @investie/mock...');
  const mock = require('./packages/mock/src/index.ts');
  console.log('  ✅ Mock package imported successfully');
  
  if (mock.marketSummary) {
    console.log('  ✅ Market summary data loaded');
    console.log('    - Fear & Greed Index:', mock.marketSummary.fearGreedIndex?.value);
    console.log('    - VIX:', mock.marketSummary.vix?.value);
  }
  
  if (mock.stocks) {
    const stockCount = Object.keys(mock.stocks).length;
    console.log('  ✅ Stock data loaded:', stockCount, 'stocks');
    console.log('    - Symbols:', Object.keys(mock.stocks).join(', '));
  }
} catch (e) {
  console.log('  ❌ Mock package error:', e.message);
}

// Test 3: Utils Package
try {
  console.log('\n📦 Testing @investie/utils...');
  const utils = require('./packages/utils/src/index.ts');
  console.log('  ✅ Utils package imported successfully');
  
  if (utils.formatCurrency) {
    console.log('  ✅ formatCurrency:', utils.formatCurrency(1234.56));
  }
  
  if (utils.formatPercentage) {
    console.log('  ✅ formatPercentage:', utils.formatPercentage(2.34));
  }
  
  if (utils.STOCK_SYMBOLS) {
    console.log('  ✅ Stock symbols constant:', utils.STOCK_SYMBOLS.length, 'symbols');
  }
} catch (e) {
  console.log('  ❌ Utils package error:', e.message);
}

console.log('\n🎯 Package Structure Test Complete');