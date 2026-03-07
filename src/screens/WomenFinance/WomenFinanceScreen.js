
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import Card from '../../components/Card';

const screenWidth = Dimensions.get('window').width;

export default function WomenFinanceScreen({ navigation }) {
  const [activeMainTab, setActiveMainTab] = useState('home');
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const toggleLanguage = () => {
    setSelectedLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const isHindi = selectedLanguage === 'hi';

  // Mock data for charts
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      data: [20000, 25000, 22000, 28000, 30000, 35000],
    }],
  };

  const renderHome = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* Welcome Card */}
      <Card style={styles.welcomeCard}>
        <Text style={styles.welcomeTitle}>
          {isHindi ? 'नमस्ते!' : 'Hello!'}
        </Text>
        <Text style={styles.welcomeSubtitle}>
          {isHindi
            ? 'आपकी वित्तीय यात्रा में आपका स्वागत है'
            : 'Welcome to your financial journey'}
        </Text>
      </Card>

      {/* Portfolio Overview */}
      <Card style={styles.portfolioCard}>
        <Text style={styles.sectionTitle}>
          {isHindi ? 'पोर्टफोलियो अवलोकन' : 'Portfolio Overview'}
        </Text>
        <View style={styles.portfolioValue}>
          <Text style={styles.valueLabel}>
            {isHindi ? 'कुल मूल्य' : 'Total Value'}
          </Text>
          <Text style={styles.valueAmount}>₹2,45,000</Text>
          <View style={styles.returnBadge}>
            <Ionicons name="trending-up" size={16} color="#4CAF50" />
            <Text style={styles.returnText}>+12.5%</Text>
          </View>
        </View>
        <LineChart
          data={chartData}
          width={screenWidth - 70}
          height={180}
          chartConfig={{
            backgroundColor: '#FFFFFF',
            backgroundGradientFrom: '#FFFFFF',
            backgroundGradientTo: '#FFFFFF',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(107, 78, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
          }}
          bezier
          style={styles.chart}
        />
      </Card>

      {/* Quick Stats Row */}
      <View style={styles.statsRow}>
        <TouchableOpacity
          style={styles.statCard}
          onPress={() => navigation.navigate('SIPCalculator')}
        >
          <Ionicons name="calculator" size={28} color="#6B4EFF" />
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>
            {isHindi ? 'सक्रिय SIP' : 'Active SIPs'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.statCard}
          onPress={() => navigation.navigate('EmergencyFund')}
        >
          <Ionicons name="shield" size={28} color="#4CAF50" />
          <Text style={styles.statNumber}>₹25K</Text>
          <Text style={styles.statLabel}>
            {isHindi ? 'आपात फंड' : 'Emergency Fund'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.statCard}
          onPress={() => navigation.navigate('GoalPlanner')}
        >
          <Ionicons name="flag" size={28} color="#FFD700" />
          <Text style={styles.statNumber}>2</Text>
          <Text style={styles.statLabel}>
            {isHindi ? 'लक्ष्य' : 'Goals'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Finance Features */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          {isHindi ? 'वित्तीय उपकरण' : 'Financial Tools'}
        </Text>
        <TouchableOpacity onPress={() => setActiveMainTab('finance')}>
          <Text style={styles.seeAllText}>
            {isHindi ? 'सभी देखें' : 'See All'} →
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        <TouchableOpacity
          style={styles.featureCard}
          onPress={() => navigation.navigate('AIAdvisor')}
        >
          <View style={[styles.featureIcon, { backgroundColor: '#6B4EFF20' }]}>
            <Ionicons name="bulb" size={30} color="#6B4EFF" />
          </View>
          <Text style={styles.featureTitle}>
            {isHindi ? 'AI सलाहकार' : 'AI Advisor'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.featureCard}
          onPress={() => navigation.navigate('SIPCalculator')}
        >
          <View style={[styles.featureIcon, { backgroundColor: '#4CAF5020' }]}>
            <Ionicons name="calculator" size={30} color="#4CAF50" />
          </View>
          <Text style={styles.featureTitle}>
            {isHindi ? 'SIP कैलकुलेटर' : 'SIP Calculator'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.featureCard}
          onPress={() => navigation.navigate('GoalPlanner')}
        >
          <View style={[styles.featureIcon, { backgroundColor: '#FFD70020' }]}>
            <Ionicons name="flag" size={30} color="#FFD700" />
          </View>
          <Text style={styles.featureTitle}>
            {isHindi ? 'लक्ष्य योजना' : 'Goal Planner'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.featureCard}
          onPress={() => navigation.navigate('RiskProfile')}
        >
          <View style={[styles.featureIcon, { backgroundColor: '#F4433620' }]}>
            <Ionicons name="speedometer" size={30} color="#F44336" />
          </View>
          <Text style={styles.featureTitle}>
            {isHindi ? 'जोखिम प्रोफाइल' : 'Risk Profile'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Women Features */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          {isHindi ? 'महिला संसाधन' : 'Women Resources'}
        </Text>
        <TouchableOpacity onPress={() => setActiveMainTab('women')}>
          <Text style={styles.seeAllText}>
            {isHindi ? 'सभी देखें' : 'See All'} →
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        <TouchableOpacity
          style={styles.featureCard}
          onPress={() => navigation.navigate('EmergencyFund')}
        >
          <View style={[styles.featureIcon, { backgroundColor: '#F4433620' }]}>
            <Ionicons name="shield" size={30} color="#F44336" />
          </View>
          <Text style={styles.featureTitle}>
            {isHindi ? 'आपातकालीन फंड' : 'Emergency Fund'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.featureCard}
          onPress={() => navigation.navigate('LearningModules')}
        >
          <View style={[styles.featureIcon, { backgroundColor: '#6B4EFF20' }]}>
            <Ionicons name="school" size={30} color="#6B4EFF" />
          </View>
          <Text style={styles.featureTitle}>
            {isHindi ? 'सीखना' : 'Learning'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.featureCard}
          onPress={() => navigation.navigate('LiteracyCards')}
        >
          <View style={[styles.featureIcon, { backgroundColor: '#FFD70020' }]}>
            <Ionicons name="book" size={30} color="#FFD700" />
          </View>
          <Text style={styles.featureTitle}>
            {isHindi ? 'साक्षरता' : 'Literacy'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.featureCard}
          onPress={() => navigation.navigate('WomenCommunity')}
        >
          <View style={[styles.featureIcon, { backgroundColor: '#4CAF5020' }]}>
            <Ionicons name="people" size={30} color="#4CAF50" />
          </View>
          <Text style={styles.featureTitle}>
            {isHindi ? 'समुदाय' : 'Community'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Success Stories Preview */}
      <Card style={styles.storiesCard}>
        <Text style={styles.cardTitle}>
          {isHindi ? 'सफलता की कहानियां' : 'Success Stories'}
        </Text>
        <TouchableOpacity
          style={styles.storyItem}
          onPress={() => navigation.navigate('StoryDetail', { storyId: '1' })}
        >
          <View style={styles.storyAvatar}>
            <Text style={styles.avatarText}>P</Text>
          </View>
          <View style={styles.storyContent}>
            <Text style={styles.storyName}>Priya Sharma</Text>
            <Text style={styles.storyPreview}>
              {isHindi
                ? '₹5 लाख बचाए और अपना व्यवसाय शुरू किया...'
                : 'Saved ₹5 Lakhs and started her own business...'}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.storyItem}
          onPress={() => navigation.navigate('StoryDetail', { storyId: '2' })}
        >
          <View style={styles.storyAvatar}>
            <Text style={styles.avatarText}>R</Text>
          </View>
          <View style={styles.storyContent}>
            <Text style={styles.storyName}>Ritu Mehta</Text>
            <Text style={styles.storyPreview}>
              {isHindi
                ? 'SIP से 18% रिटर्न कमाया...'
                : 'Earned 18% returns through SIP investments...'}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => navigation.navigate('StoryDetail')}
        >
          <Text style={styles.viewAllText}>
            {isHindi ? 'सभी कहानियां देखें' : 'View All Stories'} →
          </Text>
        </TouchableOpacity>
      </Card>

      {/* Emergency Contact Quick Access */}
      <Card style={styles.emergencyCard}>
        <Text style={styles.cardTitle}>
          {isHindi ? 'आपातकालीन संपर्क' : 'Emergency Contacts'}
        </Text>
        <View style={styles.contactRow}>
          <TouchableOpacity style={styles.contactButton}>
            <Ionicons name="call" size={24} color="#F44336" />
            <Text style={styles.contactNumber}>1091</Text>
            <Text style={styles.contactLabel}>
              {isHindi ? 'महिला हेल्पलाइन' : 'Women Helpline'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactButton}>
            <Ionicons name="call" size={24} color="#F44336" />
            <Text style={styles.contactNumber}>100</Text>
            <Text style={styles.contactLabel}>
              {isHindi ? 'पुलिस' : 'Police'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactButton}>
            <Ionicons name="call" size={24} color="#F44336" />
            <Text style={styles.contactNumber}>102</Text>
            <Text style={styles.contactLabel}>
              {isHindi ? 'एम्बुलेंस' : 'Ambulance'}
            </Text>
          </TouchableOpacity>
        </View>
      </Card>
    </ScrollView>
  );

  const [activeSubTab, setActiveSubTab] = useState('advisor');
  const [activeWomenTab, setActiveWomenTab] = useState('emergency');

  const renderFinance = () => {
    const financeTabs = [
      { id: 'advisor', label: isHindi ? 'AI सलाहकार' : 'AI Advisor', icon: 'bulb' },
      { id: 'sip', label: isHindi ? 'SIP' : 'SIP', icon: 'calculator' },
      { id: 'goal', label: isHindi ? 'लक्ष्य' : 'Goals', icon: 'flag' },
      { id: 'risk', label: isHindi ? 'जोखिम' : 'Risk', icon: 'speedometer' },
    ];

    return (
      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.subTabBar}>
          {financeTabs.map(tab => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.subTab, activeSubTab === tab.id && styles.activeSubTab]}
              onPress={() => setActiveSubTab(tab.id)}
            >
              <Ionicons
                name={tab.icon}
                size={18}
                color={activeSubTab === tab.id ? '#6B4EFF' : '#757575'}
              />
              <Text style={[styles.subTabText, activeSubTab === tab.id && styles.activeSubTabText]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.subContent}>
          {activeSubTab === 'advisor' && <AIAdvisorComponent language={selectedLanguage} navigation={navigation} />}
          {activeSubTab === 'sip' && <SIPCalculatorComponent language={selectedLanguage} navigation={navigation} />}
          {activeSubTab === 'goal' && <GoalPlannerComponent language={selectedLanguage} navigation={navigation} />}
          {activeSubTab === 'risk' && <RiskProfileComponent language={selectedLanguage} navigation={navigation} />}
        </View>
      </View>
    );
  };

  const renderWomen = () => {
    const womenTabs = [
      { id: 'emergency', label: isHindi ? 'आपातकालीन' : 'Emergency', icon: 'shield' },
      { id: 'learn', label: isHindi ? 'सीखना' : 'Learn', icon: 'school' },
      { id: 'literacy', label: isHindi ? 'साक्षरता' : 'Literacy', icon: 'book' },
      { id: 'community', label: isHindi ? 'समुदाय' : 'Community', icon: 'people' },
    ];

    return (
      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.subTabBar}>
          {womenTabs.map(tab => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.subTab, activeWomenTab === tab.id && styles.activeSubTab]}
              onPress={() => setActiveWomenTab(tab.id)}
            >
              <Ionicons
                name={tab.icon}
                size={18}
                color={activeWomenTab === tab.id ? '#6B4EFF' : '#757575'}
              />
              <Text style={[styles.subTabText, activeWomenTab === tab.id && styles.activeSubTabText]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.subContent}>
          {activeWomenTab === 'emergency' && <EmergencyFundComponent language={selectedLanguage} navigation={navigation} />}
          {activeWomenTab === 'learn' && <LearningModulesComponent language={selectedLanguage} navigation={navigation} />}
          {activeWomenTab === 'literacy' && <LiteracyCardsComponent language={selectedLanguage} navigation={navigation} />}
          {activeWomenTab === 'community' && <CommunityComponent language={selectedLanguage} navigation={navigation} />}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Main Tab Bar */}
      <View style={styles.mainTabBar}>
        <TouchableOpacity
          style={[styles.mainTab, activeMainTab === 'home' && styles.activeMainTab]}
          onPress={() => setActiveMainTab('home')}
        >
          <Ionicons
            name="home"
            size={20}
            color={activeMainTab === 'home' ? '#6B4EFF' : '#757575'}
          />
          <Text style={[styles.mainTabText, activeMainTab === 'home' && styles.activeMainTabText]}>
            {isHindi ? 'होम' : 'Home'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.mainTab, activeMainTab === 'finance' && styles.activeMainTab]}
          onPress={() => setActiveMainTab('finance')}
        >
          <Ionicons
            name="trending-up"
            size={20}
            color={activeMainTab === 'finance' ? '#6B4EFF' : '#757575'}
          />
          <Text style={[styles.mainTabText, activeMainTab === 'finance' && styles.activeMainTabText]}>
            {isHindi ? 'वित्त' : 'Finance'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.mainTab, activeMainTab === 'women' && styles.activeMainTab]}
          onPress={() => setActiveMainTab('women')}
        >
          <Ionicons
            name="woman"
            size={20}
            color={activeMainTab === 'women' ? '#6B4EFF' : '#757575'}
          />
          <Text style={[styles.mainTabText, activeMainTab === 'women' && styles.activeMainTabText]}>
            {isHindi ? 'महिला' : 'Women'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Language Toggle */}
      <View style={styles.languageBar}>
        <TouchableOpacity onPress={toggleLanguage} style={styles.languageButton}>
          <Ionicons name="language" size={18} color="#6B4EFF" />
          <Text style={styles.languageText}>
            {selectedLanguage === 'en' ? 'हिंदी' : 'English'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {activeMainTab === 'home' && renderHome()}
        {activeMainTab === 'finance' && renderFinance()}
        {activeMainTab === 'women' && renderWomen()}
      </View>
    </View>
  );
}

// Placeholder components (to be replaced with actual imports)
const AIAdvisorComponent = ({ language, navigation }) => (
  <View style={styles.placeholderContainer}>
    <Text>AI Advisor Component - {language}</Text>
  </View>
);

const SIPCalculatorComponent = ({ language, navigation }) => (
  <View style={styles.placeholderContainer}>
    <Text>SIP Calculator Component - {language}</Text>
  </View>
);

const GoalPlannerComponent = ({ language, navigation }) => (
  <View style={styles.placeholderContainer}>
    <Text>Goal Planner Component - {language}</Text>
  </View>
);

const RiskProfileComponent = ({ language, navigation }) => (
  <View style={styles.placeholderContainer}>
    <Text>Risk Profile Component - {language}</Text>
  </View>
);

const EmergencyFundComponent = ({ language, navigation }) => (
  <View style={styles.placeholderContainer}>
    <Text>Emergency Fund Component - {language}</Text>
  </View>
);

const LearningModulesComponent = ({ language, navigation }) => (
  <View style={styles.placeholderContainer}>
    <Text>Learning Modules Component - {language}</Text>
  </View>
);

const LiteracyCardsComponent = ({ language, navigation }) => (
  <View style={styles.placeholderContainer}>
    <Text>Literacy Cards Component - {language}</Text>
  </View>
);

const CommunityComponent = ({ language, navigation }) => (
  <View style={styles.placeholderContainer}>
    <Text>Community Component - {language}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  mainTabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  mainTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 8,
  },
  activeMainTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#6B4EFF',
  },
  mainTabText: {
    fontSize: 14,
    color: '#757575',
  },
  activeMainTabText: {
    color: '#6B4EFF',
    fontWeight: '500',
  },
  languageBar: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingBottom: 10,
    alignItems: 'flex-end',
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    padding: 5,
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  languageText: {
    fontSize: 12,
    color: '#6B4EFF',
  },
  content: {
    flex: 1,
  },
  welcomeCard: {
    margin: 15,
    padding: 20,
    backgroundColor: '#6B4EFF',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  portfolioCard: {
    margin: 15,
    marginTop: 0,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 10,
  },
  portfolioValue: {
    marginBottom: 15,
  },
  valueLabel: {
    fontSize: 12,
    color: '#757575',
  },
  valueAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212121',
    marginVertical: 5,
  },
  returnBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  returnText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 10,
    color: '#757575',
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  seeAllText: {
    fontSize: 12,
    color: '#6B4EFF',
  },
  horizontalScroll: {
    paddingLeft: 15,
    marginBottom: 20,
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginRight: 10,
    alignItems: 'center',
    minWidth: 90,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 11,
    color: '#757575',
    textAlign: 'center',
  },
  storiesCard: {
    margin: 15,
    marginTop: 0,
    padding: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 12,
  },
  storyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  storyAvatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#6B4EFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  storyContent: {
    flex: 1,
  },
  storyName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
  },
  storyPreview: {
    fontSize: 12,
    color: '#757575',
    marginTop: 2,
  },
  viewAllButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  viewAllText: {
    color: '#6B4EFF',
    fontSize: 13,
    fontWeight: '500',
  },
  emergencyCard: {
    margin: 15,
    marginTop: 0,
    marginBottom: 30,
    padding: 15,
  },
  contactRow: {
    flexDirection: 'row',
    gap: 10,
  },
  contactButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFEBEE',
    padding: 12,
    borderRadius: 10,
  },
  contactNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F44336',
    marginTop: 5,
  },
  contactLabel: {
    fontSize: 10,
    color: '#757575',
    textAlign: 'center',
    marginTop: 2,
  },
  tabContainer: {
    flex: 1,
  },
  subTabBar: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  subTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    gap: 4,
  },
  activeSubTab: {
    backgroundColor: '#6B4EFF20',
  },
  subTabText: {
    fontSize: 12,
    color: '#757575',
  },
  activeSubTabText: {
    color: '#6B4EFF',
    fontWeight: '500',
  },
  subContent: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});