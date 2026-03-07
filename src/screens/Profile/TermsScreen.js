
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Card from '../../components/Card';

const TermsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>Terms and Conditions</Text>
        <Text style={styles.lastUpdated}>Last Updated: March 2024</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
          <Text style={styles.text}>
            By accessing or using NariDhan Pro, you agree to be bound by these Terms and Conditions.
            If you do not agree to all the terms and conditions, you may not access or use our services.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Description of Service</Text>
          <Text style={styles.text}>
            NariDhan Pro provides a women-centric financial growth platform that includes but is not
            limited to expense tracking, investment advice, financial education, and community features.
            We reserve the right to modify, suspend, or discontinue any part of the service at any time.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. User Accounts</Text>
          <Text style={styles.text}>
            To use certain features of the service, you must register for an account. You agree to:
          </Text>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listText}>Provide accurate and complete information</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listText}>Maintain the security of your account</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listText}>Notify us immediately of any unauthorized use</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listText}>Be responsible for all activities under your account</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Privacy</Text>
          <Text style={styles.text}>
            Your use of NariDhan Pro is also governed by our Privacy Policy. By using the service,
            you consent to the collection and use of your information as described in the Privacy Policy.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Financial Advice Disclaimer</Text>
          <Text style={styles.text}>
            NariDhan Pro provides information for educational and informational purposes only.
            We are not financial advisors and do not provide professional financial advice.
            Always consult with a qualified financial professional before making investment decisions.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. User Content</Text>
          <Text style={styles.text}>
            You retain ownership of any content you submit to the platform. By submitting content,
            you grant us a non-exclusive, royalty-free license to use, reproduce, and display such
            content to provide and improve our services.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Prohibited Activities</Text>
          <Text style={styles.text}>You agree not to:</Text>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listText}>Violate any laws or regulations</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listText}>Infringe upon intellectual property rights</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listText}>Transmit harmful code or malware</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listText}>Harass or abuse other users</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listText}>Attempt to gain unauthorized access to our systems</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Termination</Text>
          <Text style={styles.text}>
            We may terminate or suspend your account immediately, without prior notice, for conduct
            that we believe violates these Terms or is harmful to other users, us, or third parties.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. Limitation of Liability</Text>
          <Text style={styles.text}>
            To the maximum extent permitted by law, NariDhan Pro shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages arising out of or relating to
            your use of the service.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10. Changes to Terms</Text>
          <Text style={styles.text}>
            We reserve the right to modify these terms at any time. We will provide notice of significant
            changes by posting the new terms on this page and updating the "Last Updated" date.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>11. Contact Information</Text>
          <Text style={styles.text}>
            If you have any questions about these Terms, please contact us at:
            {'\n'}Email: legal@naridhan.com
            {'\n'}Address: NariDhan Pro, Financial District, Mumbai, India
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
    marginBottom: 30,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 5,
  },
  lastUpdated: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B4EFF',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: '#212121',
    lineHeight: 20,
    marginBottom: 8,
  },
  listItem: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 4,
    paddingLeft: 10,
  },
  bullet: {
    fontSize: 14,
    color: '#6B4EFF',
    width: 10,
  },
  listText: {
    flex: 1,
    fontSize: 14,
    color: '#212121',
    lineHeight: 20,
  },
});

export default TermsScreen;