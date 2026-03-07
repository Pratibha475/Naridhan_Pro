
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card';

const NotificationsScreen = () => {
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    transactionAlerts: true,
    investmentUpdates: true,
    promotionalOffers: false,
    communityActivity: true,
    weeklyDigest: true,
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const notificationSections = [
    {
      title: 'General Notifications',
      icon: 'notifications-outline',
      color: '#6B4EFF',
      items: [
        {
          key: 'pushNotifications',
          label: 'Push Notifications',
          description: 'Receive push notifications on your device',
        },
        {
          key: 'emailNotifications',
          label: 'Email Notifications',
          description: 'Receive updates via email',
        },
        {
          key: 'smsNotifications',
          label: 'SMS Notifications',
          description: 'Receive text messages for important updates',
        },
      ],
    },
    {
      title: 'Financial Alerts',
      icon: 'trending-up-outline',
      color: '#4CAF50',
      items: [
        {
          key: 'transactionAlerts',
          label: 'Transaction Alerts',
          description: 'Get notified for all transactions',
        },
        {
          key: 'investmentUpdates',
          label: 'Investment Updates',
          description: 'Updates on your investments and SIPs',
        },
      ],
    },
    {
      title: 'Community & Updates',
      icon: 'people-outline',
      color: '#FF9800',
      items: [
        {
          key: 'communityActivity',
          label: 'Community Activity',
          description: 'Notifications from community posts',
        },
        {
          key: 'weeklyDigest',
          label: 'Weekly Digest',
          description: 'Weekly summary of your activity',
        },
        {
          key: 'promotionalOffers',
          label: 'Promotional Offers',
          description: 'Special offers and promotions',
        },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {notificationSections.map((section, sectionIndex) => (
        <Card key={sectionIndex} style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIcon, { backgroundColor: section.color + '20' }]}>
              <Ionicons name={section.icon} size={22} color={section.color} />
            </View>
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>

          {section.items.map((item, itemIndex) => (
            <View
              key={itemIndex}
              style={[
                styles.notificationItem,
                itemIndex < section.items.length - 1 && styles.itemBorder
              ]}
            >
              <View style={styles.itemInfo}>
                <Text style={styles.itemLabel}>{item.label}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
              </View>
              <Switch
                value={settings[item.key]}
                onValueChange={() => toggleSetting(item.key)}
                trackColor={{ false: '#E0E0E0', true: section.color }}
                thumbColor="#FFFFFF"
              />
            </View>
          ))}
        </Card>
      ))}

      <Card style={styles.infoCard}>
        <Ionicons name="information-circle" size={24} color="#6B4EFF" />
        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>Notification Preferences</Text>
          <Text style={styles.infoText}>
            You can customize which notifications you receive. Changes will be applied immediately.
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
  sectionCard: {
    margin: 15,
    marginBottom: 10,
    padding: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
  },
  sectionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  itemInfo: {
    flex: 1,
    marginRight: 15,
  },
  itemLabel: {
    fontSize: 15,
    color: '#212121',
    marginBottom: 2,
  },
  itemDescription: {
    fontSize: 12,
    color: '#757575',
  },
  infoCard: {
    margin: 15,
    marginTop: 5,
    marginBottom: 30,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    backgroundColor: '#E8F0FE',
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 2,
  },
  infoText: {
    fontSize: 12,
    color: '#757575',
    lineHeight: 16,
  },
});

export default NotificationsScreen;