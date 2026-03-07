
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card';

const LanguageScreen = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const languages = [
    {
      id: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸',
      description: 'English (United States)',
    },
    {
      id: 'hi',
      name: 'Hindi',
      nativeName: 'हिन्दी',
      flag: '🇮🇳',
      description: 'हिन्दी (भारत)',
    },
    {
      id: 'bn',
      name: 'Bengali',
      nativeName: 'বাংলা',
      flag: '🇮🇳',
      description: 'বাংলা (ভারত)',
    },
    {
      id: 'te',
      name: 'Telugu',
      nativeName: 'తెలుగు',
      flag: '🇮🇳',
      description: 'తెలుగు (భారతదేశం)',
    },
    {
      id: 'ta',
      name: 'Tamil',
      nativeName: 'தமிழ்',
      flag: '🇮🇳',
      description: 'தமிழ் (இந்தியா)',
    },
    {
      id: 'mr',
      name: 'Marathi',
      nativeName: 'मराठी',
      flag: '🇮🇳',
      description: 'मराठी (भारत)',
    },
    {
      id: 'gu',
      name: 'Gujarati',
      nativeName: 'ગુજરાતી',
      flag: '🇮🇳',
      description: 'ગુજરાતી (ભારત)',
    },
    {
      id: 'kn',
      name: 'Kannada',
      nativeName: 'ಕನ್ನಡ',
      flag: '🇮🇳',
      description: 'ಕನ್ನಡ (ಭಾರತ)',
    },
    {
      id: 'ml',
      name: 'Malayalam',
      nativeName: 'മലയാളം',
      flag: '🇮🇳',
      description: 'മലയാളം (ഇന്ത്യ)',
    },
    {
      id: 'pa',
      name: 'Punjabi',
      nativeName: 'ਪੰਜਾਬੀ',
      flag: '🇮🇳',
      description: 'ਪੰਜਾਬੀ (ਭਾਰਤ)',
    },
  ];

  const handleLanguageSelect = (langId) => {
    setSelectedLanguage(langId);
  };

  const handleSave = () => {
    Alert.alert(
      'Success',
      'Language preference saved successfully',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>Select Language</Text>
        <Text style={styles.subtitle}>
          Choose your preferred language for the app interface
        </Text>

        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.id}
            style={[
              styles.languageItem,
              selectedLanguage === lang.id && styles.selectedItem
            ]}
            onPress={() => handleLanguageSelect(lang.id)}
          >
            <View style={styles.languageInfo}>
              <Text style={styles.flag}>{lang.flag}</Text>
              <View>
                <View style={styles.nameContainer}>
                  <Text style={styles.languageName}>{lang.name}</Text>
                  <Text style={styles.nativeName}> ({lang.nativeName})</Text>
                </View>
                <Text style={styles.languageDescription}>{lang.description}</Text>
              </View>
            </View>
            {selectedLanguage === lang.id && (
              <Ionicons name="checkmark-circle" size={24} color="#6B4EFF" />
            )}
          </TouchableOpacity>
        ))}

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  card: {
    margin: 15,
    marginBottom: 30,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: '#757575',
    marginBottom: 20,
    lineHeight: 18,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  selectedItem: {
    backgroundColor: '#F0E6FF',
    borderRadius: 8,
  },
  languageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  flag: {
    fontSize: 30,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  languageName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
  },
  nativeName: {
    fontSize: 14,
    color: '#757575',
  },
  languageDescription: {
    fontSize: 12,
    color: '#9E9E9E',
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#757575',
    fontWeight: '500',
  },
  saveButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#6B4EFF',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default LanguageScreen;