
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PremiumScreen from '../screens/Premium/PremiumScreen';
import PaymentScreen from '../screens/Premium/PaymentScreen';
import SubscriptionDetailsScreen from '../screens/Premium/SubscriptionDetailsScreen';
import PaymentHistoryScreen from '../screens/Premium/PaymentHistoryScreen';
import InvoiceScreen from '../screens/Premium/InvoiceScreen';

const Stack = createNativeStackNavigator();

const PremiumStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PremiumMain" component={PremiumScreen} />
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{
          headerShown: true,
          title: 'Payment',
          headerStyle: { backgroundColor: '#6B4EFF' },
          headerTintColor: '#FFFFFF',
        }}
      />
      <Stack.Screen
        name="SubscriptionDetails"
        component={SubscriptionDetailsScreen}
        options={{
          headerShown: true,
          title: 'Subscription Details',
          headerStyle: { backgroundColor: '#6B4EFF' },
          headerTintColor: '#FFFFFF',
        }}
      />
      <Stack.Screen
        name="PaymentHistory"
        component={PaymentHistoryScreen}
        options={{
          headerShown: true,
          title: 'Payment History',
          headerStyle: { backgroundColor: '#6B4EFF' },
          headerTintColor: '#FFFFFF',
        }}
      />
      <Stack.Screen
        name="Invoice"
        component={InvoiceScreen}
        options={{
          headerShown: true,
          title: 'Invoice',
          headerStyle: { backgroundColor: '#6B4EFF' },
          headerTintColor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
};

export default PremiumStack;