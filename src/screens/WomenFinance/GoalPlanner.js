
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

const GoalPlanner = ({ language = 'en', navigation }) => {
  const [goalAmount, setGoalAmount] = useState('1000000');
  const [years, setYears] = useState('5');
  const [rate, setRate] = useState('12');
  const [result, setResult] = useState(null);
  const [selectedGoal, setSelectedGoal] = useState('retirement');

  const isHindi = language === 'hi';

  const goals = [
    { id: 'retirement', label: isHindi ? 'रिटायरमेंट' : 'Retirement', icon: 'bed', color: '#6B4EFF' },
    { id: 'education', label: isHindi ? 'शिक्षा' : 'Education', icon: 'school', color: '#4CAF50' },
    { id: 'home', label: isHindi ? 'घर' : 'Home', icon: 'home', color: '#FF9800' },
    { id: 'travel', label: isHindi ? 'यात्रा' : 'Travel', icon: 'airplane', color: '#F44336' },
    { id: 'wedding', label: isHindi ? 'शादी' : 'Wedding', icon: 'heart', color: '#E91E63' },
    { id: 'custom', label: isHindi ? 'अन्य' : 'Other', icon: 'flag', color: '#9C27B0' },
  ];

  const calculateGoal = () => {
    const target = parseFloat(goalAmount) || 0;
    const t = parseFloat(years) || 0;
    const r = parseFloat(rate) || 0;

    if (target <= 0 || t <= 0 || r <= 0) {
      Alert.alert(
        isHindi ? 'त्रुटि' : 'Error',
        isHindi ? 'कृपया सभी मान सही भरें' : 'Please enter valid values'
      );
      return;
    }

    const n = t * 12; // months
    const i = r / 100 / 12; // monthly rate

    // Monthly SIP needed = FV * i / ((1 + i) * ((1 + i)^n - 1))
    const monthlyInvestment = target * i / ((1 + i) * (Math.pow(1 + i, n) - 1));
    const totalInvestment = monthlyInvestment * n;
    const estimatedReturns = target - totalInvestment;

    setResult({
      monthlyInvestment: Math.round(monthlyInvestment),
      totalInvestment: Math.round(totalInvestment),
      estimatedReturns: Math.round(estimatedReturns),
      targetAmount: target,
    });
  };

  const formatCurrency = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const getGoalIcon = () => {
    const goal = goals.find(g => g.id === selectedGoal);
    return goal || goals[0];
  };

  const selectedGoalData = getGoalIcon();

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>
          {isHindi ? 'लक्ष्य योजनाकार' : 'Goal Planner'}
        </Text>
        <Text style={styles.subtitle}>
          {isHindi
            ? 'अपने वित्तीय लक्ष्यों को प्राप्त करने की योजना बनाएं'
            : 'Plan how to achieve your financial goals'}
        </Text>

        {/* Goal Selection */}
        <Text style={styles.sectionLabel}>
          {isHindi ? 'अपना लक्ष्य चुनें' : 'Select your goal'}
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.goalsScroll}>
          {goals.map((goal) => (
            <TouchableOpacity
              key={goal.id}
              style={[
                styles.goalItem,
                selectedGoal === goal.id && { borderColor: goal.color, borderWidth: 2 }
              ]}
              onPress={() => setSelectedGoal(goal.id)}
            >
              <View style={[styles.goalIcon, { backgroundColor: goal.color + '20' }]}>
                <Ionicons name={goal.icon} size={24} color={goal.color} />
              </View>
              <Text style={styles.goalLabel}>{goal.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Goal Amount */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            {isHindi ? 'लक्ष्य राशि (₹)' : 'Goal Amount (₹)'}
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={goalAmount}
              onChangeText={setGoalAmount}
              keyboardType="numeric"
              placeholder="1000000"
            />
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
              placeholder="5"
            />
          </View>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={30}
            step={1}
            value={parseFloat(years) || 5}
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

        <TouchableOpacity style={styles.calculateButton} onPress={calculateGoal}>
          <Text style={styles.calculateButtonText}>
            {isHindi ? 'गणना करें' : 'Calculate'}
          </Text>
        </TouchableOpacity>

        {result && (
          <View style={styles.resultContainer}>
            <View style={styles.goalHeader}>
              <View style={[styles.resultGoalIcon, { backgroundColor: selectedGoalData.color + '20' }]}>
                <Ionicons name={selectedGoalData.icon} size={30} color={selectedGoalData.color} />
              </View>
              <View>
                <Text style={styles.resultGoalLabel}>{selectedGoalData.label}</Text>
                <Text style={styles.resultGoalAmount}>₹{formatCurrency(result.targetAmount)}</Text>
              </View>
            </View>

            <View style={styles.resultCard}>
              <Text style={styles.resultLabel}>
                {isHindi ? 'मासिक निवेश आवश्यक' : 'Monthly Investment Needed'}
              </Text>
              <Text style={styles.monthlyValue}>₹{formatCurrency(result.monthlyInvestment)}</Text>
            </View>

            <View style={styles.resultRow}>
              <View style={styles.resultItem}>
                <Text style={styles.resultItemLabel}>
                  {isHindi ? 'कुल निवेश' : 'Total Investment'}
                </Text>
                <Text style={styles.resultItemValue}>₹{formatCurrency(result.totalInvestment)}</Text>
              </View>
              <View style={styles.resultItem}>
                <Text style={styles.resultItemLabel}>
                  {isHindi ? 'अनुमानित रिटर्न' : 'Est. Returns'}
                </Text>
                <Text style={[styles.resultItemValue, { color: '#4CAF50' }]}>
                  +₹{formatCurrency(result.estimatedReturns)}
                </Text>
              </View>
            </View>

            <View style={styles.progressSection}>
              <Text style={styles.progressLabel}>
                {isHindi ? 'प्रगति' : 'Progress'}
              </Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '0%' }]} />
              </View>
              <Text style={styles.progressText}>
                {isHindi ? 'अभी शुरू करें' : 'Start now to achieve your goal'}
              </Text>
            </View>
          </View>
        )}
      </Card>

      {/* Tips Card */}
      <Card style={styles.tipsCard}>
        <View style={styles.tipsHeader}>
          <Ionicons name="bulb" size={24} color="#FFD700" />
          <Text style={styles.tipsTitle}>
            {isHindi ? 'लक्ष्य योजना टिप्स' : 'Goal Planning Tips'}
          </Text>
        </View>
        <View style={styles.tipItem}>
          <Text style={styles.tipNumber}>1.</Text>
          <Text style={styles.tipText}>
            {isHindi
              ? 'अपने लक्ष्यों को स्पष्ट रूप से परिभाषित करें'
              : 'Define your goals clearly with specific amounts'}
          </Text>
        </View>
        <View style={styles.tipItem}>
          <Text style={styles.tipNumber}>2.</Text>
          <Text style={styles.tipText}>
            {isHindi
              ? 'छोटे लक्ष्यों से शुरुआत करें'
              : 'Break down large goals into smaller milestones'}
          </Text>
        </View>
        <View style={styles.tipItem}>
          <Text style={styles.tipNumber}>3.</Text>
          <Text style={styles.tipText}>
            {isHindi
              ? 'नियमित रूप से प्रगति ट्रैक करें'
              : 'Track your progress regularly'}
          </Text>
        </View>
        <View style={styles.tipItem}>
          <Text style={styles.tipNumber}>4.</Text>
          <Text style={styles.tipText}>
            {isHindi
              ? 'बदलती परिस्थितियों के अनुसार योजना अपडेट करें'
              : 'Adjust your plan as circumstances change'}
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
  sectionLabel: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 10,
  },
  goalsScroll: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  goalItem: {
    alignItems: 'center',
    marginRight: 15,
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    minWidth: 70,
  },
  goalIcon: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  goalLabel: {
    fontSize: 11,
    color: '#757575',
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
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  input: {
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
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginBottom: 20,
  },
  resultGoalIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultGoalLabel: {
    fontSize: 14,
    color: '#757575',
  },
  resultGoalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
    marginTop: 2,
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 13,
    color: '#757575',
    marginBottom: 5,
  },
  monthlyValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6B4EFF',
  },
  resultRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  resultItem: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
  },
  resultItemLabel: {
    fontSize: 11,
    color: '#757575',
    marginBottom: 4,
  },
  resultItemValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
  },
  progressSection: {
    marginTop: 5,
  },
  progressLabel: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 5,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6B4EFF',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 11,
    color: '#9E9E9E',
    textAlign: 'right',
  },
  tipsCard: {
    margin: 15,
    marginTop: 0,
    marginBottom: 30,
    padding: 15,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 15,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  tipItem: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  tipNumber: {
    fontSize: 13,
    color: '#6B4EFF',
    fontWeight: '600',
    width: 20,
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    color: '#757575',
    lineHeight: 18,
  },
});

export default GoalPlanner;