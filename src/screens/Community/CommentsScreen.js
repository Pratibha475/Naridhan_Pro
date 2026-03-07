
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card';

const CommentsScreen = ({ navigation, route }) => {
  const { postId } = route.params || {};
  const [commentText, setCommentText] = useState('');

  const comments = [
    {
      id: '1',
      author: 'Ritu Mehta',
      avatar: null,
      time: '1 hour ago',
      content: 'Great advice! I started with ₹2000/month and now I\'m at ₹15000/month. Consistency is key!',
      likes: 12,
      replies: [
        {
          id: 'r1',
          author: 'Priya Sharma',
          time: '45 mins ago',
          content: 'That\'s inspiring! How long did it take you to increase?',
        },
      ],
    },
    {
      id: '2',
      author: 'Anjali Kapoor',
      avatar: null,
      time: '2 hours ago',
      content: 'I would recommend looking into index funds for beginners. Lower risk and good returns over long term.',
      likes: 8,
      replies: [],
    },
    {
      id: '3',
      author: 'Neha Singh',
      avatar: null,
      time: '3 hours ago',
      content: 'Don\'t forget to consider your risk profile before investing. The AI Advisor in the app can help with that!',
      likes: 15,
      replies: [],
    },
  ];

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    // Add comment logic
    setCommentText('');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Comments Count */}
        <View style={styles.header}>
          <Text style={styles.commentsCount}>Comments ({comments.length})</Text>
        </View>

        {/* Comments List */}
        <View style={styles.commentsList}>
          {comments.map((comment, index) => (
            <View key={comment.id}>
              <Card style={styles.commentCard}>
                <View style={styles.commentHeader}>
                  <View style={styles.commentAvatar}>
                    <Text style={styles.avatarText}>{comment.author[0]}</Text>
                  </View>
                  <View style={styles.commentInfo}>
                    <Text style={styles.commentAuthor}>{comment.author}</Text>
                    <Text style={styles.commentTime}>{comment.time}</Text>
                  </View>
                </View>

                <Text style={styles.commentContent}>{comment.content}</Text>

                <View style={styles.commentActions}>
                  <TouchableOpacity style={styles.commentAction}>
                    <Ionicons name="heart-outline" size={16} color="#757575" />
                    <Text style={styles.actionText}>{comment.likes}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.commentAction}>
                    <Ionicons name="chatbubble-outline" size={16} color="#757575" />
                    <Text style={styles.actionText}>Reply</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.commentAction}>
                    <Ionicons name="time-outline" size={16} color="#757575" />
                    <Text style={styles.actionText}>3d</Text>
                  </TouchableOpacity>
                </View>

                {/* Replies */}
                {comment.replies.map((reply, replyIndex) => (
                  <View key={reply.id} style={styles.replyContainer}>
                    <View style={styles.replyLine} />
                    <View style={styles.replyContent}>
                      <View style={styles.replyHeader}>
                        <Text style={styles.replyAuthor}>{reply.author}</Text>
                        <Text style={styles.replyTime}>{reply.time}</Text>
                      </View>
                      <Text style={styles.replyText}>{reply.content}</Text>
                    </View>
                  </View>
                ))}
              </Card>

              {index < comments.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Comment Input */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Add a comment..."
            value={commentText}
            onChangeText={setCommentText}
            multiline
          />
          <TouchableOpacity
            style={[styles.sendButton, !commentText.trim() && styles.sendButtonDisabled]}
            onPress={handleAddComment}
            disabled={!commentText.trim()}
          >
            <Ionicons
              name="send"
              size={20}
              color={commentText.trim() ? '#6B4EFF' : '#BDBDBD'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  commentsCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  commentsList: {
    padding: 15,
    paddingBottom: 80,
  },
  commentCard: {
    marginBottom: 10,
    padding: 15,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  commentAvatar: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#6B4EFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  commentInfo: {
    flex: 1,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
  },
  commentTime: {
    fontSize: 10,
    color: '#757575',
  },
  commentContent: {
    fontSize: 14,
    color: '#212121',
    lineHeight: 20,
    marginBottom: 10,
    marginLeft: 45,
  },
  commentActions: {
    flexDirection: 'row',
    gap: 20,
    marginLeft: 45,
  },
  commentAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 12,
    color: '#757575',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
  },
  replyContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 20,
  },
  replyLine: {
    width: 2,
    backgroundColor: '#E0E0E0',
    marginRight: 10,
  },
  replyContent: {
    flex: 1,
  },
  replyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  replyAuthor: {
    fontSize: 13,
    fontWeight: '600',
    color: '#212121',
  },
  replyTime: {
    fontSize: 10,
    color: '#757575',
  },
  replyText: {
    fontSize: 13,
    color: '#212121',
    lineHeight: 18,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    padding: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    maxHeight: 80,
  },
  sendButton: {
    padding: 8,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});

export default CommentsScreen;