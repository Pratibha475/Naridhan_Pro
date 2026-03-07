
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFinancial } from '../../context/FinancialContext';
import Card from '../../components/Card';
import TransactionItem from '../../components/TransactionItem';

const AllTransactionsScreen = ({ navigation }) => {
  const { transactions = [] } = useFinancial();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const filterTypes = ['all', 'income', 'expense'];

  const getFilteredTransactions = () => {
    let filtered = [...transactions];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(t =>
        t.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(t => t.type === filterType);
    }

    // Apply sorting
    if (sortBy === 'date') {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'amount') {
      filtered.sort((a, b) => b.amount - a.amount);
    }

    return filtered;
  };

  const filteredTransactions = getFilteredTransactions();

  const getTotalIncome = () => {
    return transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + (t.amount || 0), 0);
  };

  const getTotalExpense = () => {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + (t.amount || 0), 0);
  };

  const totalIncome = getTotalIncome();
  const totalExpense = getTotalExpense();
  const balance = totalIncome - totalExpense;

  const formatCurrency = (amount) => {
    return amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || '0';
  };

  const renderHeader = () => (
    <View>
      {/* Summary Cards */}
      <View style={styles.summaryRow}>
        <Card style={[styles.summaryCard, { backgroundColor: '#4CAF5020' }]}>
          <Text style={styles.summaryLabel}>Income</Text>
          <Text style={[styles.summaryValue, { color: '#4CAF50' }]}>
            ₹{formatCurrency(totalIncome)}
          </Text>
        </Card>
        <Card style={[styles.summaryCard, { backgroundColor: '#F4433620' }]}>
          <Text style={styles.summaryLabel}>Expense</Text>
          <Text style={[styles.summaryValue, { color: '#F44336' }]}>
            ₹{formatCurrency(totalExpense)}
          </Text>
        </Card>
        <Card style={[styles.summaryCard, { backgroundColor: '#6B4EFF20' }]}>
          <Text style={styles.summaryLabel}>Balance</Text>
          <Text style={[styles.summaryValue, { color: '#6B4EFF' }]}>
            ₹{formatCurrency(balance)}
          </Text>
        </Card>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#757575" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search transactions..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#9E9E9E"
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#757575" />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterTabs}>
        {filterTypes.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.filterTab,
              filterType === type && styles.filterTabActive
            ]}
            onPress={() => setFilterType(type)}
          >
            <Text style={[
              styles.filterText,
              filterType === type && styles.filterTextActive
            ]}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sort Options */}
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <TouchableOpacity
          style={[styles.sortOption, sortBy === 'date' && styles.sortOptionActive]}
          onPress={() => setSortBy('date')}
        >
          <Ionicons
            name="calendar-outline"
            size={16}
            color={sortBy === 'date' ? '#6B4EFF' : '#757575'}
          />
          <Text style={[styles.sortText, sortBy === 'date' && styles.sortTextActive]}>Date</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortOption, sortBy === 'amount' && styles.sortOptionActive]}
          onPress={() => setSortBy('amount')}
        >
          <Ionicons
            name="trending-up-outline"
            size={16}
            color={sortBy === 'amount' ? '#6B4EFF' : '#757575'}
          />
          <Text style={[styles.sortText, sortBy === 'amount' && styles.sortTextActive]}>Amount</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.transactionsCount}>
        {filteredTransactions.length} Transactions
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredTransactions}
        renderItem={({ item }) => (
          <TransactionItem
            transaction={item}
            onPress={() => navigation.navigate('TransactionDetail', { transactionId: item.id })}
          />
        )}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={60} color="#E0E0E0" />
            <Text style={styles.emptyStateText}>No transactions found</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  listContent: {
    padding: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  summaryCard: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 11,
    color: '#757575',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 14,
  },
  filterTabs: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 4,
    marginBottom: 12,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  filterTabActive: {
    backgroundColor: '#6B4EFF',
  },
  filterText: {
    fontSize: 13,
    color: '#757575',
  },
  filterTextActive: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  sortLabel: {
    fontSize: 13,
    color: '#757575',
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    gap: 4,
  },
  sortOptionActive: {
    backgroundColor: '#F0E6FF',
  },
  sortText: {
    fontSize: 12,
    color: '#757575',
  },
  sortTextActive: {
    color: '#6B4EFF',
  },
  transactionsCount: {
    fontSize: 13,
    color: '#757575',
    marginBottom: 10,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#9E9E9E',
    marginTop: 10,
  },
});

export default AllTransactionsScreen;