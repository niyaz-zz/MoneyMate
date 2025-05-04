import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { CategoryTotal } from '../types/transaction';

interface SpendingChartProps {
  data: CategoryTotal[];
}

export function SpendingChart({ data }: SpendingChartProps) {
  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  const chartData = data.map((item) => ({
    name: item.category,
    population: Math.abs(item.total),
    color: item.color,
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  }));

  return (
    <View style={styles.container}>
      <PieChart
        data={chartData}
        width={Dimensions.get('window').width - 32}
        height={220}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="0"
        absolute
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 8,
  },
});