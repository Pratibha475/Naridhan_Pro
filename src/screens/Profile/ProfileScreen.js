
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/Card';

const ProfileScreen = ({ navigation }) => {
  const { userProfile, logout } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          onPress: async () => {
            try {
              await logout();
            } catch (error) {
              Alert.alert('Error', 'Failed to logout');
            }
          },
          style: 'destructive'
        },
      ]
    );
  };

  const menuSections = [
    {
      title: 'Account',
      items: [
        {
          icon: 'person-outline',
          label: 'Edit Profile',
          screen: 'EditProfile',
          color: '#6B4EFF',
        },
        {
          icon: 'lock-closed-outline',
          label: 'Change Password',
          screen: 'ChangePassword',
          color: '#F44336',
        },
        {
          icon: 'notifications-outline',
          label: 'Notifications',
          screen: 'Notifications',
          color: '#FF9800',
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          icon: 'language-outline',
          label: 'Language',
          screen: 'Language',
          value: 'English',
          color: '#4CAF50',
        },
        {
          icon: 'moon-outline',
          label: 'Dark Mode',
          type: 'toggle',
          value: darkMode,
          onToggle: setDarkMode,
          color: '#9C27B0',
        },
        {
          icon: 'notifications-off-outline',
          label: 'Push Notifications',
          type: 'toggle',
          value: notifications,
          onToggle: setNotifications,
          color: '#2196F3',
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: 'help-circle-outline',
          label: 'Help Center',
          screen: 'Help',
          color: '#00BCD4',
        },
        {
          icon: 'document-text-outline',
          label: 'Terms & Conditions',
          screen: 'Terms',
          color: '#795548',
        },
        {
          icon: 'shield-outline',
          label: 'Privacy Policy',
          screen: 'Privacy',
          color: '#607D8B',
        },
        {
          icon: 'information-circle-outline',
          label: 'About App',
          screen: 'About',
          color: '#9E9E9E',
        },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {userProfile?.name?.charAt(0)?.toUpperCase() || 'U'}
          </Text>
        </View>
        <Text style={styles.userName}>{userProfile?.name || 'User Name'}</Text>
        <Text style={styles.userEmail}>{userProfile?.email || 'user@example.com'}</Text>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Ionicons name="create-outline" size={18} color="#6B4EFF" />
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Card */}
      <Card style={styles.statsCard}>
        <View style={styles.statRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Investments</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>₹50K</Text>
            <Text style={styles.statLabel}>Saved</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Lessons</Text>
          </View>
        </View>
      </Card>

      {/* Menu Sections */}
      {menuSections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Card style={styles.menuCard}>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                style={[
                  styles.menuItem,
                  itemIndex < section.items.length - 1 && styles.menuItemBorder
                ]}
                onPress={() => {
                  if (item.screen) {
                    navigation.navigate(item.screen);
                  }
                }}
                disabled={item.type === 'toggle'}
              >
                <View style={styles.menuItemLeft}>
                  <View style={[styles.menuIcon, { backgroundColor: item.color + '20' }]}>
                    <Ionicons name={item.icon} size={20} color={item.color} />
                  </View>
                  <Text style={styles.menuItemLabel}>{item.label}</Text>
                </View>

                {item.type === 'toggle' ? (
                  <Switch
                    value={item.value}
                    onValueChange={item.onToggle}
                    trackColor={{ false: '#E0E0E0', true: item.color }}
                    thumbColor="#FFFFFF"
                  />
                ) : item.value ? (
                  <View style={styles.menuItemValueContainer}>
                    <Text style={styles.menuItemValue}>{item.value}</Text>
                    <Ionicons name="chevron-forward" size={18} color="#BDBDBD" />
                  </View>
                ) : (
                  <Ionicons name="chevron-forward" size={18} color="#BDBDBD" />
                )}
              </TouchableOpacity>
            ))}
          </Card>
        </View>
      ))}

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={22} color="#F44336" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Version Info */}
      <Text style={styles.version}>Version 1.0.0</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#6B4EFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  avatarText: {
    fontSize: 40,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 15,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 5,
  },
  editButtonText: {
    color: '#6B4EFF',
    fontSize: 14,
    fontWeight: '500',
  },
  statsCard: {
    margin: 20,
    marginTop: 15,
    padding: 15,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E0E0E0',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6B4EFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#757575',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#757575',
    marginLeft: 20,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  menuCard: {
    marginHorizontal: 20,
    padding: 0,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemLabel: {
    fontSize: 15,
    color: '#212121',
  },
  menuItemValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  menuItemValue: {
    fontSize: 13,
    color: '#757575',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    padding: 15,
    borderRadius: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: '#FFEBEE',
  },
  logoutText: {
    fontSize: 16,
    color: '#F44336',
    fontWeight: '500',
  },
  version: {
    textAlign: 'center',
    color: '#BDBDBD',
    fontSize: 12,
    marginBottom: 30,
  },
});

export default ProfileScreen;