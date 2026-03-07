
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TransactionItem = ({ transaction, onPress }) => {
  if (!transaction) return null;

  const isIncome = transaction.type === 'income';
  const iconName = isIncome ? 'arrow-down' : 'arrow-up';
  const iconColor = isIncome ? '#4CAF50' : '#F44336';
  const bgColor = isIncome ? '#E8F5E9' : '#FFEBEE';

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.leftContent}>
        <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
          <Ionicons name={iconName} size={20} color={iconColor} />
        </View>
        <View>
          <Text style={styles.description}>{transaction.description || 'Transaction'}</Text>
          <Text style={styles.category}>{transaction.category || 'Other'}</Text>
        </View>
      </View>
      <Text style={[styles.amount, { color: iconColor }]}>
        {isIncome ? '+' : '-'}₹{transaction.amount?.toLocaleString() || '0'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212121',
  },
  category: {
    fontSize: 12,
    color: '#757575',
    marginTop: 2,
  },
  amount: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default TransactionItem;