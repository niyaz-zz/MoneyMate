import AsyncStorage from '@react-native-async-storage/async-storage';
import { Transaction } from '../types/transaction';

const TRANSACTIONS_KEY = '@finance_app_transactions';
const SETTINGS_KEY = '@finance_app_settings';

export interface AppSettings {
  isDarkMode: boolean;
  currency: string;
  isAuthEnabled: boolean;
}

export const storage = {
  async getTransactions(): Promise<Transaction[]> {
    try {
      const data = await AsyncStorage.getItem(TRANSACTIONS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading transactions:', error);
      return [];
    }
  },

  async saveTransactions(transactions: Transaction[]): Promise<void> {
    try {
      await AsyncStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
    } catch (error) {
      console.error('Error saving transactions:', error);
    }
  },

  async getSettings(): Promise<AppSettings> {
    try {
      const data = await AsyncStorage.getItem(SETTINGS_KEY);
      return data ? JSON.parse(data) : {
        isDarkMode: false,
        currency: '₹',
        isAuthEnabled: false,
      };
    } catch (error) {
      console.error('Error loading settings:', error);
      return {
        isDarkMode: false,
        currency: '₹',
        isAuthEnabled: false,
      };
    }
  },

  async saveSettings(settings: AppSettings): Promise<void> {
    try {
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  },
};