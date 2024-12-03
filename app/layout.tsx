'use client'

import "./globals.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>TON Connect Demo</title>
      </head>
      <body>
        <TonConnectUIProvider manifestUrl="https://ton-sdk-button-f7u88kumr-courtneycoetsers-projects.vercel.app/tonconnect-manifest.json">
          {children}
        </TonConnectUIProvider>
      </body>
    </html>
  );
}

export const metadata = {
  title: 'TON Connect Demo',
  description: 'Connect your TON wallet and interact with the TON blockchain',
  viewport: 'width=device-width, initial-scale=1',
};