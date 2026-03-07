
import React, { useState } from 'react';
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
import Slider from '@react-native-community/slider';
import Card from '../../components/Card';

const SIPCalculator = ({ language = 'en' }) => {
  const [monthlyAmount, setMonthlyAmount] = useState('5000');
  const [years, setYears] = useState('10');
  const [rate, setRate] = useState('12');
  const [result, setResult] = useState(null);

  const isHindi = language === 'hi';

  const calculateSIP = () => {
    const P = parseFloat(monthlyAmount) || 0;
    const t = parseFloat(years) || 0;
    const r = parseFloat(rate) || 0;

    if (P <= 0 || t <= 0 || r <= 0) {
      Alert.alert(
        isHindi ? 'त्रुटि' : 'Error',
        isHindi ? 'कृपया सभी मान सही भरें' : 'Please enter valid values'
      );
      return;
    }

    const n = t * 12; // months
    const i = r / 100 / 12; // monthly rate

    // Future Value = P * ((1 + i)^n - 1) / i * (1 + i)
    const futureValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const totalInvestment = P * n;
    const estimatedReturns = futureValue - totalInvestment;

    setResult({
      totalInvestment: Math.round(totalInvestment),
      estimatedReturns: Math.round(estimatedReturns),
      totalValue: Math.round(futureValue),
      principalPercentage: Math.round((totalInvestment / futureValue) * 100),
      returnsPercentage: Math.round((estimatedReturns / futureValue) * 100),
    });
  };

  const formatCurrency = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>
          {isHindi ? 'SIP कैलकुलेटर' : 'SIP Calculator'}
        </Text>
        <Text style={styles.subtitle}>
          {isHindi
            ? 'अपने SIP निवेश का भविष्य मूल्य जानें'
            : 'Calculate future value of your SIP investments'}
        </Text>

        {/* Monthly Investment */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            {isHindi ? 'मासिक निवेश (₹)' : 'Monthly Investment (₹)'}
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={monthlyAmount}
              onChangeText={setMonthlyAmount}
              keyboardType="numeric"
              placeholder="5000"
            />
          </View>
          <Slider
            style={styles.slider}
            minimumValue={500}
            maximumValue={100000}
            step={500}
            value={parseFloat(monthlyAmount) || 5000}
            onValueChange={(value) => setMonthlyAmount(value.toString())}
            minimumTrackTintColor="#6B4EFF"
            maximumTrackTintColor="#E0E0E0"
            thumbTintColor="#6B4EFF"
          />
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>₹500</Text>
            <Text style={styles.sliderLabel}>₹1L</Text>
          </View>
        </View>

        {/* Time Period */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            {isHindi ? 'समय अवधि (वर्ष)' : 'Time Period (Years)'}
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={years}
              onChangeText={setYears}
              keyboardType="numeric"
              placeholder="10"
            />
          </View>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={30}
            step={1}
            value={parseFloat(years) || 10}
            onValueChange={(value) => setYears(value.toString())}
            minimumTrackTintColor="#6B4EFF"
            maximumTrackTintColor="#E0E0E0"
            thumbTintColor="#6B4EFF"
          />
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>1 {isHindi ? 'वर्ष' : 'yr'}</Text>
            <Text style={styles.sliderLabel}>30 {isHindi ? 'वर्ष' : 'yrs'}</Text>
          </View>
        </View>

        {/* Expected Return */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            {isHindi ? 'अपेक्षित रिटर्न (%)' : 'Expected Return (%)'}
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={rate}
              onChangeText={setRate}
              keyboardType="numeric"
              placeholder="12"
            />
          </View>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={30}
            step={0.5}
            value={parseFloat(rate) || 12}
            onValueChange={(value) => setRate(value.toString())}
            minimumTrackTintColor="#6B4EFF"
            maximumTrackTintColor="#E0E0E0"
            thumbTintColor="#6B4EFF"
          />
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>1%</Text>
            <Text style={styles.sliderLabel}>30%</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.calculateButton} onPress={calculateSIP}>
          <Text style={styles.calculateButtonText}>
            {isHindi ? 'गणना करें' : 'Calculate'}
          </Text>
        </TouchableOpacity>

        {result && (
          <View style={styles.resultContainer}>
            <View style={styles.resultCard}>
              <Text style={styles.resultLabel}>
                {isHindi ? 'कुल निवेश' : 'Total Investment'}
              </Text>
              <Text style={styles.resultValue}>₹{formatCurrency(result.totalInvestment)}</Text>
            </View>

            <View style={styles.resultCard}>
              <Text style={styles.resultLabel}>
                {isHindi ? 'अनुमानित रिटर्न' : 'Est. Returns'}
              </Text>
              <Text style={[styles.resultValue, { color: '#4CAF50' }]}>
                +₹{formatCurrency(result.estimatedReturns)}
              </Text>
            </View>

            <View style={[styles.resultCard, styles.totalCard]}>
              <Text style={styles.resultLabel}>
                {isHindi ? 'कुल मूल्य' : 'Total Value'}
              </Text>
              <Text style={styles.totalValue}>₹{formatCurrency(result.totalValue)}</Text>
            </View>

            <View style={styles.breakdownContainer}>
              <View style={styles.breakdownItem}>
                <View style={[styles.breakdownBar, { width: `${result.principalPercentage}%`, backgroundColor: '#6B4EFF' }]} />
                <Text style={styles.breakdownText}>
                  {isHindi ? 'मूलधन' : 'Principal'}: {result.principalPercentage}%
                </Text>
              </View>
              <View style={styles.breakdownItem}>
                <View style={[styles.breakdownBar, { width: `${result.returnsPercentage}%`, backgroundColor: '#FFD700' }]} />
                <Text style={styles.breakdownText}>
                  {isHindi ? 'रिटर्न' : 'Returns'}: {result.returnsPercentage}%
                </Text>
              </View>
            </View>
          </View>
        )}
      </Card>

      {/* Info Card */}
      <Card style={styles.infoCard}>
        <View style={styles.infoHeader}>
          <Ionicons name="information-circle" size={24} color="#6B4EFF" />
          <Text style={styles.infoTitle}>
            {isHindi ? 'SIP के फायदे' : 'Benefits of SIP'}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="checkmark-circle" size={18} color="#4CAF50" />
          <Text style={styles.infoText}>
            {isHindi ? 'छोटी राशि से शुरुआत' : 'Start with small amounts'}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="checkmark-circle" size={18} color="#4CAF50" />
          <Text style={styles.infoText}>
            {isHindi ? 'रुपया लागत औसत' : 'Rupee cost averaging'}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="checkmark-circle" size={18} color="#4CAF50" />
          <Text style={styles.infoText}>
            {isHindi ? 'चक्रवृद्धि का लाभ' : 'Power of compounding'}
          </Text>
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
  card: {
    margin: 15,
    marginBottom: 10,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 13,
    color: '#757575',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  slider: {
    marginTop: 10,
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  sliderLabel: {
    fontSize: 11,
    color: '#9E9E9E',
  },
  calculateButton: {
    backgroundColor: '#6B4EFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  calculateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
  },
  resultCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  resultLabel: {
    fontSize: 14,
    color: '#757575',
  },
  resultValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  totalCard: {
    borderBottomWidth: 0,
    marginTop: 5,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6B4EFF',
  },
  breakdownContainer: {
    marginTop: 15,
    gap: 8,
  },
  breakdownItem: {
    gap: 4,
  },
  breakdownBar: {
    height: 8,
    borderRadius: 4,
  },
  breakdownText: {
    fontSize: 12,
    color: '#757575',
  },
  infoCard: {
    margin: 15,
    marginTop: 0,
    marginBottom: 30,
    padding: 15,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#757575',
  },
});

export default SIPCalculator;