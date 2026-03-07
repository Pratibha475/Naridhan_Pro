
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card';

const HelpScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      question: 'How do I add a transaction?',
      answer: 'Go to the Dashboard and tap on "Add Expense" or "Add Income" button. Fill in the details and save.',
      category: 'Transactions',
    },
    {
      id: 2,
      question: 'How does the AI Advisor work?',
      answer: 'The AI Advisor analyzes your spending patterns and provides personalized financial advice and recommendations.',
      category: 'AI Features',
    },
    {
      id: 3,
      question: 'How to set up SIP investments?',
      answer: 'Navigate to Finance → SIP Calculator, enter your desired amount and tenure to calculate and start SIP.',
      category: 'Investments',
    },
    {
      id: 4,
      question: 'Is my data secure?',
      answer: 'Yes, we use industry-standard encryption to protect your data. We never share your personal information.',
      category: 'Security',
    },
    {
      id: 5,
      question: 'How to change my password?',
      answer: 'Go to Profile → Change Password, enter your current password and set a new one.',
      category: 'Account',
    },
    {
      id: 6,
      question: 'How to contact customer support?',
      answer: 'You can reach us via email at support@naridhan.com or call our helpline at 1800-123-4567.',
      category: 'Support',
    },
  ];

  const filteredFaqs = searchQuery
    ? faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : faqs;

  const categories = [...new Set(faqs.map(faq => faq.category))];

  const handleCall = () => {
    Linking.openURL('tel:18001234567');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:support@naridhan.com');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Search Bar */}
      <Card style={styles.searchCard}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#757575" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search help articles..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#757575" />
            </TouchableOpacity>
          ) : null}
        </View>
      </Card>

      {/* Quick Support */}
      <Card style={styles.supportCard}>
        <Text style={styles.sectionTitle}>Quick Support</Text>
        <View style={styles.supportButtons}>
          <TouchableOpacity style={styles.supportButton} onPress={handleCall}>
            <View style={[styles.supportIcon, { backgroundColor: '#4CAF5020' }]}>
              <Ionicons name="call" size={24} color="#4CAF50" />
            </View>
            <Text style={styles.supportLabel}>Call Us</Text>
            <Text style={styles.supportDetail}>1800-123-4567</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.supportButton} onPress={handleEmail}>
            <View style={[styles.supportIcon, { backgroundColor: '#2196F320' }]}>
              <Ionicons name="mail" size={24} color="#2196F3" />
            </View>
            <Text style={styles.supportLabel}>Email Us</Text>
            <Text style={styles.supportDetail}>support@naridhan.com</Text>
          </TouchableOpacity>
        </View>
      </Card>

      {/* FAQs by Category */}
      {categories.map((category, catIndex) => (
        <Card key={catIndex} style={styles.faqCard}>
          <Text style={styles.categoryTitle}>{category}</Text>
          {filteredFaqs
            .filter(faq => faq.category === category)
            .map((faq, index) => (
              <View key={faq.id}>
                <TouchableOpacity
                  style={styles.faqItem}
                  onPress={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                >
                  <View style={styles.faqQuestion}>
                    <Text style={styles.questionText}>{faq.question}</Text>
                    <Ionicons
                      name={expandedFaq === faq.id ? 'chevron-up' : 'chevron-down'}
                      size={20}
                      color="#757575"
                    />
                  </View>
                  {expandedFaq === faq.id && (
                    <Text style={styles.answerText}>{faq.answer}</Text>
                  )}
                </TouchableOpacity>
                {index < filteredFaqs.filter(f => f.category === category).length - 1 && (
                  <View style={styles.divider} />
                )}
              </View>
            ))}
        </Card>
      ))}

      {/* Still Need Help */}
      <Card style={styles.helpCard}>
        <Ionicons name="help-buoy" size={40} color="#6B4EFF" />
        <Text style={styles.helpTitle}>Still Need Help?</Text>
        <Text style={styles.helpText}>
          Our support team is available 24/7 to assist you with any questions.
        </Text>
        <TouchableOpacity style={styles.chatButton}>
          <Ionicons name="chatbubbles-outline" size={20} color="#FFFFFF" />
          <Text style={styles.chatButtonText}>Start Live Chat</Text>
        </TouchableOpacity>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  searchCard: {
    margin: 15,
    marginBottom: 10,
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 15,
  },
  supportCard: {
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
  supportButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  supportButton: {
    flex: 1,
    alignItems: 'center',
  },
  supportIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  supportLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 2,
  },
  supportDetail: {
    fontSize: 11,
    color: '#757575',
    textAlign: 'center',
  },
  faqCard: {
    margin: 15,
    marginTop: 0,
    marginBottom: 10,
    padding: 15,
  },
  categoryTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B4EFF',
    marginBottom: 10,
  },
  faqItem: {
    paddingVertical: 12,
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionText: {
    flex: 1,
    fontSize: 14,
    color: '#212121',
    fontWeight: '500',
    marginRight: 10,
  },
  answerText: {
    fontSize: 13,
    color: '#757575',
    lineHeight: 18,
    marginTop: 8,
    paddingLeft: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },
  helpCard: {
    margin: 15,
    marginTop: 5,
    marginBottom: 30,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#F0E6FF',
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginTop: 10,
    marginBottom: 5,
  },
  helpText: {
    fontSize: 13,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 18,
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6B4EFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    gap: 8,
  },
  chatButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default HelpScreen;