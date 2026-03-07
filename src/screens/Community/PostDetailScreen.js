
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card';

const PostDetailScreen = ({ navigation, route }) => {
  const { postId } = route.params || {};
  const [commentText, setCommentText] = useState('');
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  // Mock post data
  const post = {
    id: postId,
    author: 'Priya Sharma',
    authorId: 'user1',
    avatar: null,
    time: '2 hours ago',
    content: 'Just started my SIP journey! Any tips for first-time investors? I\'m planning to invest ₹5000/month in index funds. Would love to hear from experienced investors here.',
    likes: 24,
    comments: [
      {
        id: 'c1',
        author: 'Ritu Mehta',
        avatar: null,
        time: '1 hour ago',
        content: 'Great start! I would recommend diversifying across large cap and mid cap funds. Also, don\'t forget to review your portfolio every 6 months.',
        likes: 5,
      },
      {
        id: 'c2',
        author: 'Anjali Kapoor',
        avatar: null,
        time: '45 mins ago',
        content: 'Start with a smaller amount if you\'re unsure. You can always increase your SIP amount later. Consistency is key!',
        likes: 3,
      },
      {
        id: 'c3',
        author: 'Neha Singh',
        avatar: null,
        time: '30 mins ago',
        content: 'Check out the AI Advisor in the app - it gives personalized recommendations based on your risk profile!',
        likes: 8,
      },
    ],
  };

  const handleAddComment = () => {
    if (!commentText.trim()) return;

    // Add comment logic here
    Alert.alert('Success', 'Comment added successfully');
    setCommentText('');
  };

  const handleLikeComment = (commentId) => {
    // Like comment logic
  };

  const handleReply = (commentId) => {
    // Reply to comment
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Post Card */}
        <Card style={styles.postCard}>
          <View style={styles.postHeader}>
            <TouchableOpacity
              style={styles.authorInfo}
              onPress={() => navigation.navigate('UserProfile', { userId: post.authorId })}
            >
              <View style={styles.avatar}>
                {post.avatar ? (
                  <Image source={{ uri: post.avatar }} style={styles.avatarImage} />
                ) : (
                  <Text style={styles.avatarText}>{post.author[0]}</Text>
                )}
              </View>
              <View>
                <Text style={styles.authorName}>{post.author}</Text>
                <Text style={styles.postTime}>{post.time}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <Text style={styles.postContent}>{post.content}</Text>

          <View style={styles.postStats}>
            <View style={styles.statItem}>
              <Ionicons name="heart" size={16} color="#F44336" />
              <Text style={styles.statText}>{post.likes}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="chatbubble-outline" size={16} color="#757575" />
              <Text style={styles.statText}>{post.comments.length} comments</Text>
            </View>
          </View>

          <View style={styles.postActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setLiked(!liked)}
            >
              <Ionicons
                name={liked ? 'heart' : 'heart-outline'}
                size={24}
                color={liked ? '#F44336' : '#757575'}
              />
              <Text style={[styles.actionText, liked && styles.likedText]}>
                {liked ? 'Liked' : 'Like'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="chatbubble-outline" size={24} color="#757575" />
              <Text style={styles.actionText}>Comment</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setSaved(!saved)}
            >
              <Ionicons
                name={saved ? 'bookmark' : 'bookmark-outline'}
                size={24}
                color={saved ? '#6B4EFF' : '#757575'}
              />
              <Text style={[styles.actionText, saved && styles.savedText]}>
                {saved ? 'Saved' : 'Save'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="share-social-outline" size={24} color="#757575" />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Comments Section */}
        <View style={styles.commentsSection}>
          <Text style={styles.commentsTitle}>Comments ({post.comments.length})</Text>

          {post.comments.map((comment, index) => (
            <View key={comment.id} style={styles.commentItem}>
              <View style={styles.commentHeader}>
                <View style={styles.commentAvatar}>
                  <Text style={styles.commentAvatarText}>{comment.author[0]}</Text>
                </View>
                <View style={styles.commentInfo}>
                  <Text style={styles.commentAuthor}>{comment.author}</Text>
                  <Text style={styles.commentTime}>{comment.time}</Text>
                </View>
              </View>

              <Text style={styles.commentContent}>{comment.content}</Text>

              <View style={styles.commentActions}>
                <TouchableOpacity
                  style={styles.commentAction}
                  onPress={() => handleLikeComment(comment.id)}
                >
                  <Ionicons name="heart-outline" size={16} color="#757575" />
                  <Text style={styles.commentActionText}>{comment.likes}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.commentAction}
                  onPress={() => handleReply(comment.id)}
                >
                  <Ionicons name="chatbubble-outline" size={16} color="#757575" />
                  <Text style={styles.commentActionText}>Reply</Text>
                </TouchableOpacity>
              </View>

              {index < post.comments.length - 1 && <View style={styles.commentDivider} />}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Comment Input */}
      <View style={styles.commentInputContainer}>
        <View style={styles.commentInputWrapper}>
          <TextInput
            style={styles.commentInput}
            placeholder="Write a comment..."
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
  postCard: {
    margin: 15,
    marginBottom: 10,
    padding: 15,
  },
  postHeader: {
    marginBottom: 10,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#6B4EFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
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
  postContent: {
    fontSize: 15,
    color: '#212121',
    lineHeight: 22,
    marginBottom: 12,
  },
  postStats: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 13,
    color: '#757575',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    fontSize: 11,
    color: '#757575',
    marginTop: 4,
  },
  likedText: {
    color: '#F44336',
  },
  savedText: {
    color: '#6B4EFF',
  },
  commentsSection: {
    marginHorizontal: 15,
    marginBottom: 80,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 15,
  },
  commentItem: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  commentAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentAvatarText: {
    fontSize: 12,
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
    fontSize: 13,
    color: '#212121',
    lineHeight: 18,
    marginBottom: 8,
    marginLeft: 40,
  },
  commentActions: {
    flexDirection: 'row',
    gap: 15,
    marginLeft: 40,
  },
  commentAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  commentActionText: {
    fontSize: 11,
    color: '#757575',
  },
  commentDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 8,
  },
  commentInputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    padding: 10,
  },
  commentInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  commentInput: {
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

export default PostDetailScreen;