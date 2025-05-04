import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Filter } from 'lucide-react-native';
import { Transaction } from '../../types/transaction';
import { TransactionForm } from '../../components/TransactionForm';
import { storage } from '../../utils/storage';

export default function HomeScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    loadTransactions();
  }, []);

  async function loadTransactions() {
    const savedTransactions = await storage.getTransactions();
    setTransactions(savedTransactions);
  }

  const totalIncome = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const balance = totalIncome - totalExpenses;

  const handleAddTransaction = async (newTransaction: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: Date.now().toString(),
    };

    const updatedTransactions = [...transactions, transaction];
    await storage.saveTransactions(updatedTransactions);
    setTransactions(updatedTransactions);
    setIsAddingTransaction(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Personal Finance</Text>
          <Pressable
            style={styles.filterButton}
            onPress={() => {
              // TODO: Implement filter modal
            }}>
            <Filter size={24} color="#64748b" />
          </Pressable>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceTitle}>Current Balance</Text>
          <Text style={styles.balanceAmount}>₹{balance.toLocaleString()}</Text>
          
          <View style={styles.statsContainer}>
            <View>
              <Text style={styles.statsLabel}>Total Income</Text>
              <Text style={[styles.statsAmount, styles.incomeText]}>
                ₹{totalIncome.toLocaleString()}
              </Text>
            </View>
            <View>
              <Text style={styles.statsLabel}>Total Expenses</Text>
              <Text style={[styles.statsAmount, styles.expenseText]}>
                ₹{totalExpenses.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.transactionsContainer}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transaction}>
              <View style={styles.transactionLeft}>
                <Text style={styles.transactionIcon}>
                  {transaction.type === 'income' ? '💰' : '💸'}
                </Text>
                <View>
                  <Text style={styles.transactionTitle}>{transaction.title}</Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>
              </View>
              <Text
                style={[
                  styles.transactionAmount,
                  transaction.amount > 0 ? styles.incomeText : styles.expenseText,
                ]}>
                {transaction.amount > 0 ? '+' : '-'} ₹
                {Math.abs(transaction.amount).toLocaleString()}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={isAddingTransaction}
        animationType="slide"
        presentationStyle="pageSheet">
        <TransactionForm
          onSubmit={handleAddTransaction}
          onCancel={() => setIsAddingTransaction(false)}
        />
      </Modal>

      <Pressable
        style={styles.fab}
        onPress={() => setIsAddingTransaction(true)}>
        <Plus color="white" size={24} />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  balanceCard: {
    margin: 20,
    padding: 20,
    backgroundColor: '#2563eb',
    borderRadius: 16,
    shadowColor: '#2563eb',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  balanceTitle: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  statsLabel: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.8,
  },
  statsAmount: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 4,
  },
  incomeText: {
    color: '#4ade80',
  },
  expenseText: {
    color: '#f87171',
  },
  transactionsContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  transaction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
  },
  transactionDate: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563eb',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});