// Move configuration to environment variables
const config = {
  manifestUrl: process.env.NEXT_PUBLIC_TON_MANIFEST_URL,
  network: process.env.NEXT_PUBLIC_TON_NETWORK || 'mainnet',
}; 