
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card';

const UserProfileScreen = ({ navigation, route }) => {
  const { userId } = route.params || {};
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock user data
  const user = {
    id: userId,
    name: 'Priya Sharma',
    username: '@priya_finance',
    bio: 'Financial Coach | Helping women achieve financial independence | 10+ years experience',
    avatar: null,
    followers: 15234,
    following: 456,
    posts: 89,
    location: 'Mumbai, India',
    joined: 'March 2023',
    website: 'www.priyafinance.com',
  };

  const posts = [
    {
      id: '1',
      content: 'Just published a new article on tax saving strategies for women. Check it out! 📝',
      likes: 234,
      comments: 45,
      time: '2 days ago',
    },
    {
      id: '2',
      content: 'Hosting a free webinar on "Investment Basics for Beginners" this Saturday. Link in bio! 🎯',
      likes: 567,
      comments: 89,
      time: '5 days ago',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Cover Image */}
      <View style={styles.coverContainer}>
        <View style={styles.coverImage} />
      </View>

      {/* Profile Info */}
      <Card style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            {user.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.avatarText}>{user.name[0]}</Text>
            )}
          </View>
        </View>

        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userUsername}>{user.username}</Text>

        <View style={styles.userBio}>
          <Text style={styles.bioText}>{user.bio}</Text>
        </View>

        {/* Follow Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.followers.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.following.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.posts}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.followButton, isFollowing && styles.followingButton]}
            onPress={() => setIsFollowing(!isFollowing)}
          >
            <Text style={[styles.followButtonText, isFollowing && styles.followingButtonText]}>
              {isFollowing ? 'Following' : 'Follow'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.messageButton}>
            <Ionicons name="chatbubble-outline" size={20} color="#6B4EFF" />
            <Text style={styles.messageButtonText}>Message</Text>
          </TouchableOpacity>
        </View>

        {/* User Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={18} color="#757575" />
            <Text style={styles.detailText}>{user.location}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={18} color="#757575" />
            <Text style={styles.detailText}>Joined {user.joined}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="link-outline" size={18} color="#757575" />
            <Text style={[styles.detailText, styles.linkText]}>{user.website}</Text>
          </View>
        </View>
      </Card>

      {/* Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Photos</Text>
        </TouchableOpacity>
      </View>

      {/* Posts */}
      <View style={styles.postsContainer}>
        {posts.map((post, index) => (
          <Card key={index} style={styles.postCard}>
            <Text style={styles.postContent}>{post.content}</Text>
            <View style={styles.postStats}>
              <View style={styles.postStat}>
                <Ionicons name="heart-outline" size={16} color="#757575" />
                <Text style={styles.postStatText}>{post.likes}</Text>
              </View>
              <View style={styles.postStat}>
                <Ionicons name="chatbubble-outline" size={16} color="#757575" />
                <Text style={styles.postStatText}>{post.comments}</Text>
              </View>
              <Text style={styles.postTime}>{post.time}</Text>
            </View>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  coverContainer: {
    height: 150,
    backgroundColor: '#6B4EFF',
  },
  coverImage: {
    flex: 1,
    backgroundColor: '#6B4EFF',
    opacity: 0.8,
  },
  profileCard: {
    marginTop: -50,
    marginHorizontal: 15,
    marginBottom: 10,
    padding: 20,
    alignItems: 'center',
  },
  avatarContainer: {
    marginTop: -50,
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarText: {
    fontSize: 40,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#212121',
  },
  userUsername: {
    fontSize: 14,
    color: '#757575',
    marginTop: 2,
    marginBottom: 8,
  },
  userBio: {
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  bioText: {
    fontSize: 14,
    color: '#212121',
    textAlign: 'center',
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
  },
  statLabel: {
    fontSize: 12,
    color: '#757575',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E0E0E0',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  followButton: {
    flex: 1,
    backgroundColor: '#6B4EFF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  followingButton: {
    backgroundColor: '#F5F5F5',
  },
  followButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  followingButtonText: {
    color: '#6B4EFF',
  },
  messageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 5,
  },
  messageButtonText: {
    color: '#6B4EFF',
    fontSize: 14,
    fontWeight: '500',
  },
  detailsContainer: {
    width: '100%',
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  detailText: {
    fontSize: 13,
    color: '#757575',
  },
  linkText: {
    color: '#6B4EFF',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#6B4EFF20',
  },
  tabText: {
    fontSize: 14,
    color: '#757575',
  },
  activeTabText: {
    color: '#6B4EFF',
    fontWeight: '500',
  },
  postsContainer: {
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
  postCard: {
    marginBottom: 10,
    padding: 15,
  },
  postContent: {
    fontSize: 14,
    color: '#212121',
    lineHeight: 20,
    marginBottom: 10,
  },
  postStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  postStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  postStatText: {
    fontSize: 12,
    color: '#757575',
  },
  postTime: {
    fontSize: 11,
    color: '#9E9E9E',
    marginLeft: 'auto',
  },
});

export default UserProfileScreen;