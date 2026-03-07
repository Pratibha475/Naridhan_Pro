
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WomenFinanceScreen from '../screens/WomenFinance/WomenFinanceScreen';
import AIAdvisor from '../screens/WomenFinance/AIAdvisor';
import SIPCalculator from '../screens/WomenFinance/SIPCalculator';
import GoalPlanner from '../screens/WomenFinance/GoalPlanner';
import RiskProfile from '../screens/WomenFinance/RiskProfile';
import EmergencyFund from '../screens/WomenFinance/EmergencyFund';
import LearningModules from '../screens/WomenFinance/LearningModules';
import LiteracyCards from '../screens/WomenFinance/LiteracyCards';
import Community from '../screens/WomenFinance/Community';

const Stack = createNativeStackNavigator();

const WomenFinanceStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WomenFinanceMain" component={WomenFinanceScreen} />
      <Stack.Screen
        name="AIAdvisor"
        component={AIAdvisor}
        options={{
          headerShown: true,
          title: 'AI Advisor',
          headerStyle: { backgroundColor: '#6B4EFF' },
          headerTintColor: '#FFFFFF',
        }}
      />
      <Stack.Screen
        name="SIPCalculator"
        component={SIPCalculator}
        options={{
          headerShown: true,
          title: 'SIP Calculator',
          headerStyle: { backgroundColor: '#6B4EFF' },
          headerTintColor: '#FFFFFF',
        }}
      />
      <Stack.Screen
        name="GoalPlanner"
        component={GoalPlanner}
        options={{
          headerShown: true,
          title: 'Goal Planner',
          headerStyle: { backgroundColor: '#6B4EFF' },
          headerTintColor: '#FFFFFF',
        }}
      />
      <Stack.Screen
        name="RiskProfile"
        component={RiskProfile}
        options={{
          headerShown: true,
          title: 'Risk Profile',
          headerStyle: { backgroundColor: '#6B4EFF' },
          headerTintColor: '#FFFFFF',
        }}
      />
      <Stack.Screen
        name="EmergencyFund"
        component={EmergencyFund}
        options={{
          headerShown: true,
          title: 'Emergency Fund',
          headerStyle: { backgroundColor: '#6B4EFF' },
          headerTintColor: '#FFFFFF',
        }}
      />
      <Stack.Screen
        name="LearningModules"
        component={LearningModules}
        options={{
          headerShown: true,
          title: 'Learning Center',
          headerStyle: { backgroundColor: '#6B4EFF' },
          headerTintColor: '#FFFFFF',
        }}
      />
      <Stack.Screen
        name="LiteracyCards"
        component={LiteracyCards}
        options={{
          headerShown: true,
          title: 'Financial Literacy',
          headerStyle: { backgroundColor: '#6B4EFF' },
          headerTintColor: '#FFFFFF',
        }}
      />
      <Stack.Screen
        name="WomenCommunity"
        component={Community}
        options={{
          headerShown: true,
          title: 'Women Community',
          headerStyle: { backgroundColor: '#6B4EFF' },
          headerTintColor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
};

export default WomenFinanceStack;