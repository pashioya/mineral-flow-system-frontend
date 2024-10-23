import './globals.css';

import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Mineral Flow System',
  description:
    'A user admin dashboard'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col">{children}</body>
      <Analytics />
    </html>
  );
}
