export type TransactionCategory = 
  | 'Food'
  | 'Rent'
  | 'Utilities'
  | 'Transportation'
  | 'Entertainment'
  | 'Shopping'
  | 'Healthcare'
  | 'Education'
  | 'Salary'
  | 'Investment'
  | 'Other';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: TransactionCategory;
  date: string;
  notes?: string;
}

export interface CategoryTotal {
  category: TransactionCategory;
  total: number;
  percentage: number;
  color: string;
}