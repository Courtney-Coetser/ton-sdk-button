import { TonConnectUIProvider } from '@tonconnect/ui-react';

function App() {
  return (
    <TonConnectUIProvider manifestUrl="https://your-app.com/tonconnect-manifest.json">
      {/* Your app components */}
    </TonConnectUIProvider>
  );
} 