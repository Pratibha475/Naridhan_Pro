
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

// Import all stack navigators
import HomeStack from './HomeStack';
import WomenFinanceStack from './WomenFinanceStack';
import CommunityStack from './CommunityStack';
import PremiumStack from './PremiumStack';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator();

// Custom tab bar button for center tab (Premium) - FIXED
const CenterTabButton = ({ children, onPress, accessibilityState }) => {
  // Add null check for accessibilityState
  const focused = accessibilityState?.selected || false;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.centerButtonContainer}
      activeOpacity={0.8}
    >
      <View style={[
        styles.centerButton,
        { backgroundColor: focused ? '#6B4EFF' : '#FFD700' }
      ]}>
        {children}
      </View>
    </TouchableOpacity>
  );
};

const MainTabNavigator = () => {
  console.log('✅ MainTabNavigator rendering with 5 tabs and nested stacks');

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'WomenFinanceTab') {
            iconName = focused ? 'woman' : 'woman-outline';
          } else if (route.name === 'CommunityTab') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'PremiumTab') {
            iconName = focused ? 'diamond' : 'diamond-outline';
          } else if (route.name === 'ProfileTab') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6B4EFF',
        tabBarInactiveTintColor: '#757575',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
        headerShown: false, // Hide header for tab navigator
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          title: 'Home',
        }}
      />
      <Tab.Screen
        name="WomenFinanceTab"
        component={WomenFinanceStack}
        options={{
          title: 'Finance',
        }}
      />
      <Tab.Screen
        name="CommunityTab"
        component={CommunityStack}
        options={{
          title: 'Community',
        }}
      />
      <Tab.Screen
        name="PremiumTab"
        component={PremiumStack}
        options={{
          title: 'Premium',
          tabBarButton: (props) => <CenterTabButton {...props} />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{
          title: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  centerButtonContainer: {
    top: -10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default MainTabNavigator;