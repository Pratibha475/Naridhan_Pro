
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import AuthStack from './AuthStack';
import MainTabNavigator from './MainTabNavigator';
import LoadingScreen from '../components/SplashScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { user, isLoading } = useAuth();

  console.log('📱 AppNavigator - User:', user ? 'Logged In' : 'Not Logged In');
  console.log('📱 AppNavigator - Loading:', isLoading);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!user ? (
        <Stack.Screen
          name="Auth"
          component={AuthStack}
        />
      ) : (
        <Stack.Screen
          name="MainTabs"
          component={MainTabNavigator}
        />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;