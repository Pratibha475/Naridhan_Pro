
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import TransactionDetailScreen from '../screens/Dashboard/TransactionDetailScreen';
import AddTransactionScreen from '../screens/Dashboard/AddTransactionScreen';
import AllTransactionsScreen from '../screens/Dashboard/AllTransactionsScreen';


const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DashboardMain" component={DashboardScreen} />
      <Stack.Screen name="AllTransaction" component={AllTransactionsScreen} />
      <Stack.Screen
        name="TransactionDetail"
        component={TransactionDetailScreen}
        options={{
          headerShown: true,
          title: 'Transaction Details',
          headerStyle: { backgroundColor: '#6B4EFF' },
          headerTintColor: '#FFFFFF',
        }}
      />
      <Stack.Screen
        name="AddTransaction"
        component={AddTransactionScreen}
        options={{
          headerShown: true,
          title: 'Add Transaction',
          headerStyle: { backgroundColor: '#6B4EFF' },
          headerTintColor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;