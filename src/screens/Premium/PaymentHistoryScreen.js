
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card';

const PaymentHistoryScreen = ({ navigation }) => {
  const payments = [
    {
      id: '1',
      date: '15 Mar 2024',
      amount: 4799,
      plan: 'Yearly Plan',
      status: 'Paid',
      invoice: 'INV-2024-001',
    },
    {
      id: '2',
      date: '15 Feb 2024',
      amount: 4799,
      plan: 'Yearly Plan',
      status: 'Paid',
      invoice: 'INV-2024-002',
    },
    {
      id: '3',
      date: '15 Jan 2024',
      amount: 4799,
      plan: 'Yearly Plan',
      status: 'Paid',
      invoice: 'INV-2024-003',
    },
    {
      id: '4',
      date: '15 Dec 2023',
      amount: 1299,
      plan: 'Quarterly Plan',
      status: 'Paid',
      invoice: 'INV-2023-045',
    },
    {
      id: '5',
      date: '15 Sep 2023',
      amount: 499,
      plan: 'Monthly Plan',
      status: 'Paid',
      invoice: 'INV-2023-032',
    },
  ];

  const getStatusColor = (status) => {
    return status === 'Paid' ? '#4CAF50' : '#F44336';
  };

  const renderPayment = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Invoice', { invoiceId: item.invoice })}
    >
      <Card style={styles.paymentCard}>
        <View style={styles.paymentHeader}>
          <View>
            <Text style={styles.invoiceNumber}>{item.invoice}</Text>
            <Text style={styles.planName}>{item.plan}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
              {item.status}
            </Text>
          </View>
        </View>

        <View style={styles.paymentDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="calendar-outline" size={16} color="#757575" />
            <Text style={styles.detailText}>{item.date}</Text>
          </View>
          <Text style={styles.amount}>₹{item.amount}</Text>
        </View>

        <View style={styles.invoiceAction}>
          <Ionicons name="document-text-outline" size={18} color="#6B4EFF" />
          <Text style={styles.invoiceActionText}>View Invoice</Text>
          <Ionicons name="chevron-forward" size={18} color="#757575" style={styles.chevron} />
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={payments}
        renderItem={renderPayment}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Payment History</Text>
            <Text style={styles.headerSubtitle}>Total Payments: ₹{payments.reduce((sum, p) => sum + p.amount, 0)}</Text>
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
  header: {
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#757575',
    marginTop: 4,
  },
  paymentCard: {
    marginBottom: 10,
    padding: 15,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  invoiceNumber: {
    fontSize: 15,
    fontWeight: '600',
    color: '#212121',
  },
  planName: {
    fontSize: 13,
    color: '#757575',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '500',
  },
  paymentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 13,
    color: '#757575',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
  },
  invoiceAction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  invoiceActionText: {
    fontSize: 13,
    color: '#6B4EFF',
    marginLeft: 6,
    flex: 1,
  },
  chevron: {
    marginLeft: 'auto',
  },
});

export default PaymentHistoryScreen;