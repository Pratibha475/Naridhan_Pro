

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card';
import Button from '../../components/Button';

const CreatePostScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = [
    'Investing',
    'Savings',
    'Tax Planning',
    'Emergency Fund',
    'Career',
    'Business',
    'Budgeting',
    'Insurance',
    'Retirement',
  ];

  const handleCreatePost = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title');
      return;
    }

    if (!content.trim()) {
      Alert.alert('Error', 'Please enter post content');
      return;
    }

    if (!category) {
      Alert.alert('Error', 'Please select a category');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Success',
        'Your post has been created successfully',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
    }, 1500);
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>Create New Post</Text>
        <Text style={styles.subtitle}>
          Share your thoughts, questions, or experiences with the community
        </Text>

        {/* Title Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Title</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Give your post a title"
              value={title}
              onChangeText={setTitle}
              maxLength={100}
            />
          </View>
          <Text style={styles.charCount}>{title.length}/100</Text>
        </View>

        {/* Category Selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
          >
            {categories.map((cat, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryChip,
                  category === cat && styles.categoryChipActive
                ]}
                onPress={() => setCategory(cat)}
              >
                <Text style={[
                  styles.categoryChipText,
                  category === cat && styles.categoryChipTextActive
                ]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Content Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Content</Text>
          <View style={styles.contentContainer}>
            <TextInput
              style={styles.contentInput}
              placeholder="What would you like to share?"
              value={content}
              onChangeText={setContent}
              multiline
              numberOfLines={8}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Post Options */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionButton}>
            <Ionicons name="image-outline" size={24} color="#6B4EFF" />
            <Text style={styles.optionText}>Add Image</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton}>
            <Ionicons name="link-outline" size={24} color="#6B4EFF" />
            <Text style={styles.optionText}>Add Link</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton}>
            <Ionicons name="pricetag-outline" size={24} color="#6B4EFF" />
            <Text style={styles.optionText}>Add Tags</Text>
          </TouchableOpacity>
        </View>

        {/* Post Settings */}
        <Card style={styles.settingsCard}>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="globe-outline" size={20} color="#757575" />
              <Text style={styles.settingLabel}>Post Privacy</Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>Public</Text>
              <Ionicons name="chevron-down" size={18} color="#757575" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="notifications-off-outline" size={20} color="#757575" />
              <Text style={styles.settingLabel}>Comment Settings</Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>Anyone can comment</Text>
              <Ionicons name="chevron-down" size={18} color="#757575" />
            </View>
          </TouchableOpacity>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button
            title="Cancel"
            onPress={() => navigation.goBack()}
            style={styles.cancelButton}
            textStyle={{ color: '#757575' }}
          />
          <Button
            title={loading ? 'Posting...' : 'Post'}
            onPress={handleCreatePost}
            loading={loading}
            style={styles.postButton}
          />
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
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  input: {
    padding: 12,
    fontSize: 15,
  },
  charCount: {
    fontSize: 11,
    color: '#9E9E9E',
    textAlign: 'right',
    marginTop: 4,
  },
  categoriesScroll: {
    flexDirection: 'row',
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  categoryChipActive: {
    backgroundColor: '#6B4EFF',
    borderColor: '#6B4EFF',
  },
  categoryChipText: {
    fontSize: 13,
    color: '#757575',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  contentContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  contentInput: {
    padding: 12,
    fontSize: 15,
    minHeight: 150,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  optionButton: {
    alignItems: 'center',
  },
  optionText: {
    fontSize: 11,
    color: '#757575',
    marginTop: 4,
  },
  settingsCard: {
    marginBottom: 20,
    padding: 0,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  settingLabel: {
    fontSize: 14,
    color: '#212121',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  settingValue: {
    fontSize: 13,
    color: '#757575',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  postButton: {
    flex: 1,
  },
});

export default CreatePostScreen;