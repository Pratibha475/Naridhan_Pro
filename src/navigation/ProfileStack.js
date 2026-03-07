
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import EditProfileScreen from '../screens/Profile/EditProfileScreen';
import NotificationsScreen from '../screens/Profile/NotificationsScreen';
import PrivacyScreen from '../screens/Profile/PrivacyScreen';
import LanguageScreen from '../screens/Profile/LanguageScreen';
import HelpScreen from '../screens/Profile/HelpScreen';
import TermsScreen from '../screens/Profile/TermsScreen';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerShown: true,
          title: 'Edit Profile',
          headerStyle: { backgroundColor: '#6B4EFF' },
          headerTintColor: '#FFFFFF',
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          headerShown: true,
          title: 'Notifications',
          headerStyle: { backgroundColor: '#6B4EFF' },
          headerTintColor: '#FFFFFF',
        }}
      />
      <Stack.Screen
        name="Privacy"
        component={PrivacyScreen}
        options={{
          headerShown: true,
          title: 'Privacy & Security',
          headerStyle: { backgroundColor: '#6B4EFF' },
          headerTintColor: '#FFFFFF',
        }}
      />
      <Stack.Screen
        name="Language"
        component={LanguageScreen}
        options={{
          headerShown: true,
          title: 'Language',
          headerStyle: { backgroundColor: '#6B4EFF' },
          headerTintColor: '#FFFFFF',
        }}
      />
      <Stack.Screen
        name="Help"
        component={HelpScreen}
        options={{
          headerShown: true,
          title: 'Help Center',
          headerStyle: { backgroundColor: '#6B4EFF' },
          headerTintColor: '#FFFFFF',
        }}
      />
      <Stack.Screen
        name="Terms"
        component={TermsScreen}
        options={{
          headerShown: true,
          title: 'Terms & Conditions',
          headerStyle: { backgroundColor: '#6B4EFF' },
          headerTintColor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;