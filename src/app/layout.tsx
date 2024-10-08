import './globals.css';

import type { Metadata, Viewport } from 'next';
import { GoogleTagManager } from '@next/third-parties/google';
import { cn } from '@/libs/utils';
import { noto_Sans_JP } from './fonts';

import Providers from './providers';
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'MYサポートノート おたすけっち',
  description:
    'Webブラウザで使えるノートアプリです。様々なツールによって、先生や子どもたちをサポートします。',
  robots: 'noindex,nofollow',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={cn(noto_Sans_JP.className, 'overscroll-none')}>
      <Providers>
        <body>
          <main className="relative flex h-[100dvh] flex-col items-center">
            {children}
          </main>
        </body>

        {/* GTM */}
        <GoogleTagManager gtmId={process.env.GTM_ID as string} />
      </Providers>
    </html>
  );
}
