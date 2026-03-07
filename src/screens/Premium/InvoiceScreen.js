
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card';

const InvoiceScreen = ({ navigation, route }) => {
  const { invoiceId } = route.params || { invoiceId: 'INV-2024-001' };

  // Mock invoice data
  const invoice = {
    id: invoiceId,
    date: '15 March 2024',
    dueDate: '15 March 2024',
    customer: {
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      address: '123, Financial District, Mumbai - 400001',
    },
    plan: 'Yearly Premium Plan',
    amount: 4799,
    tax: 864,
    total: 5663,
    status: 'Paid',
    paymentMethod: 'HDFC Bank Credit Card (•••• 4242)',
    items: [
      { description: 'Yearly Premium Subscription', quantity: 1, amount: 4799 },
      { description: 'GST (18%)', quantity: 1, amount: 864 },
    ],
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Invoice ${invoice.id}\nDate: ${invoice.date}\nAmount: ₹${invoice.total}\nPlan: ${invoice.plan}`,
        title: 'Invoice',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownload = () => {
    // Implement PDF download functionality
    alert('Download feature coming soon!');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          <Ionicons name="share-outline" size={20} color="#6B4EFF" />
          <Text style={styles.actionButtonText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleDownload}>
          <Ionicons name="download-outline" size={20} color="#6B4EFF" />
          <Text style={styles.actionButtonText}>Download</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.goBack()}>
          <Ionicons name="close-outline" size={20} color="#6B4EFF" />
          <Text style={styles.actionButtonText}>Close</Text>
        </TouchableOpacity>
      </View>

      {/* Invoice Card */}
      <Card style={styles.invoiceCard}>
        {/* Header */}
        <View style={styles.invoiceHeader}>
          <View>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text style={styles.invoiceId}>#{invoice.id}</Text>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{invoice.status}</Text>
          </View>
        </View>

        {/* Dates */}
        <View style={styles.dateSection}>
          <View style={styles.dateRow}>
            <Text style={styles.dateLabel}>Invoice Date:</Text>
            <Text style={styles.dateValue}>{invoice.date}</Text>
          </View>
          <View style={styles.dateRow}>
            <Text style={styles.dateLabel}>Due Date:</Text>
            <Text style={styles.dateValue}>{invoice.dueDate}</Text>
          </View>
        </View>

        {/* Company Info */}
        <View style={styles.companySection}>
          <Text style={styles.companyName}>NariDhan Pro</Text>
          <Text style={styles.companyAddress}>Financial District, Mumbai - 400001</Text>
          <Text style={styles.companyEmail}>billing@naridhan.com</Text>
          <Text style={styles.companyPhone}>+91 1800 123 4567</Text>
        </View>

        {/* Bill To */}
        <View style={styles.billToSection}>
          <Text style={styles.billToTitle}>Bill To:</Text>
          <Text style={styles.customerName}>{invoice.customer.name}</Text>
          <Text style={styles.customerEmail}>{invoice.customer.email}</Text>
          <Text style={styles.customerAddress}>{invoice.customer.address}</Text>
        </View>

        {/* Items Table */}
        <View style={styles.tableSection}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Description</Text>
            <Text style={[styles.tableHeaderCell, { flex: 1, textAlign: 'right' }]}>Qty</Text>
            <Text style={[styles.tableHeaderCell, { flex: 1, textAlign: 'right' }]}>Amount</Text>
          </View>

          {invoice.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 2 }]}>{item.description}</Text>
              <Text style={[styles.tableCell, { flex: 1, textAlign: 'right' }]}>{item.quantity}</Text>
              <Text style={[styles.tableCell, { flex: 1, textAlign: 'right' }]}>₹{item.amount}</Text>
            </View>
          ))}
        </View>

        {/* Total */}
        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal:</Text>
            <Text style={styles.totalValue}>₹{invoice.amount}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tax (18% GST):</Text>
            <Text style={styles.totalValue}>₹{invoice.tax}</Text>
          </View>
          <View style={[styles.totalRow, styles.grandTotalRow]}>
            <Text style={styles.grandTotalLabel}>Total:</Text>
            <Text style={styles.grandTotalValue}>₹{invoice.total}</Text>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.paymentSection}>
          <Text style={styles.paymentLabel}>Payment Method:</Text>
          <Text style={styles.paymentValue}>{invoice.paymentMethod}</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Thank you for choosing NariDhan Pro!</Text>
          <Text style={styles.footerSubtext}>For any queries, contact support@naridhan.com</Text>
        </View>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 15,
    paddingBottom: 5,
    gap: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    gap: 4,
  },
  actionButtonText: {
    fontSize: 12,
    color: '#6B4EFF',
  },
  invoiceCard: {
    margin: 15,
    marginTop: 5,
    marginBottom: 30,
    padding: 20,
  },
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  invoiceTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212121',
  },
  invoiceId: {
    fontSize: 14,
    color: '#757575',
    marginTop: 4,
  },
  statusBadge: {
    backgroundColor: '#4CAF5020',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '500',
  },
  dateSection: {
    marginBottom: 20,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  dateLabel: {
    fontSize: 13,
    color: '#757575',
  },
  dateValue: {
    fontSize: 13,
    color: '#212121',
  },
  companySection: {
    marginBottom: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 4,
  },
  companyAddress: {
    fontSize: 13,
    color: '#757575',
    marginBottom: 2,
  },
  companyEmail: {
    fontSize: 13,
    color: '#757575',
    marginBottom: 2,
  },
  companyPhone: {
    fontSize: 13,
    color: '#757575',
  },
  billToSection: {
    marginBottom: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  billToTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 8,
  },
  customerName: {
    fontSize: 15,
    color: '#212121',
    marginBottom: 2,
  },
  customerEmail: {
    fontSize: 13,
    color: '#757575',
    marginBottom: 2,
  },
  customerAddress: {
    fontSize: 13,
    color: '#757575',
  },
  tableSection: {
    marginBottom: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tableHeaderCell: {
    fontSize: 13,
    fontWeight: '600',
    color: '#212121',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tableCell: {
    fontSize: 13,
    color: '#757575',
  },
  totalSection: {
    marginBottom: 20,
    paddingTop: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  totalLabel: {
    fontSize: 14,
    color: '#757575',
  },
  totalValue: {
    fontSize: 14,
    color: '#212121',
  },
  grandTotalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    marginTop: 8,
    paddingTop: 8,
  },
  grandTotalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  grandTotalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6B4EFF',
  },
  paymentSection: {
    marginBottom: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  paymentLabel: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 4,
  },
  paymentValue: {
    fontSize: 14,
    color: '#212121',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  footerText: {
    fontSize: 14,
    color: '#212121',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 11,
    color: '#757575',
  },
});

export default InvoiceScreen;