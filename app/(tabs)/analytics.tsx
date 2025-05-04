import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SpendingChart } from '../../components/SpendingChart';
import { Transaction, CategoryTotal } from '../../types/transaction';
import { storage } from '../../utils/storage';
import { MonthlyBarChart } from '../../components/MonthlyBarChart';

const categoryColors: Record<string, string> = {
  Food: '#FF6B6B',
  Rent: '#4ECDC4',
  Utilities: '#45B7D1',
  Transportation: '#5e767a',
  Entertainment: '#FFEEAD',
  Shopping: '#99C1B9',
  Healthcare: '#9B5DE5',
  Education: '#F15BB5',
  Salary: '#00BBF9',
  Investment: '#00F5D4',
  Other: '#A8A8A8',
};

export default function AnalyticsScreen() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categoryTotals, setCategoryTotals] = useState<CategoryTotal[]>([]);
  const [monthlyData, setMonthlyData] = useState<{ month: string; total: number }[]>([]);

  useEffect(() => {
    loadTransactions();
  }, []);

  async function loadTransactions() {
    const savedTransactions = await storage.getTransactions();
    setTransactions(savedTransactions);
    calculateCategoryTotals(savedTransactions);
    calculateMonthlyData(savedTransactions);
  }

  function calculateCategoryTotals(transactions: Transaction[]) {
    const expensesByCategory: Record<string, number> = {};
    let totalExpenses = 0;

    transactions.forEach((transaction) => {
      if (transaction.amount < 0) {
        const amount = Math.abs(transaction.amount);
        const category = transaction.category || 'Other';
        expensesByCategory[category] = (expensesByCategory[category] || 0) + amount;
        totalExpenses += amount;
      }
    });

    const totals: CategoryTotal[] = Object.entries(expensesByCategory).map(
      ([category, total]) => ({
        category: category as Transaction['category'],
        total,
        percentage: totalExpenses ? (total / totalExpenses) * 100 : 0,
        color: categoryColors[category] || '#A8A8A8',
      })
    );

    setCategoryTotals(totals);
  }

  function calculateMonthlyData(transactions: Transaction[]) {
    const monthMap: Record<string, number> = {};

    transactions.forEach((tx) => {
      if (tx.amount < 0) {
        const date = new Date(tx.date);
        const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`; // format like 2023-4
        const amount = Math.abs(tx.amount);
        monthMap[monthKey] = (monthMap[monthKey] || 0) + amount;
      }
    });

    const sortedData = Object.entries(monthMap)
      .map(([key, total]) => {
        const [year, month] = key.split('-').map(Number);
        const monthName = new Date(year, month - 1).toLocaleString('default', { month: 'short' });
        return { month: `${monthName} ${year}`, total };
      })
      .sort((a, b) =>
        new Date(a.month).getTime() - new Date(b.month).getTime()
      );

    setMonthlyData(sortedData);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Analytics</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Spending by Category</Text>
          <SpendingChart data={categoryTotals} />

          <View style={styles.categoryList}>
            {categoryTotals.map((category) => (
              <View key={category.category} style={styles.categoryItem}>
                <View style={styles.categoryHeader}>
                  <View
                    style={[
                      styles.categoryColor,
                      { backgroundColor: category.color },
                    ]}
                  />
                  <Text style={styles.categoryName}>{category.category}</Text>
                </View>
                <View>
                  <Text style={styles.categoryAmount}>
                    ₹{category.total.toLocaleString()}
                  </Text>
                  <Text style={styles.categoryPercentage}>
                    {category.percentage.toFixed(1)}%
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Monthly Overview</Text>
          {monthlyData.length > 0 ? (
            <MonthlyBarChart data={monthlyData} />
          ) : (
            <Text style={{ color: '#64748b' }}>No data available</Text>
          )}
        </View>
      </ScrollView>
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
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
  },
  card: {
    margin: 20,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  categoryList: {
    marginTop: 20,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  categoryName: {
    fontSize: 16,
    color: '#1e293b',
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
    textAlign: 'right',
  },
  categoryPercentage: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'right',
  },
});
