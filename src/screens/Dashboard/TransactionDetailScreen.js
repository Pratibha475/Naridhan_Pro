
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFinancial } from '../../context/FinancialContext';
import Card from '../../components/Card';

const TransactionDetailScreen = ({ navigation, route }) => {
  const { transactionId } = route.params || {};
  const { transactions, deleteTransaction } = useFinancial();

  const transaction = transactions.find(t => t.id === transactionId) || {
    id: '1',
    type: 'expense',
    amount: 1500,
    description: 'Grocery Shopping',
    category: 'Food & Dining',
    date: new Date().toISOString(),
    paymentMethod: 'Credit Card',
    notes: 'Weekly grocery shopping at supermarket',
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount) => {
    return amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || '0';
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteTransaction(transactionId);
              Alert.alert('Success', 'Transaction deleted successfully');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete transaction');
            }
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    navigation.navigate('AddTransaction', { transactionId: transaction.id });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Amount Header */}
      <View style={styles.amountContainer}>
        <Text style={styles.amountLabel}>Amount</Text>
        <Text style={[
          styles.amount,
          { color: transaction.type === 'income' ? '#4CAF50' : '#F44336' }
        ]}>
          {transaction.type === 'income' ? '+' : '-'}₹{formatCurrency(transaction.amount)}
        </Text>
        <View style={[styles.typeBadge,
        { backgroundColor: transaction.type === 'income' ? '#4CAF5020' : '#F4433620' }
        ]}>
          <Text style={[
            styles.typeText,
            { color: transaction.type === 'income' ? '#4CAF50' : '#F44336' }
          ]}>
            {transaction.type === 'income' ? 'Income' : 'Expense'}
          </Text>
        </View>
      </View>

      {/* Details Card */}
      <Card style={styles.detailsCard}>
        <Text style={styles.sectionTitle}>Transaction Details</Text>

        <View style={styles.detailRow}>
          <View style={styles.detailIcon}>
            <Ionicons name="document-text-outline" size={20} color="#6B4EFF" />
          </View>
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Description</Text>
            <Text style={styles.detailValue}>{transaction.description}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailIcon}>
            <Ionicons name="pricetag-outline" size={20} color="#6B4EFF" />
          </View>
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Category</Text>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{transaction.category || 'Other'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailIcon}>
            <Ionicons name="calendar-outline" size={20} color="#6B4EFF" />
          </View>
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Date & Time</Text>
            <Text style={styles.detailValue}>{formatDate(transaction.date)}</Text>
          </View>
        </View>

        {transaction.paymentMethod && (
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Ionicons name="card-outline" size={20} color="#6B4EFF" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Payment Method</Text>
              <Text style={styles.detailValue}>{transaction.paymentMethod}</Text>
            </View>
          </View>
        )}

        {transaction.notes && (
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Ionicons name="chatbubble-outline" size={20} color="#6B4EFF" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Notes</Text>
              <Text style={styles.detailValue}>{transaction.notes}</Text>
            </View>
          </View>
        )}
      </Card>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={[styles.actionButton, styles.editButton]} onPress={handleEdit}>
          <Ionicons name="create-outline" size={20} color="#6B4EFF" />
          <Text style={styles.editButtonText}>Edit Transaction</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={handleDelete}>
          <Ionicons name="trash-outline" size={20} color="#F44336" />
          <Text style={styles.deleteButtonText}>Delete Transaction</Text>
        </TouchableOpacity>
      </View>

      {/* Additional Info */}
      <Card style={styles.infoCard}>
        <Text style={styles.infoText}>
          Transaction ID: {transaction.id}
        </Text>
        <Text style={styles.infoText}>
          Created: {formatDate(transaction.createdAt || transaction.date)}
        </Text>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  amountContainer: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  amountLabel: {
    fontSize: 13,
    color: '#757575',
    marginBottom: 8,
  },
  amount: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  typeBadge: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },
  typeText: {
    fontSize: 13,
    fontWeight: '500',
  },
  detailsCard: {
    margin: 15,
    marginTop: 10,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 15,
    color: '#212121',
  },
  categoryBadge: {
    backgroundColor: '#F0E6FF',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 13,
    color: '#6B4EFF',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 15,
    marginBottom: 15,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
    gap: 8,
  },
  editButton: {
    backgroundColor: '#F0E6FF',
  },
  editButtonText: {
    color: '#6B4EFF',
    fontSize: 14,
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#FFEBEE',
  },
  deleteButtonText: {
    color: '#F44336',
    fontSize: 14,
    fontWeight: '500',
  },
  infoCard: {
    margin: 15,
    marginTop: 0,
    marginBottom: 30,
    padding: 12,
  },
  infoText: {
    fontSize: 11,
    color: '#9E9E9E',
    marginBottom: 4,
  },
});

export default TransactionDetailScreen;