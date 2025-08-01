import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Investie - Market Summary App',
  description: 'AI-powered market summary app for US stock investors',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 antialiased">
        {children}
      </body>
    </html>
  );
}