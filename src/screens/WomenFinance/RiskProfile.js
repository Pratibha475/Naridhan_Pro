
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card';
import Button from '../../components/Button';

const RiskProfile = ({ language = 'en', navigation }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [riskProfile, setRiskProfile] = useState(null);

  const isHindi = language === 'hi';

  const questions = [
    {
      id: 1,
      question: isHindi
        ? 'यदि आपके निवेश एक महीने में 10% घट जाएं तो आपकी प्रतिक्रिया क्या होगी?'
        : 'How would you react if your investments lost 10% in a month?',
      options: [
        { text: isHindi ? 'सब कुछ बेच दूंगी' : 'Sell everything', score: 1 },
        { text: isHindi ? 'कुछ हिस्सा बेच दूंगी' : 'Sell some', score: 2 },
        { text: isHindi ? 'कुछ नहीं करूंगी, इंतजार करूंगी' : 'Do nothing and wait', score: 3 },
        { text: isHindi ? 'और खरीदूंगी' : 'Buy more', score: 4 },
      ],
    },
    {
      id: 2,
      question: isHindi
        ? 'आपका निवेश क्षितिज क्या है?'
        : 'What is your investment time horizon?',
      options: [
        { text: isHindi ? '1 साल से कम' : 'Less than 1 year', score: 1 },
        { text: isHindi ? '1-3 साल' : '1-3 years', score: 2 },
        { text: isHindi ? '3-5 साल' : '3-5 years', score: 3 },
        { text: isHindi ? '5 साल से अधिक' : 'More than 5 years', score: 4 },
      ],
    },
    {
      id: 3,
      question: isHindi
        ? 'आपका मुख्य निवेश लक्ष्य क्या है?'
        : 'What is your primary investment goal?',
      options: [
        { text: isHindi ? 'पूंजी सुरक्षा' : 'Preserve capital', score: 1 },
        { text: isHindi ? 'नियमित आय' : 'Regular income', score: 2 },
        { text: isHindi ? 'संतुलित विकास' : 'Balanced growth', score: 3 },
        { text: isHindi ? 'अधिकतम विकास' : 'Maximum growth', score: 4 },
      ],
    },
    {
      id: 4,
      question: isHindi
        ? 'आपको निवेश का कितना अनुभव है?'
        : 'How much investment experience do you have?',
      options: [
        { text: isHindi ? 'कोई नहीं' : 'None', score: 1 },
        { text: isHindi ? 'सीमित' : 'Limited', score: 2 },
        { text: isHindi ? 'मध्यम' : 'Moderate', score: 3 },
        { text: isHindi ? 'व्यापक' : 'Extensive', score: 4 },
      ],
    },
    {
      id: 5,
      question: isHindi
        ? 'आप अपनी आय का कितना प्रतिशत निवेश कर सकते हैं?'
        : 'What percentage of your income can you invest?',
      options: [
        { text: isHindi ? '5% से कम' : 'Less than 5%', score: 1 },
        { text: isHindi ? '5-10%' : '5-10%', score: 2 },
        { text: isHindi ? '10-20%' : '10-20%', score: 3 },
        { text: isHindi ? '20% से अधिक' : 'More than 20%', score: 4 },
      ],
    },
  ];

  const handleAnswer = (score) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate risk profile
      const totalScore = newAnswers.reduce((sum, s) => sum + s, 0);
      const avgScore = totalScore / questions.length;

      let profile = 'moderate';
      let description = '';
      let color = '#FFD700';

      if (avgScore <= 2) {
        profile = 'conservative';
        color = '#4CAF50';
        description = isHindi
          ? 'आप रूढ़िवादी निवेशक हैं। आप सुरक्षा को प्राथमिकता देते हैं और कम जोखिम वाले निवेश पसंद करते हैं।'
          : 'You are a conservative investor. You prioritize safety and prefer low-risk investments.';
      } else if (avgScore >= 4) {
        profile = 'aggressive';
        color = '#F44336';
        description = isHindi
          ? 'आप आक्रामक निवेशक हैं। आप उच्च रिटर्न के लिए उच्च जोखिम लेने को तैयार हैं।'
          : 'You are an aggressive investor. You are willing to take high risks for high returns.';
      } else {
        description = isHindi
          ? 'आप संतुलित निवेशक हैं। आप जोखिम और रिटर्न के बीच संतुलन पसंद करते हैं।'
          : 'You are a balanced investor. You prefer a mix of risk and return.';
      }

      setRiskProfile({
        type: profile,
        description,
        color,
        score: avgScore,
      });
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setRiskProfile(null);
  };

  const getPortfolioSuggestions = () => {
    if (!riskProfile) return [];

    const suggestions = {
      conservative: [
        { name: isHindi ? 'फिक्स्ड डिपॉजिट' : 'Fixed Deposits', allocation: 40, return: '6-7%', risk: 'Low' },
        { name: isHindi ? 'डेट फंड' : 'Debt Funds', allocation: 30, return: '7-8%', risk: 'Low' },
        { name: isHindi ? 'संतुलित फंड' : 'Balanced Funds', allocation: 20, return: '9-10%', risk: 'Moderate' },
        { name: isHindi ? 'गोल्ड ETF' : 'Gold ETFs', allocation: 10, return: '8-9%', risk: 'Moderate' },
      ],
      moderate: [
        { name: isHindi ? 'लार्ज कैप फंड' : 'Large Cap Funds', allocation: 35, return: '12-14%', risk: 'Moderate' },
        { name: isHindi ? 'मिड कैप फंड' : 'Mid Cap Funds', allocation: 25, return: '14-16%', risk: 'Moderate-High' },
        { name: isHindi ? 'डेट फंड' : 'Debt Funds', allocation: 20, return: '7-8%', risk: 'Low' },
        { name: isHindi ? 'अंतर्राष्ट्रीय फंड' : 'International Funds', allocation: 20, return: '12-15%', risk: 'Moderate' },
      ],
      aggressive: [
        { name: isHindi ? 'स्मॉल कैप फंड' : 'Small Cap Funds', allocation: 40, return: '15-18%', risk: 'High' },
        { name: isHindi ? 'मिड कैप फंड' : 'Mid Cap Funds', allocation: 30, return: '14-16%', risk: 'High' },
        { name: isHindi ? 'सेक्टोरल फंड' : 'Sectoral Funds', allocation: 20, return: '15-20%', risk: 'Very High' },
        { name: isHindi ? 'अंतर्राष्ट्रीय फंड' : 'International Funds', allocation: 10, return: '12-15%', risk: 'Moderate' },
      ],
    };

    return suggestions[riskProfile.type] || suggestions.moderate;
  };

  if (showResult && riskProfile) {
    const suggestions = getPortfolioSuggestions();

    return (
      <ScrollView style={styles.container}>
        <Card style={styles.resultCard}>
          <View style={[styles.profileBadge, { backgroundColor: riskProfile.color + '20' }]}>
            <Ionicons
              name={riskProfile.type === 'conservative' ? 'shield' : riskProfile.type === 'aggressive' ? 'trending-up' : 'balance-scale'}
              size={50}
              color={riskProfile.color}
            />
          </View>

          <Text style={styles.profileType}>
            {riskProfile.type === 'conservative'
              ? (isHindi ? 'रूढ़िवादी' : 'Conservative')
              : riskProfile.type === 'aggressive'
                ? (isHindi ? 'आक्रामक' : 'Aggressive')
                : (isHindi ? 'संतुलित' : 'Balanced')}
          </Text>

          <Text style={styles.profileDescription}>{riskProfile.description}</Text>

          <View style={styles.scoreContainer}>
            <Text style={styles.scoreLabel}>
              {isHindi ? 'जोखिम स्कोर' : 'Risk Score'}:
            </Text>
            <View style={styles.scoreBar}>
              <View style={[styles.scoreFill, { width: `${(riskProfile.score / 4) * 100}%`, backgroundColor: riskProfile.color }]} />
            </View>
            <Text style={styles.scoreValue}>{riskProfile.score.toFixed(1)}/4</Text>
          </View>

          <Text style={styles.suggestionTitle}>
            {isHindi ? 'अनुशंसित पोर्टफोलियो' : 'Recommended Portfolio'}
          </Text>

          {suggestions.map((item, index) => (
            <View key={index} style={styles.suggestionItem}>
              <View style={styles.suggestionHeader}>
                <Text style={styles.suggestionName}>{item.name}</Text>
                <Text style={styles.suggestionAllocation}>{item.allocation}%</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${item.allocation}%`, backgroundColor: riskProfile.color }]} />
              </View>
              <View style={styles.suggestionDetails}>
                <Text style={styles.suggestionReturn}>
                  {isHindi ? 'अपेक्षित रिटर्न' : 'Exp. Return'}: {item.return}
                </Text>
                <Text style={[
                  styles.suggestionRisk,
                  { color: item.risk === 'Low' ? '#4CAF50' : item.risk === 'Moderate' ? '#FFD700' : '#F44336' }
                ]}>
                  {isHindi ? 'जोखिम' : 'Risk'}: {item.risk}
                </Text>
              </View>
            </View>
          ))}

          <View style={styles.actionButtons}>
            <Button
              title={isHindi ? 'पुनः परीक्षण करें' : 'Retake Quiz'}
              onPress={resetQuiz}
              style={styles.retakeButton}
              textStyle={{ color: '#6B4EFF' }}
            />
            <Button
              title={isHindi ? 'SIP कैलकुलेटर' : 'SIP Calculator'}
              onPress={() => navigation.navigate('SIPCalculator')}
              style={styles.actionButton}
            />
          </View>
        </Card>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.quizCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.questionCount}>
            {isHindi ? 'प्रश्न' : 'Question'} {currentQuestion + 1}/{questions.length}
          </Text>
          <View style={styles.progressDots}>
            {questions.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.progressDot,
                  index <= currentQuestion && styles.progressDotActive,
                ]}
              />
            ))}
          </View>
        </View>

        <Text style={styles.questionText}>
          {questions[currentQuestion].question}
        </Text>

        <View style={styles.optionsContainer}>
          {questions[currentQuestion].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleAnswer(option.score)}
            >
              <Text style={styles.optionText}>{option.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Card>

      <Card style={styles.infoCard}>
        <Text style={styles.infoTitle}>
          {isHindi ? 'जोखिम प्रोफाइल क्या है?' : 'What is Risk Profile?'}
        </Text>
        <Text style={styles.infoText}>
          {isHindi
            ? 'जोखिम प्रोफाइल आपकी निवेश जोखिम लेने की क्षमता और इच्छा को दर्शाता है। यह आपके निवेश निर्णयों को मार्गदर्शित करता है।'
            : 'Risk profile indicates your ability and willingness to take investment risks. It guides your investment decisions.'}
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
  quizCard: {
    margin: 15,
    marginBottom: 10,
    padding: 20,
  },
  progressHeader: {
    marginBottom: 20,
  },
  questionCount: {
    fontSize: 14,
    color: '#6B4EFF',
    fontWeight: '500',
    marginBottom: 10,
  },
  progressDots: {
    flexDirection: 'row',
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
  },
  progressDotActive: {
    backgroundColor: '#6B4EFF',
    width: 16,
  },
  questionText: {
    fontSize: 18,
    color: '#212121',
    lineHeight: 26,
    marginBottom: 20,
  },
  optionsContainer: {
    gap: 10,
  },
  optionButton: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  optionText: {
    fontSize: 16,
    color: '#212121',
  },
  infoCard: {
    margin: 15,
    marginTop: 0,
    marginBottom: 30,
    padding: 15,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#757575',
    lineHeight: 18,
  },
  resultCard: {
    margin: 15,
    marginBottom: 30,
    padding: 20,
    alignItems: 'center',
  },
  profileBadge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileType: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 8,
  },
  profileDescription: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  scoreContainer: {
    width: '100%',
    marginBottom: 20,
  },
  scoreLabel: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 5,
  },
  scoreBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 5,
  },
  scoreFill: {
    height: '100%',
    borderRadius: 4,
  },
  scoreValue: {
    fontSize: 12,
    color: '#757575',
    textAlign: 'right',
  },
  suggestionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 15,
    alignSelf: 'flex-start',
  },
  suggestionItem: {
    width: '100%',
    marginBottom: 15,
  },
  suggestionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  suggestionName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212121',
  },
  suggestionAllocation: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B4EFF',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  suggestionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  suggestionReturn: {
    fontSize: 11,
    color: '#4CAF50',
  },
  suggestionRisk: {
    fontSize: 11,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
    width: '100%',
  },
  actionButton: {
    flex: 1,
  },
  retakeButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});

export default RiskProfile;