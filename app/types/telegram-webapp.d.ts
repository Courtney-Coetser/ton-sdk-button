interface TelegramWebApps {
  WebApp: {
    initData: string;
    initDataUnsafe: {
      user?: {
        username?: string;
        first_name?: string;
        last_name?: string;
        id?: number;
      };
    };
  };
}

interface Window {
  Telegram: TelegramWebApps;
} 