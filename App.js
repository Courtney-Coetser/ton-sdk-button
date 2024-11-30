import { TonConnectUIProvider } from '@tonconnect/ui-react';

function App() {
  // Get the base URL for Vercel deployment
  const manifestUrl = `${process.env.NEXT_PUBLIC_VERCEL_URL ? 
    `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : 
    'http://localhost:3000'}/tonconnect-manifest.json`;

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      {/* Your app components */}
    </TonConnectUIProvider>
  );
} 