#!/usr/bin/env node

console.log('📊 Investie Phase 0 Coverage Analysis\n');

const fs = require('fs');
const path = require('path');

// Phase 0 Requirements from development guide
const requirements = {
  monorepo: {
    'Root package.json': 'package.json',
    'Nx configuration': 'nx.json', 
    'TypeScript base config': 'tsconfig.base.json'
  },
  packages: {
    'Types package': 'packages/types/src/index.ts',
    'Mock data package': 'packages/mock/src/index.ts',
    'Utils package': 'packages/utils/src/index.ts',
    'Market summary JSON': 'packages/mock/src/market-summary.json',
    'Stocks JSON': 'packages/mock/src/stocks.json'
  },
  mobile: {
    'App.tsx': 'apps/mobile/App.tsx',
    'Card component': 'apps/mobile/src/components/ui/Card.tsx',
    'LineChart component': 'apps/mobile/src/components/charts/LineChart.tsx',
    'HomeScreen': 'apps/mobile/src/screens/HomeScreen.tsx'
  },
  web: {
    'Next.js layout': 'apps/web/app/layout.tsx',
    'Home page': 'apps/web/app/page.tsx',
    'Card component': 'apps/web/src/components/ui/Card.tsx',
    'LineChart component': 'apps/web/src/components/charts/LineChart.tsx',
    'Tailwind config': 'apps/web/tailwind.config.js'
  },
  backend: {
    'Main entry': 'apps/backend/src/main.ts',
    'App module': 'apps/backend/src/app.module.ts',
    'Market controller': 'apps/backend/src/market/market.controller.ts',
    'Market service': 'apps/backend/src/market/market.service.ts'
  }
};

let totalRequirements = 0;
let fulfilledRequirements = 0;

for (const [category, items] of Object.entries(requirements)) {
  console.log(`\n🏗️  ${category.toUpperCase()}`);
  
  for (const [name, filePath] of Object.entries(items)) {
    totalRequirements++;
    
    if (fs.existsSync(filePath)) {
      console.log(`  ✅ ${name}`);
      fulfilledRequirements++;
    } else {
      console.log(`  ❌ ${name} (missing: ${filePath})`);
    }
  }
}

const coverage = ((fulfilledRequirements / totalRequirements) * 100).toFixed(1);

console.log(`\n📊 PHASE 0 COVERAGE SUMMARY`);
console.log(`Total requirements: ${totalRequirements}`);
console.log(`Fulfilled: ${fulfilledRequirements}`);
console.log(`Coverage: ${coverage}%`);

if (coverage >= 90) {
  console.log('🎯 Phase 0 COMPLETE - Ready for Phase 1 development');
} else if (coverage >= 75) {
  console.log('⚠️  Phase 0 MOSTLY COMPLETE - Minor items missing');
} else {
  console.log('❌ Phase 0 INCOMPLETE - Major components missing');
}

// Check for additional structure
console.log('\n🔍 STRUCTURE VALIDATION');

const checkDirectory = (dir, name) => {
  if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
    console.log(`  ✅ ${name} directory exists`);
    return true;
  } else {
    console.log(`  ❌ ${name} directory missing`);
    return false; 
  }
};

checkDirectory('apps', 'Apps');
checkDirectory('packages', 'Packages');
checkDirectory('apps/mobile/src/components', 'Mobile components');
checkDirectory('apps/web/src/components', 'Web components');
checkDirectory('apps/backend/src/market', 'Backend market module');

console.log('\n🧪 Test Coverage Analysis Complete');