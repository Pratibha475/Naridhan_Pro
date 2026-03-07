
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import Card from '../../components/Card';

const LiteracyCards = ({ language = 'en' }) => {
  const [speaking, setSpeaking] = useState(null);
  const isHindi = language === 'hi';

  const literacyData = [
    {
      id: '1',
      title: isHindi ? 'बजट क्या है?' : 'What is Budgeting?',
      titleHi: 'बजट क्या है?',
      content: isHindi
        ? 'बजट आपके पैसे खर्च करने की योजना है। यह आपको आय ट्रैक करने, खर्चों को नियंत्रित करने और लक्ष्यों के लिए बचत करने में मदद करता है।'
        : 'Budgeting is a plan for your money. It helps you track income, control expenses, and save for goals.',
      icon: 'wallet',
      color: '#6B4EFF',
      tips: isHindi
        ? ['50-30-20 नियम का पालन करें', 'हर खर्च ट्रैक करें', 'बजट की मासिक समीक्षा करें']
        : ['Follow 50-30-20 rule', 'Track every expense', 'Review budget monthly'],
    },
    {
      id: '2',
      title: isHindi ? 'आपातकालीन फंड' : 'Emergency Fund',
      titleHi: 'आपातकालीन फंड',
      content: isHindi
        ? 'आपातकालीन फंड अप्रत्याशित खर्चों के लिए अलग रखा गया पैसा है जैसे चिकित्सा आपातकाल, नौकरी छूटना या तत्काल मरम्मत।'
        : 'An emergency fund is money saved for unexpected expenses like medical emergencies, job loss, or urgent repairs.',
      icon: 'shield',
      color: '#4CAF50',
      tips: isHindi
        ? ['3-6 महीने के खर्च बचाएं', 'अलग बचत खाते में रखें', 'केवल वास्तविक आपात स्थिति के लिए उपयोग करें']
        : ['Save 3-6 months of expenses', 'Keep in separate account', 'Use only for real emergencies'],
    },
    {
      id: '3',
      title: isHindi ? 'चक्रवृद्धि ब्याज' : 'Power of Compounding',
      titleHi: 'चक्रवृद्धि ब्याज की शक्ति',
      content: isHindi
        ? 'चक्रवृद्धि का मतलब है आपके रिटर्न पर रिटर्न कमाना। समय के साथ अपने पैसे को तेजी से बढ़ाने के लिए जल्दी शुरुआत करें।'
        : 'Compounding means earning returns on your returns. Start early to let your money grow exponentially.',
      icon: 'trending-up',
      color: '#FFD700',
      tips: isHindi
        ? ['जितनी जल्दी हो सके निवेश शुरू करें', 'लंबी अवधि के लिए निवेशित रहें', 'रिटर्न को फिर से निवेश करें']
        : ['Start investing early', 'Stay invested long term', 'Reinvest your returns'],
    },
    {
      id: '4',
      title: isHindi ? 'विविधीकरण' : 'Diversification',
      titleHi: 'विविधीकरण',
      content: isHindi
        ? 'सभी अंडे एक टोकरी में न रखें। जोखिम कम करने के लिए विभिन्न परिसंपत्तियों में निवेश फैलाएं।'
        : "Don't put all eggs in one basket. Spread investments across different assets to reduce risk.",
      icon: 'pie-chart',
      color: '#FF6B6B',
      tips: isHindi
        ? ['शेयर, बॉन्ड और सोना मिलाएं', 'विभिन्न क्षेत्रों में निवेश करें', 'सालाना पोर्टफोलियो पुनर्संतुलित करें']
        : ['Mix stocks, bonds, gold', 'Invest in different sectors', 'Rebalance annually'],
    },
  ];

  const speakContent = (item) => {
    if (speaking === item.id) {
      Speech.stop();
      setSpeaking(null);
    } else {
      if (speaking) Speech.stop();
      const textToSpeak = isHindi ? `${item.titleHi}. ${item.content}` : `${item.title}. ${item.content}`;
      Speech.speak(textToSpeak, {
        language: isHindi ? 'hi-IN' : 'en-US',
        pitch: 1,
        rate: 0.8,
      });
      setSpeaking(item.id);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {literacyData.map((item) => (
        <Card key={item.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
              <Ionicons name={item.icon} size={30} color={item.color} />
            </View>
            <TouchableOpacity
              style={styles.speakButton}
              onPress={() => speakContent(item)}
            >
              <Ionicons
                name={speaking === item.id ? 'stop-circle' : 'volume-high'}
                size={28}
                color={item.color}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.content}>{item.content}</Text>

          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>
              {isHindi ? 'सुझाव:' : 'Tips:'}
            </Text>
            {item.tips.map((tip, index) => (
              <View key={index} style={styles.tipItem}>
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.readMore}>
            <Text style={styles.readMoreText}>
              {isHindi ? 'और पढ़ें →' : 'Read More →'}
            </Text>
          </TouchableOpacity>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  card: {
    marginBottom: 15,
    padding: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  speakButton: {
    padding: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 10,
  },
  content: {
    fontSize: 14,
    color: '#757575',
    lineHeight: 20,
    marginBottom: 15,
  },
  tipsContainer: {
    backgroundColor: '#F8F8F8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 8,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    color: '#757575',
  },
  readMore: {
    alignSelf: 'flex-start',
  },
  readMoreText: {
    color: '#6B4EFF',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default LiteracyCards;