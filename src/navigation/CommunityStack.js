
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CommunityScreen from '../screens/Community/CommunityScreen';
import PostDetailScreen from '../screens/Community/PostDetailScreen';
import CreatePostScreen from '../screens/Community/CreatePostScreen';
import UserProfileScreen from '../screens/Community/UserProfileScreen';
import CommentsScreen from '../screens/Community/CommentsScreen';

const Stack = createNativeStackNavigator();

const CommunityStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CommunityMain" component={CommunityScreen} />
      <Stack.Screen
        name="PostDetail"
        component={PostDetailScreen}
        options={{
          headerShown: true,
          title: 'Post',
          headerStyle: { backgroundColor: '#6B4EFF' },
          headerTintColor: '#FFFFFF',
        }}
      />
      <Stack.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{
          headerShown: true,
          title: 'Create Post',
          headerStyle: { backgroundColor: '#6B4EFF' },
          headerTintColor: '#FFFFFF',
        }}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={{
          headerShown: true,
          title: 'User Profile',
          headerStyle: { backgroundColor: '#6B4EFF' },
          headerTintColor: '#FFFFFF',
        }}
      />
      <Stack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          headerShown: true,
          title: 'Comments',
          headerStyle: { backgroundColor: '#6B4EFF' },
          headerTintColor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
};

export default CommunityStack;