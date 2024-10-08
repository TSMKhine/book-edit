'use client';

import Script from 'next/script';

import { Provider as JotaiProvider } from 'jotai';
import { DevTools, useAtomsDebugValue } from 'jotai-devtools';

const DebugAtoms = () => {
  useAtomsDebugValue();
  return null;
};

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JotaiProvider>
        <Script
          src="/zwibbler2.js"
          // strategy="beforeInteractive"
          onLoad={() => {
            console.info('Script has loaded');
          }}
        />
        {/* <DevTools /> */}
        <DebugAtoms />
        {children}
      </JotaiProvider>
    </>
  );
}
