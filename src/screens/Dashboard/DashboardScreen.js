
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFinancial } from '../../context/FinancialContext';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/Card';
import TransactionItem from '../../components/TransactionItem';
import { LineChart, PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const DashboardScreen = ({ navigation }) => {
  const { userProfile } = useAuth();
  const {
    income = 0,
    expenses = 0,
    savings = 0,
    loading,
    transactions = [],
  } = useFinancial();

  const [refreshing, setRefreshing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  useEffect(() => {
    // Any initialization
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const formatCurrency = (amount) => {
    return amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || '0';
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Mock chart data
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      data: [20000, 25000, 22000, 28000, 30000, 35000],
      color: (opacity = 1) => `rgba(107, 78, 255, ${opacity})`,
      strokeWidth: 2,
    }],
  };

  // Category breakdown
  const getCategoryBreakdown = () => {
    const breakdown = {};
    transactions.forEach(transaction => {
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

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <View>
          <Text style={styles.greeting}>{getGreeting()},</Text>
          <Text style={styles.userName}>{userProfile?.name || 'User'}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {userProfile?.name?.charAt(0)?.toUpperCase() || 'U'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <Card style={[styles.summaryCard, { backgroundColor: '#6B4EFF' }]}>
          <Text style={styles.cardLabel}>Total Income</Text>
          <Text style={styles.cardValue}>₹{formatCurrency(income)}</Text>
          <Ionicons name="arrow-up-circle" size={30} color="#FFFFFF" style={styles.cardIcon} />
        </Card>

        <Card style={[styles.summaryCard, { backgroundColor: '#FF6B6B' }]}>
          <Text style={styles.cardLabel}>Total Expenses</Text>
          <Text style={styles.cardValue}>₹{formatCurrency(expenses)}</Text>
          <Ionicons name="arrow-down-circle" size={30} color="#FFFFFF" style={styles.cardIcon} />
        </Card>

        <Card style={[styles.summaryCard, { backgroundColor: '#4ECDC4' }]}>
          <Text style={styles.cardLabel}>Total Savings</Text>
          <Text style={styles.cardValue}>₹{formatCurrency(savings)}</Text>
          <Ionicons name="save" size={30} color="#FFFFFF" style={styles.cardIcon} />
        </Card>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('AddTransaction', { type: 'income' })}
        >
          <View style={[styles.actionIcon, { backgroundColor: '#4CAF5020' }]}>
            <Ionicons name="arrow-down" size={24} color="#4CAF50" />
          </View>
          <Text style={styles.actionText}>Add Income</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('AddTransaction', { type: 'expense' })}
        >
          <View style={[styles.actionIcon, { backgroundColor: '#F4433620' }]}>
            <Ionicons name="arrow-up" size={24} color="#F44336" />
          </View>
          <Text style={styles.actionText}>Add Expense</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('AllTransactions')}
        >
          <View style={[styles.actionIcon, { backgroundColor: '#6B4EFF20' }]}>
            <Ionicons name="list" size={24} color="#6B4EFF" />
          </View>
          <Text style={styles.actionText}>All Transactions</Text>
        </TouchableOpacity>
      </View>

      {/* Chart Section */}
      <Card style={styles.chartCard}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Monthly Overview</Text>
          <View style={styles.periodSelector}>
            <TouchableOpacity
              style={[styles.periodButton, selectedPeriod === 'week' && styles.periodButtonActive]}
              onPress={() => setSelectedPeriod('week')}
            >
              <Text style={[styles.periodText, selectedPeriod === 'week' && styles.periodTextActive]}>Week</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.periodButton, selectedPeriod === 'month' && styles.periodButtonActive]}
              onPress={() => setSelectedPeriod('month')}
            >
              <Text style={[styles.periodText, selectedPeriod === 'month' && styles.periodTextActive]}>Month</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.periodButton, selectedPeriod === 'year' && styles.periodButtonActive]}
              onPress={() => setSelectedPeriod('year')}
            >
              <Text style={[styles.periodText, selectedPeriod === 'year' && styles.periodTextActive]}>Year</Text>
            </TouchableOpacity>
          </View>
        </View>
        <LineChart
          data={chartData}
          width={screenWidth - 50}
          height={200}
          chartConfig={{
            backgroundColor: '#FFFFFF',
            backgroundGradientFrom: '#FFFFFF',
            backgroundGradientTo: '#FFFFFF',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(107, 78, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#FFD700',
            },
          }}
          bezier
          style={styles.chart}
        />
      </Card>

      {/* Category Breakdown */}
      {pieData.length > 0 && (
        <Card style={styles.chartCard}>
          <Text style={styles.chartTitle}>Expense Categories</Text>
          <PieChart
            data={pieData}
            width={screenWidth - 50}
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
      )}

      {/* Recent Transactions */}
      <Card style={styles.transactionsCard}>
        <View style={styles.transactionsHeader}>
          <Text style={styles.transactionsTitle}>Recent Transactions</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AllTransactions')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {transactions.length > 0 ? (
          transactions.slice(0, 5).map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onPress={() => navigation.navigate('TransactionDetail', { transactionId: transaction.id })}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={50} color="#E0E0E0" />
            <Text style={styles.emptyStateText}>No transactions yet</Text>
            <TouchableOpacity
              style={styles.addFirstButton}
              onPress={() => navigation.navigate('AddTransaction')}
            >
              <Text style={styles.addFirstButtonText}>Add Your First Transaction</Text>
            </TouchableOpacity>
          </View>
        )}
      </Card>

      {/* Savings Goal */}
      <Card style={styles.goalCard}>
        <Text style={styles.goalTitle}>Savings Goal</Text>
        <View style={styles.goalProgress}>
          <View style={styles.goalHeader}>
            <Text style={styles.goalLabel}>Emergency Fund</Text>
            <Text style={styles.goalValue}>₹25,000 / ₹1,00,000</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '25%' }]} />
          </View>
          <Text style={styles.progressText}>25% Complete</Text>
        </View>
        <TouchableOpacity style={styles.addGoalButton}>
          <Ionicons name="add-circle-outline" size={20} color="#6B4EFF" />
          <Text style={styles.addGoalText}>Add to Goal</Text>
        </TouchableOpacity>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  welcomeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  greeting: {
    fontSize: 14,
    color: '#757575',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
    marginTop: 2,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#6B4EFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    gap: 10,
  },
  summaryCard: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    position: 'relative',
    minHeight: 80,
  },
  cardLabel: {
    color: '#FFFFFF',
    fontSize: 11,
    opacity: 0.9,
  },
  cardValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
  cardIcon: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    opacity: 0.5,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  actionText: {
    fontSize: 11,
    color: '#757575',
  },
  chartCard: {
    margin: 15,
    marginTop: 0,
    marginBottom: 10,
    padding: 15,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 2,
  },
  periodButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 13,
  },
  periodButtonActive: {
    backgroundColor: '#6B4EFF',
  },
  periodText: {
    fontSize: 11,
    color: '#757575',
  },
  periodTextActive: {
    color: '#FFFFFF',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  transactionsCard: {
    margin: 15,
    marginTop: 0,
    marginBottom: 10,
    padding: 15,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  transactionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  seeAllText: {
    fontSize: 12,
    color: '#6B4EFF',
  },
  emptyState: {
    alignItems: 'center',
    padding: 30,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#9E9E9E',
    marginTop: 10,
    marginBottom: 15,
  },
  addFirstButton: {
    backgroundColor: '#6B4EFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  addFirstButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
  },
  goalCard: {
    margin: 15,
    marginTop: 0,
    marginBottom: 30,
    padding: 15,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 12,
  },
  goalProgress: {
    marginBottom: 12,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  goalLabel: {
    fontSize: 13,
    color: '#757575',
  },
  goalValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#212121',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6B4EFF',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 11,
    color: '#757575',
    textAlign: 'right',
  },
  addGoalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    gap: 5,
  },
  addGoalText: {
    fontSize: 13,
    color: '#6B4EFF',
    fontWeight: '500',
  },
});

export default DashboardScreen;