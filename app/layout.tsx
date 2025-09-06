import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Builder Buddy - Your AI Co-pilot for Launching Web Apps Fast',
  description: 'Help solo founders quickly scope, validate, and launch MVP web applications using AI assistance and no-code templates.',
  keywords: ['AI', 'MVP', 'web apps', 'no-code', 'startup', 'validation'],
  authors: [{ name: 'Builder Buddy Team' }],
  openGraph: {
    title: 'Builder Buddy',
    description: 'Your AI co-pilot for launching web apps fast',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
