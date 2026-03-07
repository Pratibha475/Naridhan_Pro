
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import Card from '../../components/Card';

const AIAdvisor = ({ language = 'en', navigation }) => {
  const [loading, setLoading] = useState(true);
  const [advice, setAdvice] = useState(null);
  const [speaking, setSpeaking] = useState(false);

  const isHindi = language === 'hi';

  useEffect(() => {
    // Simulate AI analysis
    setTimeout(() => {
      generateAdvice();
      setLoading(false);
    }, 1500);
  }, []);

  const generateAdvice = () => {
    // Mock data for demonstration
    const income = 50000;
    const expenses = 30000;
    const savings = 20000;

    const savingsRate = income > 0 ? (savings / income) * 100 : 0;
    const expenseRatio = income > 0 ? (expenses / income) * 100 : 0;

    let healthScore = 50;
    if (savingsRate >= 20) healthScore += 20;
    else if (savingsRate >= 10) healthScore += 10;
    if (expenseRatio <= 50) healthScore += 20;
    else if (expenseRatio <= 70) healthScore += 10;

    const insights = [];
    const recommendations = [];

    // Generate insights
    if (savingsRate < 10) {
      insights.push({
        type: 'warning',
        icon: 'warning',
        message: isHindi
          ? 'आपकी बचत दर बहुत कम है। 20% बचत का लक्ष्य रखें।'
          : 'Your savings rate is very low. Aim for 20% savings.',
      });
    } else if (savingsRate > 20) {
      insights.push({
        type: 'success',
        icon: 'checkmark-circle',
        message: isHindi
          ? 'बहुत अच्छा! आपकी बचत दर उत्कृष्ट है।'
          : 'Excellent! Your savings rate is outstanding.',
      });
    }

    if (expenseRatio > 70) {
      insights.push({
        type: 'warning',
        icon: 'warning',
        message: isHindi
          ? 'आपके खर्च आपकी आय का 70% से अधिक हैं। खर्च कम करने पर विचार करें।'
          : 'Your expenses are over 70% of income. Consider reducing expenses.',
      });
    }

    // Generate recommendations
    if (savings < expenses * 3) {
      recommendations.push({
        title: isHindi ? 'आपातकालीन फंड बनाएं' : 'Build Emergency Fund',
        description: isHindi
          ? '6 महीने के खर्च के बराबर आपातकालीन फंड बनाएं'
          : 'Create an emergency fund equal to 6 months of expenses',
        action: isHindi ? 'अभी शुरू करें' : 'Start Now',
        icon: 'shield',
        color: '#F44336',
      });
    }

    if (savingsRate > 10) {
      recommendations.push({
        title: isHindi ? 'SIP निवेश शुरू करें' : 'Start SIP Investment',
        description: isHindi
          ? 'अपने सर्प्लस को म्यूचुअल फंड में निवेश करें'
          : 'Invest your surplus in mutual funds through SIP',
        action: isHindi ? 'SIP कैलकुलेटर' : 'SIP Calculator',
        icon: 'trending-up',
        color: '#6B4EFF',
      });
    }

    recommendations.push({
      title: isHindi ? 'टैक्स प्लानिंग' : 'Tax Planning',
      description: isHindi
        ? 'सेक्शन 80C के तहत टैक्स बचाने के विकल्प देखें'
        : 'Explore tax saving options under Section 80C',
      action: isHindi ? 'जानें' : 'Learn More',
      icon: 'document-text',
      color: '#4CAF50',
    });

    setAdvice({
      healthScore: Math.min(healthScore, 100),
      summary: isHindi
        ? `आपका वित्तीय स्वास्थ्य स्कोर ${Math.min(healthScore, 100)} है। ${healthScore >= 70 ? 'बहुत अच्छा!' :
          healthScore >= 50 ? 'ठीक है, सुधार की गुंजाइश है।' :
            'सुधार की आवश्यकता है।'
        }`
        : `Your financial health score is ${Math.min(healthScore, 100)}. ${healthScore >= 70 ? 'Great job!' :
          healthScore >= 50 ? 'Doing okay, room for improvement.' :
            'Needs improvement.'
        }`,
      insights,
      recommendations,
      savingsRate: savingsRate.toFixed(1),
      expenseRatio: expenseRatio.toFixed(1),
    });
  };

  const speakAdvice = () => {
    if (!advice) return;

    if (speaking) {
      Speech.stop();
      setSpeaking(false);
    } else {
      setSpeaking(true);
      const textToSpeak = `${advice.summary}. ${advice.insights.map(i => i.message).join('. ')
        }`;

      Speech.speak(textToSpeak, {
        language: isHindi ? 'hi-IN' : 'en-US',
        pitch: 1,
        rate: 0.8,
        onDone: () => setSpeaking(false),
        onError: () => setSpeaking(false),
      });
    }
  };

  const getHealthColor = (score) => {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#FFD700';
    if (score >= 40) return '#FF9800';
    return '#F44336';
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6B4EFF" />
        <Text style={styles.loadingText}>
          {isHindi ? 'AI विश्लेषण कर रहा है...' : 'AI is analyzing...'}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header with Voice */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>
            {isHindi ? 'AI वित्तीय सलाहकार' : 'AI Financial Advisor'}
          </Text>
          <Text style={styles.headerSubtitle}>
            {isHindi ? 'आपके लिए व्यक्तिगत सुझाव' : 'Personalized insights for you'}
          </Text>
        </View>
        <TouchableOpacity style={styles.speakButton} onPress={speakAdvice}>
          <Ionicons
            name={speaking ? 'stop-circle' : 'volume-high'}
            size={32}
            color="#6B4EFF"
          />
        </TouchableOpacity>
      </View>

      {/* Health Score */}
      <Card style={styles.scoreCard}>
        <Text style={styles.cardTitle}>
          {isHindi ? 'वित्तीय स्वास्थ्य स्कोर' : 'Financial Health Score'}
        </Text>
        <View style={styles.scoreContainer}>
          <View style={[styles.scoreCircle, { borderColor: getHealthColor(advice.healthScore) }]}>
            <Text style={styles.scoreText}>{advice.healthScore}</Text>
          </View>
          <View style={styles.scoreDetails}>
            <View style={styles.scoreRow}>
              <Text style={styles.scoreLabel}>
                {isHindi ? 'बचत दर' : 'Savings Rate'}:
              </Text>
              <Text style={styles.scoreValue}>{advice.savingsRate}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${advice.savingsRate}%` }]} />
            </View>

            <View style={styles.scoreRow}>
              <Text style={styles.scoreLabel}>
                {isHindi ? 'खर्च अनुपात' : 'Expense Ratio'}:
              </Text>
              <Text style={styles.scoreValue}>{advice.expenseRatio}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${advice.expenseRatio}%`, backgroundColor: '#F44336' }]} />
            </View>
          </View>
        </View>
        <Text style={styles.summaryText}>{advice.summary}</Text>
      </Card>

      {/* Insights */}
      <Card style={styles.insightsCard}>
        <Text style={styles.cardTitle}>
          {isHindi ? 'महत्वपूर्ण जानकारी' : 'Key Insights'}
        </Text>
        {advice.insights.length > 0 ? (
          advice.insights.map((insight, index) => (
            <View key={index} style={styles.insightItem}>
              <Ionicons
                name={insight.icon}
                size={24}
                color={insight.type === 'success' ? '#4CAF50' : '#F44336'}
              />
              <Text style={styles.insightText}>{insight.message}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>
            {isHindi ? 'कोई महत्वपूर्ण जानकारी नहीं' : 'No significant insights'}
          </Text>
        )}
      </Card>

      {/* Recommendations */}
      <Card style={styles.recommendationsCard}>
        <Text style={styles.cardTitle}>
          {isHindi ? 'सिफारिशें' : 'Recommendations'}
        </Text>
        {advice.recommendations.map((rec, index) => (
          <TouchableOpacity
            key={index}
            style={styles.recommendationItem}
            onPress={() => {
              if (rec.title.includes('SIP')) {
                navigation.navigate('SIPCalculator');
              } else if (rec.title.includes('Emergency')) {
                navigation.navigate('EmergencyFund');
              }
            }}
          >
            <View style={[styles.recommendationIcon, { backgroundColor: rec.color + '20' }]}>
              <Ionicons name={rec.icon} size={24} color={rec.color} />
            </View>
            <View style={styles.recommendationContent}>
              <Text style={styles.recommendationTitle}>{rec.title}</Text>
              <Text style={styles.recommendationDesc}>{rec.description}</Text>
              <Text style={styles.recommendationAction}>{rec.action} →</Text>
            </View>
          </TouchableOpacity>
        ))}
      </Card>

      {/* Quick Tips */}
      <Card style={styles.tipsCard}>
        <Text style={styles.cardTitle}>
          {isHindi ? 'त्वरित सुझाव' : 'Quick Tips'}
        </Text>
        <View style={styles.tipItem}>
          <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
          <Text style={styles.tipText}>
            {isHindi
              ? '50-30-20 नियम का पालन करें: 50% जरूरतें, 30% इच्छाएं, 20% बचत'
              : 'Follow 50-30-20 rule: 50% needs, 30% wants, 20% savings'}
          </Text>
        </View>
        <View style={styles.tipItem}>
          <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
          <Text style={styles.tipText}>
            {isHindi
              ? 'हर महीने अपने खर्च की समीक्षा करें'
              : 'Review your expenses every month'}
          </Text>
        </View>
        <View style={styles.tipItem}>
          <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
          <Text style={styles.tipText}>
            {isHindi
              ? 'जल्दी निवेश शुरू करें, चक्रवृद्धि का लाभ उठाएं'
              : 'Start investing early to benefit from compounding'}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#757575',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#757575',
    marginTop: 2,
  },
  speakButton: {
    padding: 8,
  },
  scoreCard: {
    margin: 15,
    marginBottom: 10,
    padding: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 15,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 15,
  },
  scoreCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212121',
  },
  scoreDetails: {
    flex: 1,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  scoreLabel: {
    fontSize: 12,
    color: '#757575',
  },
  scoreValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#212121',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#F0F0F0',
    borderRadius: 2,
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6B4EFF',
    borderRadius: 2,
  },
  summaryText: {
    fontSize: 14,
    color: '#212121',
    lineHeight: 20,
    fontStyle: 'italic',
    backgroundColor: '#F8F8F8',
    padding: 12,
    borderRadius: 8,
  },
  insightsCard: {
    margin: 15,
    marginTop: 0,
    marginBottom: 10,
    padding: 15,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  insightText: {
    flex: 1,
    fontSize: 13,
    color: '#212121',
    lineHeight: 18,
  },
  noDataText: {
    fontSize: 13,
    color: '#757575',
    textAlign: 'center',
    padding: 20,
  },
  recommendationsCard: {
    margin: 15,
    marginTop: 0,
    marginBottom: 10,
    padding: 15,
  },
  recommendationItem: {
    flexDirection: 'row',
    gap: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  recommendationIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendationContent: {
    flex: 1,
  },
  recommendationTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
  },
  recommendationDesc: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 6,
    lineHeight: 16,
  },
  recommendationAction: {
    fontSize: 12,
    color: '#6B4EFF',
    fontWeight: '500',
  },
  tipsCard: {
    margin: 15,
    marginTop: 0,
    marginBottom: 30,
    padding: 15,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    color: '#757575',
    lineHeight: 18,
  },
});

export default AIAdvisor;