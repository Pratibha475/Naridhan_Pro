
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useFinancial } from '../../context/FinancialContext';
import Card from '../../components/Card';
import Button from '../../components/Button';

const AddTransactionScreen = ({ navigation, route }) => {
  const { transactionId, type: initialType } = route.params || {};
  const { transactions, addTransaction, updateTransaction } = useFinancial();

  const [formData, setFormData] = useState({
    type: initialType || 'expense',
    amount: '',
    description: '',
    category: '',
    date: new Date(),
    paymentMethod: 'Cash',
    notes: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const expenseCategories = [
    'Food & Dining',
    'Shopping',
    'Transportation',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Education',
    'Personal Care',
    'Travel',
    'Other',
  ];

  const incomeCategories = [
    'Salary',
    'Freelance',
    'Business',
    'Investment',
    'Rental',
    'Gift',
    'Other',
  ];

  const paymentMethods = [
    'Cash',
    'Credit Card',
    'Debit Card',
    'UPI',
    'Net Banking',
    'Wallet',
  ];

  useEffect(() => {
    if (transactionId) {
      const transaction = transactions.find(t => t.id === transactionId);
      if (transaction) {
        setFormData({
          type: transaction.type,
          amount: transaction.amount.toString(),
          description: transaction.description,
          category: transaction.category,
          date: new Date(transaction.date),
          paymentMethod: transaction.paymentMethod || 'Cash',
          notes: transaction.notes || '',
        });
      }
    }
  }, [transactionId]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return false;
    }
    if (!formData.description.trim()) {
      Alert.alert('Error', 'Please enter a description');
      return false;
    }
    if (!formData.category) {
      Alert.alert('Error', 'Please select a category');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const transactionData = {
        ...formData,
        amount: parseFloat(formData.amount),
        date: formData.date.toISOString(),
      };

      if (transactionId) {
        await updateTransaction(transactionId, transactionData);
        Alert.alert('Success', 'Transaction updated successfully');
      } else {
        await addTransaction(transactionData);
        Alert.alert('Success', 'Transaction added successfully');
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save transaction');
    } finally {
      setLoading(false);
    }
  };

  const categories = formData.type === 'income' ? incomeCategories : expenseCategories;

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        {/* Transaction Type Toggle */}
        <View style={styles.typeToggle}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              formData.type === 'expense' && styles.typeButtonActive,
              { borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }
            ]}
            onPress={() => handleChange('type', 'expense')}
          >
            <Ionicons
              name="arrow-up"
              size={20}
              color={formData.type === 'expense' ? '#FFFFFF' : '#F44336'}
            />
            <Text style={[
              styles.typeButtonText,
              formData.type === 'expense' && styles.typeButtonTextActive
            ]}>
              Expense
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.typeButton,
              formData.type === 'income' && styles.typeButtonActive,
              { borderTopRightRadius: 8, borderBottomRightRadius: 8 }
            ]}
            onPress={() => handleChange('type', 'income')}
          >
            <Ionicons
              name="arrow-down"
              size={20}
              color={formData.type === 'income' ? '#FFFFFF' : '#4CAF50'}
            />
            <Text style={[
              styles.typeButtonText,
              formData.type === 'income' && styles.typeButtonTextActive
            ]}>
              Income
            </Text>
          </TouchableOpacity>
        </View>

        {/* Amount Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Amount (₹)</Text>
          <View style={styles.amountInputContainer}>
            <Text style={styles.currencySymbol}>₹</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              value={formData.amount}
              onChangeText={(text) => handleChange('amount', text)}
              keyboardType="numeric"
              placeholderTextColor="#9E9E9E"
            />
          </View>
        </View>

        {/* Description Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="document-text-outline" size={20} color="#6B4EFF" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter description"
              value={formData.description}
              onChangeText={(text) => handleChange('description', text)}
              placeholderTextColor="#9E9E9E"
            />
          </View>
        </View>

        {/* Category Picker */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.pickerContainer}>
            <Ionicons name="pricetag-outline" size={20} color="#6B4EFF" style={styles.pickerIcon} />
            <Picker
              selectedValue={formData.category}
              onValueChange={(value) => handleChange('category', value)}
              style={styles.picker}
              dropdownIconColor="#6B4EFF"
            >
              <Picker.Item label="Select a category" value="" />
              {categories.map((cat) => (
                <Picker.Item key={cat} label={cat} value={cat} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Date Picker */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Ionicons name="calendar-outline" size={20} color="#6B4EFF" />
            <Text style={styles.dateText}>
              {formData.date.toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Payment Method Picker */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Payment Method</Text>
          <View style={styles.pickerContainer}>
            <Ionicons name="card-outline" size={20} color="#6B4EFF" style={styles.pickerIcon} />
            <Picker
              selectedValue={formData.paymentMethod}
              onValueChange={(value) => handleChange('paymentMethod', value)}
              style={styles.picker}
              dropdownIconColor="#6B4EFF"
            >
              {paymentMethods.map((method) => (
                <Picker.Item key={method} label={method} value={method} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Notes Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Notes (Optional)</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="chatbubble-outline" size={20} color="#6B4EFF" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, styles.notesInput]}
              placeholder="Add any additional notes"
              value={formData.notes}
              onChangeText={(text) => handleChange('notes', text)}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              placeholderTextColor="#9E9E9E"
            />
          </View>
        </View>

        {/* Submit Button */}
        <Button
          title={transactionId ? 'Update Transaction' : 'Add Transaction'}
          onPress={handleSubmit}
          loading={loading}
          style={styles.submitButton}
        />
      </Card>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <DateTimePicker
          value={formData.date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              handleChange('date', selectedDate);
            }
          }}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  card: {
    margin: 15,
    marginBottom: 30,
    padding: 20,
  },
  typeToggle: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#F5F5F5',
    gap: 8,
  },
  typeButtonActive: {
    backgroundColor: '#6B4EFF',
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  typeButtonTextActive: {
    color: '#FFFFFF',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 6,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
  },
  currencySymbol: {
    fontSize: 20,
    color: '#212121',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    padding: 12,
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  inputIcon: {
    padding: 12,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 15,
  },
  notesInput: {
    minHeight: 80,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  pickerIcon: {
    padding: 12,
  },
  picker: {
    flex: 1,
    height: 50,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    padding: 12,
    gap: 10,
  },
  dateText: {
    fontSize: 15,
    color: '#212121',
  },
  submitButton: {
    marginTop: 10,
  },
});

export default AddTransactionScreen;