
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card';
import Button from '../../components/Button';

const PaymentScreen = ({ navigation, route }) => {
  const { planId } = route.params || { planId: 'yearly' };
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [loading, setLoading] = useState(false);

  const plans = {
    monthly: { name: 'Monthly Plan', price: 499 },
    quarterly: { name: 'Quarterly Plan', price: 1299 },
    yearly: { name: 'Yearly Plan', price: 4799 },
  };

  const currentPlan = plans[planId] || plans.yearly;

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: 'card-outline' },
    { id: 'upi', name: 'UPI', icon: 'phone-portrait-outline' },
    { id: 'netbanking', name: 'Net Banking', icon: 'business-outline' },
    { id: 'wallet', name: 'Wallet', icon: 'wallet-outline' },
  ];

  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\s/g, '');
    const matches = cleaned.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return text;
    }
  };

  const formatExpiryDate = (text) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + (cleaned.length > 2 ? '/' + cleaned.substring(2, 4) : '');
    }
    return cleaned;
  };

  const handlePayment = () => {
    if (selectedMethod === 'card') {
      if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
        Alert.alert('Error', 'Please enter a valid card number');
        return;
      }
      if (!cardName) {
        Alert.alert('Error', 'Please enter the cardholder name');
        return;
      }
      if (!expiryDate || expiryDate.length < 5) {
        Alert.alert('Error', 'Please enter a valid expiry date');
        return;
      }
      if (!cvv || cvv.length < 3) {
        Alert.alert('Error', 'Please enter a valid CVV');
        return;
      }
    } else if (selectedMethod === 'upi') {
      if (!upiId || !upiId.includes('@')) {
        Alert.alert('Error', 'Please enter a valid UPI ID');
        return;
      }
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Payment Successful',
        `Your ${currentPlan.name} subscription has been activated successfully!`,
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('SubscriptionDetails', { planId })
          }
        ]
      );
    }, 2000);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Order Summary */}
      <Card style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Order Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>{currentPlan.name}</Text>
          <Text style={styles.summaryValue}>₹{currentPlan.price}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tax (GST)</Text>
          <Text style={styles.summaryValue}>₹{(currentPlan.price * 0.18).toFixed(0)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>
            ₹{currentPlan.price + Math.round(currentPlan.price * 0.18)}
          </Text>
        </View>
      </Card>

      {/* Payment Methods */}
      <Card style={styles.methodsCard}>
        <Text style={styles.methodsTitle}>Select Payment Method</Text>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.methodItem,
              selectedMethod === method.id && styles.selectedMethod
            ]}
            onPress={() => setSelectedMethod(method.id)}
          >
            <View style={styles.methodLeft}>
              <Ionicons name={method.icon} size={24} color="#6B4EFF" />
              <Text style={styles.methodName}>{method.name}</Text>
            </View>
            {selectedMethod === method.id && (
              <Ionicons name="checkmark-circle" size={22} color="#6B4EFF" />
            )}
          </TouchableOpacity>
        ))}
      </Card>

      {/* Payment Details */}
      {selectedMethod === 'card' && (
        <Card style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>Card Details</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Card Number</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="card-outline" size={20} color="#6B4EFF" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                keyboardType="numeric"
                maxLength={19}
                placeholderTextColor="#9E9E9E"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cardholder Name</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#6B4EFF" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Name on card"
                value={cardName}
                onChangeText={setCardName}
                placeholderTextColor="#9E9E9E"
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.label}>Expiry Date</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="calendar-outline" size={20} color="#6B4EFF" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
                  maxLength={5}
                  placeholderTextColor="#9E9E9E"
                />
              </View>
            </View>

            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>CVV</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#6B4EFF" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="123"
                  value={cvv}
                  onChangeText={setCvv}
                  keyboardType="numeric"
                  maxLength={3}
                  secureTextEntry
                  placeholderTextColor="#9E9E9E"
                />
              </View>
            </View>
          </View>
        </Card>
      )}

      {selectedMethod === 'upi' && (
        <Card style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>UPI Details</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>UPI ID</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="phone-portrait-outline" size={20} color="#6B4EFF" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="username@okhdfcbank"
                value={upiId}
                onChangeText={setUpiId}
                placeholderTextColor="#9E9E9E"
              />
            </View>
          </View>

          <View style={styles.upiApps}>
            <Text style={styles.upiAppsTitle}>Popular UPI Apps</Text>
            <View style={styles.appIcons}>
              <TouchableOpacity style={styles.appIcon}>
                <Ionicons name="logo-google" size={24} color="#6B4EFF" />
                <Text style={styles.appName}>Google Pay</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.appIcon}>
                <Ionicons name="logo-phonepay" size={24} color="#6B4EFF" />
                <Text style={styles.appName}>PhonePe</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.appIcon}>
                <Ionicons name="logo-paytm" size={24} color="#6B4EFF" />
                <Text style={styles.appName}>Paytm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      )}

      {selectedMethod === 'netbanking' && (
        <Card style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>Select Your Bank</Text>

          <TouchableOpacity style={styles.bankItem}>
            <Text style={styles.bankName}>State Bank of India</Text>
            <Ionicons name="chevron-forward" size={20} color="#757575" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.bankItem}>
            <Text style={styles.bankName}>HDFC Bank</Text>
            <Ionicons name="chevron-forward" size={20} color="#757575" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.bankItem}>
            <Text style={styles.bankName}>ICICI Bank</Text>
            <Ionicons name="chevron-forward" size={20} color="#757575" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.bankItem}>
            <Text style={styles.bankName}>Axis Bank</Text>
            <Ionicons name="chevron-forward" size={20} color="#757575" />
          </TouchableOpacity>
        </Card>
      )}

      {/* Pay Button */}
      <View style={styles.payButtonContainer}>
        <Button
          title={`Pay ₹${currentPlan.price + Math.round(currentPlan.price * 0.18)}`}
          onPress={handlePayment}
          loading={loading}
          style={styles.payButton}
        />
        <Text style={styles.secureText}>
          <Ionicons name="lock-closed" size={12} color="#757575" /> Secure Payment
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  summaryCard: {
    margin: 15,
    marginBottom: 10,
    padding: 15,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#757575',
  },
  summaryValue: {
    fontSize: 14,
    color: '#212121',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    marginTop: 8,
    paddingTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6B4EFF',
  },
  methodsCard: {
    margin: 15,
    marginTop: 0,
    marginBottom: 10,
    padding: 15,
  },
  methodsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 12,
  },
  methodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  selectedMethod: {
    backgroundColor: '#F8F4FF',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  methodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  methodName: {
    fontSize: 15,
    color: '#212121',
  },
  detailsCard: {
    margin: 15,
    marginTop: 0,
    marginBottom: 10,
    padding: 15,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 15,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 13,
    color: '#757575',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  inputIcon: {
    paddingLeft: 12,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
  },
  upiApps: {
    marginTop: 10,
  },
  upiAppsTitle: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 10,
  },
  appIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  appIcon: {
    alignItems: 'center',
  },
  appName: {
    fontSize: 11,
    color: '#757575',
    marginTop: 4,
  },
  bankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  bankName: {
    fontSize: 14,
    color: '#212121',
  },
  payButtonContainer: {
    margin: 15,
    marginTop: 5,
    marginBottom: 30,
  },
  payButton: {
    marginBottom: 8,
  },
  secureText: {
    fontSize: 11,
    color: '#757575',
    textAlign: 'center',
  },
});

export default PaymentScreen;