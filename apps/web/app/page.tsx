import { Card } from '../src/components/ui/Card';
import { LineChart } from '../src/components/charts/LineChart';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Hello Investie Web
          </h1>
          <p className="text-lg text-gray-600">
            Phase 0 Setup Complete - Next.js 15 App Router
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Market Summary Card
            </h2>
            <p className="text-gray-600 mb-4">
              Fear & Greed, VIX, Rates, CPI, Unemployment
            </p>
            <LineChart data={[4780, 4785, 4790, 4770, 4795, 4805, 4800]} />
          </Card>
          
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Stock Cards
            </h2>
            <p className="text-gray-600">
              AAPL, TSLA, MSFT, GOOGL, AMZN, NVDA, META, NFLX, AVGO, AMD
            </p>
          </Card>
        </div>
      </div>
    </main>
  );
}