

import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkSavedUser();
  }, []);

  const checkSavedUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Error checking saved user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        if (email && password && password.length >= 6) {
          const userData = {
            id: Date.now().toString(),
            email,
            name: email.split('@')[0],
          };
          await AsyncStorage.setItem('user', JSON.stringify(userData));
          setUser(userData);
          resolve(userData);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const signUp = async (email, password, name) => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        if (email && password && password.length >= 6) {
          const userData = {
            id: Date.now().toString(),
            email,
            name: name || email.split('@')[0],
          };
          await AsyncStorage.setItem('user', JSON.stringify(userData));
          setUser(userData);
          resolve(userData);
        } else {
          reject(new Error('Invalid data'));
        }
      }, 1000);
    });
  };

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    signIn,
    signUp,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};