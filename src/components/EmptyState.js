import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EmptyState = ({ icon, title, message }) => {
  return (
    <View style={styles.container}>
      <Ionicons name={icon || 'document-outline'} size={60} color="#E0E0E0" />
      <Text style={styles.title}>{title || 'No Data Found'}</Text>
      <Text style={styles.message}>
        {message || 'There is no data to display at the moment.'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#757575',
    marginTop: 10,
    marginBottom: 5,
  },
  message: {
    fontSize: 14,
    color: '#9E9E9E',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default EmptyState;