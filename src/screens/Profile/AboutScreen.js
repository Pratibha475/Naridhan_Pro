
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card';

const AboutScreen = () => {
  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.logoCard}>
        <View style={styles.logoContainer}>
          <Ionicons name="woman" size={60} color="#6B4EFF" />
        </View>
        <Text style={styles.appName}>NariDhan Pro</Text>
        <Text style={styles.tagline}>Empowering Women Financially</Text>
        <Text style={styles.version}>Version 1.0.0 (Build 100)</Text>
      </Card>

      <Card style={styles.infoCard}>
        <Text style={styles.sectionTitle}>About the App</Text>
        <Text style={styles.description}>
          NariDhan Pro is a comprehensive financial growth platform designed specifically for women.
          Our mission is to empower women with the tools, knowledge, and community support needed to
          achieve financial independence and security.
        </Text>

        <View style={styles.featureList}>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.featureText}>Expense tracking and budgeting</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.featureText}>AI-powered financial advice</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.featureText}>Investment planning tools</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.featureText}>Educational resources</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.featureText}>Women community support</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.featureText}>Emergency fund tracker</Text>
          </View>
        </View>
      </Card>

      <Card style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Our Team</Text>
        <Text style={styles.description}>
          We are a dedicated team of financial experts, developers, and women's empowerment advocates
          working together to create a safer, more inclusive financial future for women everywhere.
        </Text>
      </Card>

      <Card style={styles.contactCard}>
        <Text style={styles.sectionTitle}>Connect With Us</Text>

        <TouchableOpacity
          style={styles.contactItem}
          onPress={() => openLink('https://www.naridhan.com')}
        >
          <Ionicons name="globe-outline" size={22} color="#6B4EFF" />
          <Text style={styles.contactText}>www.naridhan.com</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.contactItem}
          onPress={() => openLink('mailto:hello@naridhan.com')}
        >
          <Ionicons name="mail-outline" size={22} color="#6B4EFF" />
          <Text style={styles.contactText}>hello@naridhan.com</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.contactItem}
          onPress={() => openLink('https://twitter.com/naridhan')}
        >
          <Ionicons name="logo-twitter" size={22} color="#6B4EFF" />
          <Text style={styles.contactText}>@naridhan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.contactItem}
          onPress={() => openLink('https://instagram.com/naridhan')}
        >
          <Ionicons name="logo-instagram" size={22} color="#6B4EFF" />
          <Text style={styles.contactText}>@naridhan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.contactItem}
          onPress={() => openLink('https://linkedin.com/company/naridhan')}
        >
          <Ionicons name="logo-linkedin" size={22} color="#6B4EFF" />
          <Text style={styles.contactText}>NariDhan Pro</Text>
        </TouchableOpacity>
      </Card>

      <Card style={styles.legalCard}>
        <Text style={styles.copyright}>
          © 2024 NariDhan Pro. All rights reserved.
        </Text>
        <View style={styles.legalLinks}>
          <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
            <Text style={styles.legalLink}>Terms</Text>
          </TouchableOpacity>
          <Text style={styles.dot}>•</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Privacy')}>
            <Text style={styles.legalLink}>Privacy</Text>
          </TouchableOpacity>
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
  logoCard: {
    margin: 15,
    marginBottom: 10,
    padding: 20,
    alignItems: 'center',
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F0E6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 5,
  },
  tagline: {
    fontSize: 14,
    color: '#6B4EFF',
    marginBottom: 10,
  },
  version: {
    fontSize: 12,
    color: '#757575',
  },
  infoCard: {
    margin: 15,
    marginTop: 0,
    marginBottom: 10,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#757575',
    lineHeight: 20,
    marginBottom: 15,
  },
  featureList: {
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  featureText: {
    fontSize: 14,
    color: '#212121',
  },
  contactCard: {
    margin: 15,
    marginTop: 0,
    marginBottom: 10,
    padding: 15,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  contactText: {
    fontSize: 14,
    color: '#212121',
  },
  legalCard: {
    margin: 15,
    marginTop: 0,
    marginBottom: 30,
    padding: 15,
    alignItems: 'center',
  },
  copyright: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 8,
  },
  legalLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legalLink: {
    fontSize: 12,
    color: '#6B4EFF',
  },
  dot: {
    fontSize: 12,
    color: '#757575',
  },
});

export default AboutScreen;