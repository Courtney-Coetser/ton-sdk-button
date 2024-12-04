// Add more specific types for TON Connect responses
interface WalletResponse {
  account: {
    address: string;
    chain: string;
    network: string;
  };
  device: {
    platform: string;
    appName: string;
  };
} 