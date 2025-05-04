import React from 'react';
import { View } from 'react-native';
import { BarChart, Grid, XAxis } from 'react-native-svg-charts';

type MonthlyData = {
  month: string;
  total: number;
};

interface Props {
  data: MonthlyData[];
}

export function MonthlyBarChart({ data }: Props) {
  if (!data || data.length === 0) return null;

  const totals = data.map((item) => item.total);
  const months = data.map((item) => item.month);

  return (
    <View style={{ height: 220, paddingHorizontal: 10 }}>
      <BarChart
        style={{ height: 150 }}
        data={totals}
        svg={{ fill: '#4f46e5' }}
        contentInset={{ top: 20, bottom: 20 }}
        spacingInner={0.4}
      >
        <Grid />
      </BarChart>
      <XAxis
        style={{ marginTop: 10 }}
        data={totals}
        formatLabel={(value, index) => months[index]}
        contentInset={{ left: 20, right: 20 }}
        svg={{ fontSize: 12, fill: '#334155', rotation: 0 }}
        numberOfTicks={months.length}
      />
    </View>
  );
}

