
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Card from './Card';

const screenWidth = Dimensions.get('window').width;

const CategoryPieChart = ({ transactions }) => {
  const getCategoryBreakdown = () => {
    const breakdown = {};
    (transactions || []).forEach(transaction => {
      if (transaction?.type === 'expense') {
        const category = transaction.category || 'Other';
        if (!breakdown[category]) {
          breakdown[category] = 0;
        }
        breakdown[category] += transaction.amount || 0;
      }
    });
    return breakdown;
  };

  const getPieChartData = () => {
    const categoryBreakdown = getCategoryBreakdown();
    const colors = ['#6B4EFF', '#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];

    return Object.entries(categoryBreakdown).map(([name, value], index) => ({
      name,
      amount: value,
      color: colors[index % colors.length],
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    }));
  };

  const pieData = getPieChartData();

  if (pieData.length === 0) {
    return (
      <Card style={styles.card}>
        <Text style={styles.title}>Expense Categories</Text>
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No expense data available</Text>
        </View>
      </Card>
    );
  }

  return (
    <Card style={styles.card}>
      <Text style={styles.title}>Expense Categories</Text>
      <PieChart
        data={pieData}
        width={screenWidth - 40}
        height={200}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 20,
    marginTop: 0,
    padding: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 15,
  },
  emptyState: {
    alignItems: 'center',
    padding: 30,
  },
  emptyText: {
    fontSize: 14,
    color: '#9E9E9E',
  },
});

export default CategoryPieChart;