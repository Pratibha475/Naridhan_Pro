
import React from 'react';
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

const PremiumScreen = ({ navigation }) => {
  const premiumFeatures = [
    {
      icon: 'trending-up',
      title: 'Advanced Analytics',
      description: 'Get detailed insights and predictions for your investments',
      color: '#6B4EFF',
    },
    {
      icon: 'shield',
      title: 'Priority Support',
      description: '24/7 dedicated customer support',
      color: '#4CAF50',
    },
    {
      icon: 'school',
      title: 'Expert Webinars',
      description: 'Access exclusive webinars from financial experts',
      color: '#FF9800',
    },
    {
      icon: 'document-text',
      title: 'Tax Planning',
      description: 'Personalized tax saving recommendations',
      color: '#F44336',
    },
    {
      icon: 'people',
      title: 'Premium Community',
      description: 'Connect with successful women investors',
      color: '#9C27B0',
    },
    {
      icon: 'call',
      title: '1-on-1 Consultation',
      description: 'Monthly consultation with financial advisors',
      color: '#00BCD4',
    },
  ];

  const plans = [
    {
      id: 'monthly',
      name: 'Monthly Plan',
      price: 499,
      period: 'month',
      savings: null,
      popular: false,
    },
    {
      id: 'yearly',
      name: 'Yearly Plan',
      price: 4799,
      period: 'year',
      savings: 'Save 20%',
      popular: true,
    },
    {
      id: 'quarterly',
      name: 'Quarterly Plan',
      price: 1299,
      period: '3 months',
      savings: 'Save 13%',
      popular: false,
    },
  ];

  const [selectedPlan, setSelectedPlan] = React.useState('yearly');

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Ionicons name="diamond" size={60} color="#FFD700" />
          <Text style={styles.headerTitle}>Upgrade to Premium</Text>
          <Text style={styles.headerSubtitle}>
            Unlock all features and take control of your financial future
          </Text>
        </View>
      </View>

      {/* Plans */}
      <View style={styles.plansContainer}>
        {plans.map((plan) => (
          <TouchableOpacity
            key={plan.id}
            style={[
              styles.planCard,
              selectedPlan === plan.id && styles.selectedPlanCard,
              plan.popular && styles.popularPlanCard,
            ]}
            onPress={() => setSelectedPlan(plan.id)}
          >
            {plan.popular && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularBadgeText}>Most Popular</Text>
              </View>
            )}

            <Text style={styles.planName}>{plan.name}</Text>

            <View style={styles.priceContainer}>
              <Text style={styles.currency}>₹</Text>
              <Text style={styles.price}>{plan.price}</Text>
              <Text style={styles.period}>/{plan.period}</Text>
            </View>

            {plan.savings && (
              <View style={styles.savingsBadge}>
                <Text style={styles.savingsText}>{plan.savings}</Text>
              </View>
            )}

            {selectedPlan === plan.id && (
              <View style={styles.selectedIcon}>
                <Ionicons name="checkmark-circle" size={24} color="#6B4EFF" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Subscribe Button */}
      <Card style={styles.subscribeCard}>
        <Button
          title="Subscribe Now"
          onPress={() => navigation.navigate('Payment', { planId: selectedPlan })}
          style={styles.subscribeButton}
        />
        <Text style={styles.guaranteeText}>
          7-day money-back guarantee • Cancel anytime
        </Text>
      </Card>

      {/* Features */}
      <View style={styles.featuresContainer}>
        <Text style={styles.featuresTitle}>Premium Features</Text>
        {premiumFeatures.map((feature, index) => (
          <Card key={index} style={styles.featureCard}>
            <View style={[styles.featureIcon, { backgroundColor: feature.color + '20' }]}>
              <Ionicons name={feature.icon} size={24} color={feature.color} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          </Card>
        ))}
      </View>

      {/* FAQ Section */}
      <Card style={styles.faqCard}>
        <Text style={styles.faqTitle}>Frequently Asked Questions</Text>

        <TouchableOpacity style={styles.faqItem}>
          <Text style={styles.faqQuestion}>Can I cancel anytime?</Text>
          <Ionicons name="chevron-down" size={20} color="#757575" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.faqItem}>
          <Text style={styles.faqQuestion}>What payment methods do you accept?</Text>
          <Ionicons name="chevron-down" size={20} color="#757575" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.faqItem}>
          <Text style={styles.faqQuestion}>Is there a family plan?</Text>
          <Ionicons name="chevron-down" size={20} color="#757575" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.faqItem}>
          <Text style={styles.faqQuestion}>How does the free trial work?</Text>
          <Ionicons name="chevron-down" size={20} color="#757575" />
        </TouchableOpacity>
      </Card>

      {/* Testimonials */}
      <Card style={styles.testimonialCard}>
        <Ionicons name="star" size={20} color="#FFD700" />
        <Ionicons name="star" size={20} color="#FFD700" />
        <Ionicons name="star" size={20} color="#FFD700" />
        <Ionicons name="star" size={20} color="#FFD700" />
        <Ionicons name="star" size={20} color="#FFD700" />
        <Text style={styles.testimonialText}>
          "NariDhan Pro premium has transformed how I manage my finances. The AI advisor and tax planning features are worth every penny!"
        </Text>
        <Text style={styles.testimonialAuthor}>- Priya Sharma</Text>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#6B4EFF',
    padding: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 10,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  plansContainer: {
    padding: 15,
    marginTop: -20,
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  selectedPlanCard: {
    borderColor: '#6B4EFF',
    backgroundColor: '#F8F4FF',
  },
  popularPlanCard: {
    borderColor: '#FFD700',
    borderWidth: 2,
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    right: 20,
    backgroundColor: '#FFD700',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularBadgeText: {
    color: '#212121',
    fontSize: 11,
    fontWeight: '600',
  },
  planName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currency: {
    fontSize: 18,
    color: '#757575',
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#212121',
    marginHorizontal: 2,
  },
  period: {
    fontSize: 14,
    color: '#757575',
  },
  savingsBadge: {
    backgroundColor: '#4CAF50',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 8,
  },
  savingsText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '500',
  },
  selectedIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  subscribeCard: {
    margin: 15,
    marginTop: 5,
    padding: 20,
    alignItems: 'center',
  },
  subscribeButton: {
    width: '100%',
    marginBottom: 10,
  },
  guaranteeText: {
    fontSize: 12,
    color: '#757575',
    textAlign: 'center',
  },
  featuresContainer: {
    padding: 15,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 15,
  },
  featureCard: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 10,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 13,
    color: '#757575',
    lineHeight: 18,
  },
  faqCard: {
    margin: 15,
    marginTop: 5,
    padding: 15,
  },
  faqTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 15,
  },
  faqItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  faqQuestion: {
    fontSize: 14,
    color: '#212121',
  },
  testimonialCard: {
    margin: 15,
    marginTop: 5,
    marginBottom: 30,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
  },
  testimonialText: {
    fontSize: 14,
    color: '#212121',
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 10,
    marginBottom: 8,
    fontStyle: 'italic',
  },
  testimonialAuthor: {
    fontSize: 12,
    color: '#757575',
  },
});

export default PremiumScreen;