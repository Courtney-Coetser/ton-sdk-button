'use client'

import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { Address } from "@ton/core";
import WebApp from '@twa-dev/sdk';

interface TelegramUser {
  username?: string;
  firstName?: string;
  lastName?: string;
  id?: number;
}

export default function Home() {
  const [tonConnectUI] = useTonConnectUI();
  const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [telegramUser, setTelegramUser] = useState<TelegramUser | null>(null);
  const [isWalletLoading, setIsWalletLoading] = useState(false);
  const [isTelegramLoading, setIsTelegramLoading] = useState(false);

  useEffect(() => {
    try {
      const webAppUser = WebApp.initDataUnsafe.user;
      if (webAppUser) {
        setTelegramUser({
          username: webAppUser.username,
          firstName: webAppUser.first_name,
          lastName: webAppUser.last_name,
          id: webAppUser.id
        });
      }
    } catch (error) {
      console.error('Error accessing Telegram WebApp:', error instanceof Error ? error.message : error);
    }
  }, []);

  const handleWalletConnection = useCallback((address: string) => {
    setTonWalletAddress(address);
    console.log("Wallet connected successfully!");
    setIsLoading(false);
  }, []);

  const handleWalletDisconnection = useCallback(() => {
    setTonWalletAddress(null);
    console.log("Wallet disconnected successfully!");
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (tonConnectUI.account?.address) {
        handleWalletConnection(tonConnectUI.account?.address);
      } else {
        handleWalletDisconnection();
      }
    };

    checkWalletConnection();

    const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
      if (wallet) {
        handleWalletConnection(wallet.account.address);
      } else {
        handleWalletDisconnection();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [tonConnectUI, handleWalletConnection, handleWalletDisconnection]);

  const handleWalletAction = async () => {
    try {
      setIsWalletLoading(true);
      if (tonConnectUI.connected) {
        await tonConnectUI.disconnect();
      } else {
        await tonConnectUI.openModal();
      }
    } catch (error) {
      console.error('Wallet action failed:', error);
    } finally {
      setIsWalletLoading(false);
    }
  };

  const formatAddress = (address: string) => {
    const tempAddress = Address.parse(address).toString();
    return `${tempAddress.slice(0, 4)}...${tempAddress.slice(-4)}`;
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded">
          Loading...
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">TON Connect Demo</h1>
      
      <div className="text-xl mb-8">
        {telegramUser ? (
          <div className="space-y-2">
            <p>Logged in as: {telegramUser.username ? `@${telegramUser.username}` : telegramUser.firstName || 'Guest'}</p>
            {telegramUser.lastName && <p>Last Name: {telegramUser.lastName}</p>}
            {telegramUser.id && <p>ID: {telegramUser.id}</p>}
          </div>
        ) : (
          <p>Not logged in via Telegram</p>
        )}
      </div>

      {tonWalletAddress ? (
        <div className="flex flex-col items-center">
          <p className="mb-4">Connected: {formatAddress(tonWalletAddress)}</p>
          <button
            onClick={handleWalletAction}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <button
          onClick={handleWalletAction}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Connect TON Wallet
        </button>
      )}
    </main>
  );
}