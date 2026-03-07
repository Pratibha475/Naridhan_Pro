
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card';
import Button from '../../components/Button';

const SubscriptionDetailsScreen = ({ navigation, route }) => {
  const { planId } = route.params || { planId: 'yearly' };
  const [isAutoRenew, setIsAutoRenew] = useState(true);

  const plans = {
    monthly: { name: 'Monthly Plan', price: 499, period: 'month' },
    quarterly: { name: 'Quarterly Plan', price: 1299, period: '3 months' },
    yearly: { name: 'Yearly Plan', price: 4799, period: 'year' },
  };

  const currentPlan = plans[planId] || plans.yearly;

  const startDate = new Date();
  const endDate = new Date();

  if (planId === 'monthly') {
    endDate.setMonth(endDate.getMonth() + 1);
  } else if (planId === 'quarterly') {
    endDate.setMonth(endDate.getMonth() + 3);
  } else {
    endDate.setFullYear(endDate.getFullYear() + 1);
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleCancelSubscription = () => {
    Alert.alert(
      'Cancel Subscription',
      'Are you sure you want to cancel your subscription? You will continue to have access until the end of your billing period.',
      [
        { text: 'No, Keep It', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => Alert.alert('Subscription Cancelled', 'Your subscription has been cancelled. You will have access until ' + formatDate(endDate)),
        },
      ]
    );
  };

  const benefits = [
    'Advanced investment analytics and predictions',
    'Priority 24/7 customer support',
    'Monthly 1-on-1 consultation with financial advisor',
    'Access to exclusive webinars and workshops',
    'Tax planning and optimization tools',
    'Premium community access',
    'Early access to new features',
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Subscription Status */}
      <Card style={styles.statusCard}>
        <View style={styles.statusHeader}>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Active</Text>
          </View>
          <Ionicons name="diamond" size={40} color="#FFD700" />
        </View>

        <Text style={styles.planName}>{currentPlan.name}</Text>

        <View style={styles.dateContainer}>
          <View style={styles.dateItem}>
            <Text style={styles.dateLabel}>Started</Text>
            <Text style={styles.dateValue}>{formatDate(startDate)}</Text>
          </View>
          <Ionicons name="arrow-forward" size={20} color="#757575" />
          <View style={styles.dateItem}>
            <Text style={styles.dateLabel}>Renews</Text>
            <Text style={styles.dateValue}>{formatDate(endDate)}</Text>
          </View>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Billed {currentPlan.period}ly</Text>
          <Text style={styles.priceValue}>₹{currentPlan.price}/{currentPlan.period}</Text>
        </View>
      </Card>

      {/* Auto Renewal */}
      <Card style={styles.autoRenewCard}>
        <View style={styles.autoRenewHeader}>
          <View style={styles.autoRenewLeft}>
            <Ionicons name="repeat" size={24} color="#6B4EFF" />
            <View>
              <Text style={styles.autoRenewTitle}>Auto Renewal</Text>
              <Text style={styles.autoRenewSubtitle}>
                Your subscription will automatically renew on {formatDate(endDate)}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.toggleButton, isAutoRenew && styles.toggleActive]}
            onPress={() => setIsAutoRenew(!isAutoRenew)}
          >
            <View style={[styles.toggleCircle, isAutoRenew && styles.toggleCircleActive]} />
          </TouchableOpacity>
        </View>
      </Card>

      {/* Payment Method */}
      <Card style={styles.paymentCard}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.paymentInfo}>
          <Ionicons name="card-outline" size={24} color="#6B4EFF" />
          <View style={styles.paymentDetails}>
            <Text style={styles.paymentType}>HDFC Bank Credit Card</Text>
            <Text style={styles.paymentNumber}>•••• •••• •••• 4242</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>
      </Card>

      {/* Benefits */}
      <Card style={styles.benefitsCard}>
        <Text style={styles.sectionTitle}>Premium Benefits</Text>
        {benefits.map((benefit, index) => (
          <View key={index} style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={18} color="#4CAF50" />
            <Text style={styles.benefitText}>{benefit}</Text>
          </View>
        ))}
      </Card>

      {/* Usage Stats */}
      <Card style={styles.statsCard}>
        <Text style={styles.sectionTitle}>Usage Statistics</Text>

        <View style={styles.statRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>AI Consultations</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Webinars Attended</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>₹2.5L</Text>
            <Text style={styles.statLabel}>Tax Saved</Text>
          </View>
        </View>
      </Card>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <Button
          title="Cancel Subscription"
          onPress={handleCancelSubscription}
          style={styles.cancelButton}
          textStyle={{ color: '#F44336' }}
        />

        <TouchableOpacity
          style={styles.invoiceButton}
          onPress={() => navigation.navigate('PaymentHistory')}
        >
          <Ionicons name="document-text-outline" size={20} color="#6B4EFF" />
          <Text style={styles.invoiceButtonText}>View Invoices</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  statusCard: {
    margin: 15,
    marginBottom: 10,
    padding: 20,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  statusBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  planName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateItem: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 14,
    color: '#212121',
    fontWeight: '500',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 15,
  },
  priceLabel: {
    fontSize: 14,
    color: '#757575',
  },
  priceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6B4EFF',
  },
  autoRenewCard: {
    margin: 15,
    marginTop: 0,
    marginBottom: 10,
    padding: 15,
  },
  autoRenewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  autoRenewLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  autoRenewTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#212121',
  },
  autoRenewSubtitle: {
    fontSize: 11,
    color: '#757575',
    marginTop: 2,
  },
  toggleButton: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E0E0E0',
    padding: 2,
  },
  toggleActive: {
    backgroundColor: '#6B4EFF',
  },
  toggleCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  toggleCircleActive: {
    transform: [{ translateX: 22 }],
  },
  paymentCard: {
    margin: 15,
    marginTop: 0,
    marginBottom: 10,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 15,
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  paymentDetails: {
    flex: 1,
  },
  paymentType: {
    fontSize: 15,
    color: '#212121',
  },
  paymentNumber: {
    fontSize: 12,
    color: '#757575',
    marginTop: 2,
  },
  changeText: {
    color: '#6B4EFF',
    fontSize: 13,
    fontWeight: '500',
  },
  benefitsCard: {
    margin: 15,
    marginTop: 0,
    marginBottom: 10,
    padding: 15,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  benefitText: {
    flex: 1,
    fontSize: 14,
    color: '#212121',
  },
  statsCard: {
    margin: 15,
    marginTop: 0,
    marginBottom: 10,
    padding: 15,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: '#757575',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E0E0E0',
  },
  actionButtons: {
    margin: 15,
    marginTop: 5,
    marginBottom: 30,
    gap: 10,
  },
  cancelButton: {
    backgroundColor: '#FFEBEE',
    borderWidth: 1,
    borderColor: '#F44336',
  },
  invoiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    gap: 8,
  },
  invoiceButtonText: {
    fontSize: 14,
    color: '#6B4EFF',
    fontWeight: '500',
  },
});

export default SubscriptionDetailsScreen;