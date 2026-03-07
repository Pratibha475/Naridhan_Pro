
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card';

const CommunityScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('feed');
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState([
    {
      id: '1',
      author: 'Priya Sharma',
      authorId: 'user1',
      time: '2 hours ago',
      content: 'Just started my SIP journey! Any tips for first-time investors? I\'m planning to invest ₹5000/month in index funds.',
      likes: 24,
      comments: 8,
      liked: false,
      saved: false,
      category: 'Investing',
    },
    {
      id: '2',
      author: 'Ritu Mehta',
      authorId: 'user2',
      time: '5 hours ago',
      content: 'Saved ₹5000 this month by following the 50-30-20 budgeting rule! 🎉 Small changes in daily habits lead to big savings.',
      likes: 56,
      comments: 12,
      liked: true,
      saved: false,
      category: 'Savings',
    },
    {
      id: '3',
      author: 'Anjali Kapoor',
      authorId: 'user3',
      time: '1 day ago',
      content: 'Attended a financial literacy workshop today. Learned so much about tax planning under Section 80C.',
      likes: 89,
      comments: 23,
      liked: false,
      saved: true,
      category: 'Tax Planning',
    },
  ]);

  const categories = ['All', 'Investing', 'Savings', 'Tax Planning', 'Emergency Fund'];

  const handleLike = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, likes: post.liked ? post.likes - 1 : post.likes + 1, liked: !post.liked }
        : post
    ));
  };

  const handleSave = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, saved: !post.saved }
        : post
    ));
  };

  const renderPost = ({ item }) => (
    <Card style={styles.postCard}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <TouchableOpacity
          style={styles.authorInfo}
          onPress={() => navigation.navigate('UserProfile', { userId: item.authorId })}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{item.author[0]}</Text>
          </View>
          <View>
            <Text style={styles.authorName}>{item.author}</Text>
            <Text style={styles.postTime}>{item.time}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Category Tag */}
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryText}>{item.category}</Text>
      </View>

      {/* Post Content */}
      <TouchableOpacity onPress={() => navigation.navigate('PostDetail', { postId: item.id })}>
        <Text style={styles.postContent}>{item.content}</Text>
      </TouchableOpacity>

      {/* Post Stats */}
      <View style={styles.postStats}>
        <View style={styles.statItem}>
          <Ionicons name="heart" size={16} color="#F44336" />
          <Text style={styles.statText}>{item.likes}</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="chatbubble-outline" size={16} color="#757575" />
          <Text style={styles.statText}>{item.comments}</Text>
        </View>
      </View>

      {/* Post Actions */}
      <View style={styles.postActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleLike(item.id)}
        >
          <Ionicons
            name={item.liked ? 'heart' : 'heart-outline'}
            size={22}
            color={item.liked ? '#F44336' : '#757575'}
          />
          <Text style={[styles.actionText, item.liked && styles.likedText]}>Like</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Comments', { postId: item.id })}
        >
          <Ionicons name="chatbubble-outline" size={22} color="#757575" />
          <Text style={styles.actionText}>Comment</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleSave(item.id)}
        >
          <Ionicons
            name={item.saved ? 'bookmark' : 'bookmark-outline'}
            size={22}
            color={item.saved ? '#6B4EFF' : '#757575'}
          />
          <Text style={[styles.actionText, item.saved && styles.savedText]}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => Alert.alert('Share', 'Share this post')}
        >
          <Ionicons name="share-social-outline" size={22} color="#757575" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

  const renderFeed = () => (
    <FlatList
      data={posts}
      renderItem={renderPost}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.feedContent}
      ListHeaderComponent={
        <>
          {/* Categories Scroll */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
          >
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryChip,
                  index === 0 && styles.categoryChipActive
                ]}
              >
                <Text style={[
                  styles.categoryChipText,
                  index === 0 && styles.categoryChipTextActive
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Trending Topics */}
          <Card style={styles.trendingCard}>
            <Text style={styles.trendingTitle}>Trending Topics</Text>
            <View style={styles.trendingTags}>
              <TouchableOpacity style={styles.trendingTag}>
                <Text style={styles.trendingTagText}>#SIP</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.trendingTag}>
                <Text style={styles.trendingTagText}>#EmergencyFund</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.trendingTag}>
                <Text style={styles.trendingTagText}>#TaxSaving</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </>
      }
    />
  );

  const renderDiscover = () => (
    <ScrollView style={styles.discoverContent}>
      <Text style={styles.sectionTitle}>Suggested Connections</Text>
      {[1, 2, 3].map((item) => (
        <Card key={item} style={styles.userCard}>
          <View style={styles.userInfo}>
            <View style={styles.userAvatar}>
              <Text style={styles.userAvatarText}>S</Text>
            </View>
            <View>
              <Text style={styles.userName}>Sarah Gupta</Text>
              <Text style={styles.userBio}>Financial Coach</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.connectButton}>
            <Text style={styles.connectButtonText}>Connect</Text>
          </TouchableOpacity>
        </Card>
      ))}
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#757575" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search community..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9E9E9E"
          />
        </View>
        <TouchableOpacity style={styles.notificationIcon}>
          <Ionicons name="notifications-outline" size={24} color="#212121" />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationCount}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'feed' && styles.activeTab]}
          onPress={() => setActiveTab('feed')}
        >
          <Ionicons
            name="home"
            size={20}
            color={activeTab === 'feed' ? '#6B4EFF' : '#757575'}
          />
          <Text style={[styles.tabText, activeTab === 'feed' && styles.activeTabText]}>
            Feed
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'discover' && styles.activeTab]}
          onPress={() => setActiveTab('discover')}
        >
          <Ionicons
            name="compass"
            size={20}
            color={activeTab === 'discover' ? '#6B4EFF' : '#757575'}
          />
          <Text style={[styles.tabText, activeTab === 'discover' && styles.activeTabText]}>
            Discover
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeTab === 'feed' ? renderFeed() : renderDiscover()}

      {/* Create Post FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreatePost')}
      >
        <Ionicons name="create" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 15,
  },
  notificationIcon: {
    position: 'relative',
    padding: 5,
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#F44336',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#6B4EFF',
  },
  tabText: {
    fontSize: 14,
    color: '#757575',
  },
  activeTabText: {
    color: '#6B4EFF',
    fontWeight: '500',
  },
  feedContent: {
    padding: 15,
  },
  categoriesScroll: {
    marginBottom: 15,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
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
  trendingCard: {
    marginBottom: 15,
    padding: 15,
  },
  trendingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 10,
  },
  trendingTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  trendingTag: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  trendingTagText: {
    fontSize: 12,
    color: '#6B4EFF',
  },
  postCard: {
    marginBottom: 15,
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6B4EFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  authorName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#212121',
  },
  postTime: {
    fontSize: 11,
    color: '#757575',
    marginTop: 2,
  },
  categoryContainer: {
    backgroundColor: '#F0E6FF',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 11,
    color: '#6B4EFF',
    fontWeight: '500',
  },
  postContent: {
    fontSize: 14,
    color: '#212121',
    lineHeight: 20,
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
    fontSize: 12,
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
  discoverContent: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 10,
    marginTop: 10,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  userAvatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatarText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#212121',
  },
  userBio: {
    fontSize: 12,
    color: '#757575',
    marginTop: 2,
  },
  connectButton: {
    backgroundColor: '#6B4EFF',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 15,
  },
  connectButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6B4EFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default CommunityScreen;