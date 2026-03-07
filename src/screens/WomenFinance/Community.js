
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card';
import Button from '../../components/Button';

const Community = ({ language = 'en' }) => {
  const [showPostModal, setShowPostModal] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState([
    {
      id: '1',
      author: 'Priya S.',
      time: '2 hours ago',
      content: 'Just started my SIP journey! Any tips for first-time investors?',
      likes: 24,
      comments: 8,
      liked: false,
    },
    {
      id: '2',
      author: 'Ritu M.',
      time: '5 hours ago',
      content: 'Saved ₹5000 this month by following the budgeting tips from the app! 🎉',
      likes: 56,
      comments: 12,
      liked: true,
    },
    {
      id: '3',
      author: 'Anjali K.',
      time: '1 day ago',
      content: 'Attended a financial literacy workshop. Learned so much about tax planning!',
      likes: 89,
      comments: 23,
      liked: false,
    },
  ]);

  const isHindi = language === 'hi';

  const handleLike = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, likes: post.liked ? post.likes - 1 : post.likes + 1, liked: !post.liked }
        : post
    ));
  };

  const handleCreatePost = () => {
    if (!postTitle.trim() || !postContent.trim()) {
      alert(isHindi ? 'कृपया शीर्षक और सामग्री भरें' : 'Please fill title and content');
      return;
    }

    const newPost = {
      id: Date.now().toString(),
      author: 'You',
      time: isHindi ? 'अभी' : 'Just now',
      content: postContent,
      title: postTitle,
      likes: 0,
      comments: 0,
      liked: false,
    };

    setPosts([newPost, ...posts]);
    setPostTitle('');
    setPostContent('');
    setShowPostModal(false);
  };

  return (
    <View style={styles.container}>
      {/* Create Post Button */}
      <TouchableOpacity
        style={styles.createPostButton}
        onPress={() => setShowPostModal(true)}
      >
        <Ionicons name="create" size={24} color="#6B4EFF" />
        <Text style={styles.createPostText}>
          {isHindi ? 'नई पोस्ट बनाएं' : 'Create New Post'}
        </Text>
      </TouchableOpacity>

      {/* Posts List */}
      <ScrollView style={styles.postsList}>
        {posts.map((post) => (
          <Card key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.authorInfo}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{post.author[0]}</Text>
                </View>
                <View>
                  <Text style={styles.authorName}>{post.author}</Text>
                  <Text style={styles.postTime}>{post.time}</Text>
                </View>
              </View>
            </View>

            {post.title && (
              <Text style={styles.postTitle}>{post.title}</Text>
            )}

            <Text style={styles.postContent}>{post.content}</Text>

            <View style={styles.postStats}>
              <TouchableOpacity
                style={styles.statButton}
                onPress={() => handleLike(post.id)}
              >
                <Ionicons
                  name={post.liked ? 'heart' : 'heart-outline'}
                  size={20}
                  color={post.liked ? '#F44336' : '#757575'}
                />
                <Text style={styles.statText}>{post.likes}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.statButton}>
                <Ionicons name="chatbubble-outline" size={20} color="#757575" />
                <Text style={styles.statText}>{post.comments}</Text>
              </TouchableOpacity>
            </View>
          </Card>
        ))}
      </ScrollView>

      {/* Create Post Modal */}
      <Modal visible={showPostModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {isHindi ? 'नई पोस्ट' : 'Create Post'}
              </Text>
              <TouchableOpacity onPress={() => setShowPostModal(false)}>
                <Ionicons name="close" size={24} color="#212121" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.titleInput}
              placeholder={isHindi ? 'शीर्षक' : 'Title'}
              value={postTitle}
              onChangeText={setPostTitle}
            />

            <TextInput
              style={styles.contentInput}
              placeholder={isHindi ? 'आप क्या साझा करना चाहते हैं?' : 'What would you like to share?'}
              value={postContent}
              onChangeText={setPostContent}
              multiline
              numberOfLines={4}
            />

            <View style={styles.modalActions}>
              <Button
                title={isHindi ? 'रद्द करें' : 'Cancel'}
                onPress={() => setShowPostModal(false)}
                style={[styles.modalButton, styles.cancelButton]}
              />
              <Button
                title={isHindi ? 'पोस्ट करें' : 'Post'}
                onPress={handleCreatePost}
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  createPostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 15,
    padding: 15,
    borderRadius: 12,
    gap: 10,
  },
  createPostText: {
    fontSize: 16,
    color: '#6B4EFF',
    fontWeight: '500',
  },
  postsList: {
    flex: 1,
    paddingHorizontal: 15,
  },
  postCard: {
    marginBottom: 15,
    padding: 15,
  },
  postHeader: {
    marginBottom: 12,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#6B4EFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  postTime: {
    fontSize: 12,
    color: '#757575',
    marginTop: 2,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 8,
  },
  postContent: {
    fontSize: 14,
    color: '#212121',
    lineHeight: 20,
    marginBottom: 12,
  },
  postStats: {
    flexDirection: 'row',
    gap: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
  },
  statButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  statText: {
    fontSize: 13,
    color: '#757575',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
  },
  titleInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  contentInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 10,
  },
  modalButton: {
    flex: 1,
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
  },
});

export default Community;