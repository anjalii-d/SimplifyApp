// RealityFeedScreen.js
import React, { useState, useEffect, useCallback } from 'react'; // Added useCallback
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ScrollView, ActivityIndicator, TextInput, Alert } from 'react-native'; // Added Alert
import { collection, onSnapshot, query, orderBy, doc, updateDoc, increment } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import onAuthStateChanged
import { db } from './firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

// Predefined tag options (matching AddStoryScreen.js, now including 'Other')
const TAG_OPTIONS = ['Budgeting', 'Saving', 'Investing', 'Debt', 'Income', 'Goals', 'Challenge', 'Success', 'Learning', 'Other'];

// Key for AsyncStorage to store liked stories
const LIKED_STORIES_KEY_PREFIX = '@SimplifyApp:likedStories:';

export default function RealityFeedScreen({ navigation }) {
  const [stories, setStories] = useState([]); // Stores all fetched stories
  const [filteredStories, setFilteredStories] = useState([]); // Stores stories after applying filters
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('latest'); // 'latest' or a specific tag
  const [selectedFilterTag, setSelectedFilterTag] = useState(null); // New state for selected tag filter
  const [likedStories, setLikedStories] = useState(new Set()); // Client-side tracking of liked stories by ID
  const [userId, setUserId] = useState(null); // Current authenticated user ID
  const [authReady, setAuthReady] = useState(false); // Flag to ensure auth is ready

  // 1. Firebase Auth Listener & Load Liked Stories from AsyncStorage
  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        console.log("RealityFeedScreen: User authenticated. UID:", user.uid);
        // Load liked stories for this user
        try {
          const storedLikes = await AsyncStorage.getItem(`${LIKED_STORIES_KEY_PREFIX}${user.uid}`);
          if (storedLikes) {
            setLikedStories(new Set(JSON.parse(storedLikes)));
            console.log("RealityFeedScreen: Loaded liked stories for user:", user.uid);
          }
        } catch (e) {
          console.error("RealityFeedScreen: Failed to load liked stories from AsyncStorage", e);
        }
      } else {
        setUserId(null);
        setLikedStories(new Set()); // Clear likes if no user
        console.log("RealityFeedScreen: No user authenticated.");
      }
      setAuthReady(true);
      console.log("RealityFeedScreen: Auth state ready.");
    });

    return () => unsubscribeAuth();
  }, []);

  // 2. Effect to fetch all stories from Firestore (runs only when db and auth are ready)
  useEffect(() => {
    if (!db || !authReady) {
      // console.log("RealityFeedScreen: Waiting for DB or Auth to be ready...");
      return;
    }

    setLoading(true);
    setError(null);

    const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
    const storiesCollectionRef = collection(db, `artifacts/${appId}/public/data/stories`);

    const q = query(storiesCollectionRef, orderBy('timestamp', 'desc'));

    const unsubscribeFirestore = onSnapshot(q, (snapshot) => {
      const fetchedStories = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        fetchedStories.push({
          id: doc.id,
          text: data.text,
          userId: data.userId || 'Anonymous',
          timestamp: data.timestamp ? data.timestamp.toDate().toLocaleString() : 'N/A',
          likes: data.likes || 0,
          commentsCount: data.commentsCount || 0,
          tags: data.tags || [],
        });
      });
      setStories(fetchedStories);
      setLoading(false);
      console.log("RealityFeedScreen: Stories fetched from Firestore.");
    }, (err) => {
      console.error("RealityFeedScreen: Error fetching stories:", err);
      setError("Failed to load stories. Please try again.");
      setLoading(false);
    });

    return () => unsubscribeFirestore();
  }, [db, authReady]); // Depend on db and authReady

  // 3. Effect to filter stories whenever 'stories', 'activeFilter', or 'selectedFilterTag' changes
  useEffect(() => {
    let currentFilteredStories = [...stories];

    if (activeFilter === 'tags' && selectedFilterTag) {
      if (selectedFilterTag === 'Other') {
        const predefinedTagsLower = TAG_OPTIONS.filter(tag => tag !== 'Other').map(tag => tag.toLowerCase());
        currentFilteredStories = currentFilteredStories.filter(story =>
          story.tags.some(storyTag => !predefinedTagsLower.includes(storyTag.toLowerCase()))
        );
      } else {
        const filterTerm = selectedFilterTag.toLowerCase();
        currentFilteredStories = currentFilteredStories.filter(story =>
          story.tags.some(tag => tag.toLowerCase() === filterTerm)
        );
      }
    }
    setFilteredStories(currentFilteredStories);
  }, [stories, activeFilter, selectedFilterTag]);

  // 4. Handle Like Button Press (Updated for consistency and local persistence)
  const handleLike = useCallback(async (storyId) => {
    if (!authReady || !userId) {
      Alert.alert("Login Required", "Please log in to like stories!");
      return;
    }

    const storyRef = doc(db, `artifacts/${typeof __app_id !== 'undefined' ? __app_id : 'default-app-id'}/public/data/stories`, storyId);

    // Find the current story object from the filteredStories state for its current likes count
    const currentStory = filteredStories.find(s => s.id === storyId);
    if (!currentStory) {
      console.warn("RealityFeedScreen: Story not found in local state for liking:", storyId);
      return;
    }

    const isCurrentlyLiked = likedStories.has(storyId);
    let updatePayload = {};
    let optimisticChange = 0;

    // Determine the change based on current like status
    if (isCurrentlyLiked) {
      // User wants to UNLIKE: only decrement if current likes > 0
      if (currentStory.likes > 0) {
        updatePayload = { likes: increment(-1) };
        optimisticChange = -1;
      } else {
        // Already 0 likes, cannot go negative. No database update needed.
        console.log("RealityFeedScreen: Attempted to unlike a story with 0 likes. No change.");
        return; // Exit function, no update needed
      }
    } else {
      // User wants to LIKE: always increment
      updatePayload = { likes: increment(1) };
      optimisticChange = 1;
    }

    // Optimistically update client-side state first for immediate UI feedback
    setLikedStories(prevLikedStories => {
      const newLikedStories = new Set(prevLikedStories);
      if (isCurrentlyLiked) {
        newLikedStories.delete(storyId);
      } else {
        newLikedStories.add(storyId);
      }
      // Save updated liked stories to AsyncStorage
      AsyncStorage.setItem(`${LIKED_STORIES_KEY_PREFIX}${userId}`, JSON.stringify(Array.from(newLikedStories)))
        .catch(e => console.error("RealityFeedScreen: Failed to save liked stories to AsyncStorage:", e));
      return newLikedStories;
    });

    setFilteredStories(prevFilteredStories =>
      prevFilteredStories.map(story =>
        story.id === storyId
          ? { ...story, likes: story.likes + optimisticChange }
          : story
      )
    );

    try {
      // Perform the Firestore update
      await updateDoc(storyRef, updatePayload);
      console.log(`RealityFeedScreen: Like status updated for story ${storyId}. Change: ${optimisticChange}`);
    } catch (error) {
      console.error("RealityFeedScreen: Error updating like in Firestore:", error);
      Alert.alert("Like Failed", "Could not update like. Please try again.");

      // Revert optimistic updates if Firestore update fails
      setLikedStories(prevLikedStories => {
        const newLikedStories = new Set(prevLikedStories);
        if (isCurrentlyLiked) { // If we tried to unlike, but it failed, re-add it
          newLikedStories.add(storyId);
        } else { // If we tried to like, but it failed, remove it
          newLikedStories.delete(storyId);
        }
        AsyncStorage.setItem(`${LIKED_STORIES_KEY_PREFIX}${userId}`, JSON.stringify(Array.from(newLikedStories)))
          .catch(e => console.error("RealityFeedScreen: Failed to revert liked stories in AsyncStorage:", e));
        return newLikedStories;
      });
      setFilteredStories(prevFilteredStories =>
        prevFilteredStories.map(story =>
          story.id === storyId
            ? { ...story, likes: story.likes - optimisticChange }
            : story
        )
      );
    }
  }, [db, filteredStories, likedStories, authReady, userId]); // Dependencies for useCallback

  // Handle Comment Button Press
  const handleComment = (storyId) => {
    console.log(`Navigating to comments for story: ${storyId}`);
    // In a real app, you would navigate to a StoryDetailScreen or CommentScreen here:
    // navigation.navigate('StoryDetail', { storyId: storyId });
    Alert.alert("Comment Feature", "Comment feature coming soon! You'd go to a detailed story view here.");
  };

  const renderStoryItem = ({ item }) => {
    const isLiked = likedStories.has(item.id); // Check if this story is liked by current user
    return (
      <View style={styles.storyCard}>
        <Text style={styles.storyContent}>{item.text}</Text>
        <View style={styles.tagsContainer}>
          {item.tags.map((tag, index) => (
            <Text key={index} style={styles.tagText}>#{tag}</Text>
          ))}
        </View>
        <View style={styles.storyFooter}>
          <Text style={styles.storyMeta}>Posted by: {item.userId.substring(0, 8)}...</Text>
          <Text style={styles.storyMeta}>{item.timestamp}</Text>
        </View>
        <View style={styles.storyActions}>
          <TouchableOpacity style={styles.actionButton} onPress={() => handleLike(item.id)}>
            <Text style={[styles.actionText, isLiked && styles.likedActionText]}>
              {isLiked ? '❤️' : '🤍'} {item.likes}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => handleComment(item.id)}>
            <Text style={styles.actionText}>💬 {item.commentsCount}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleAddStory = () => {
    navigation.navigate('AddStory');
  };

  const handleFilterChange = (filterType, tag = null) => {
    if (filterType === 'latest') {
      setActiveFilter('latest');
      setSelectedFilterTag(null); // Clear selected tag
    } else if (filterType === 'tags') {
      setActiveFilter('tags');
      setSelectedFilterTag(tag); // Set the specific tag to filter by
    }
  };

  // Component to render at the bottom of the FlatList
  const ListFooter = () => (
    <View style={styles.listFooterContainer}>
      <TouchableOpacity style={styles.addStoryButton} onPress={handleAddStory}>
        <Text style={styles.addStoryButtonText}>+ Add your own</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Loading stories...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header with Search Icon (now more of a general 'filter' icon) */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reality Feed</Text>
        {/* You can keep or remove this icon, it's less critical now */}
        <TouchableOpacity onPress={() => console.log("Filter options are below!")} style={styles.searchIcon}>
          <Text style={styles.searchIconText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Filters Section */}
      <View style={styles.filtersSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterButtonsScrollView}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === 'latest' && styles.activeFilterButton,
            ]}
            onPress={() => handleFilterChange('latest')}
          >
            <Text style={[
              styles.filterButtonText,
              activeFilter === 'latest' && styles.activeFilterButtonText,
            ]}>
              Latest
            </Text>
          </TouchableOpacity>

          {TAG_OPTIONS.map((tag) => (
            <TouchableOpacity
              key={tag}
              style={[
                styles.filterButton,
                activeFilter === 'tags' && selectedFilterTag === tag && styles.activeFilterButton,
              ]}
              onPress={() => handleFilterChange('tags', tag)}
            >
              <Text style={[
                styles.filterButtonText,
                activeFilter === 'tags' && selectedFilterTag === tag && styles.activeFilterButtonText,
              ]}>
                #{tag}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Anonymous Stories List */}
      {filteredStories.length === 0 && !loading ? (
        <Text style={styles.noStoriesText}>
          {activeFilter === 'tags' && selectedFilterTag
            ? `No stories found for ${selectedFilterTag === 'Other' ? 'custom tags' : '#' + selectedFilterTag}.`
            : "No stories yet. Be the first to share!"}
        </Text>
      ) : (
        <FlatList
          data={filteredStories}
          renderItem={renderStoryItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.flatListContent}
          style={styles.storiesList}
          ListFooterComponent={ListFooter} // Add the ListFooterComponent here
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ecf0f1',
    paddingTop: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  searchIcon: {
    padding: 5,
  },
  searchIconText: {
    fontSize: 24,
    color: '#2c3e50',
  },
  // Filters Section Styles
  filtersSection: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom: 10,
  },
  filterButtonsScrollView: {
    paddingHorizontal: 15, // Padding for the horizontal scroll view
  },
  filterButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  activeFilterButton: {
    backgroundColor: '#3498db',
  },
  filterButtonText: {
    color: '#555',
    fontSize: 14,
    fontWeight: '600',
  },
  activeFilterButtonText: {
    color: '#ffffff',
  },
  // Stories List Styles
  storiesList: {
    flex: 1,
    width: '100%',
  },
  flatListContent: {
    paddingHorizontal: 10,
    paddingBottom: 20, // Add some padding here to ensure space above the global nav
  },
  storyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  storyContent: {
    fontSize: 16,
    color: '#34495e',
    lineHeight: 24,
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  tagText: {
    fontSize: 12,
    color: '#7f8c8d',
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  storyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 10,
  },
  storyMeta: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  storyActions: {
    flexDirection: 'row',
    marginTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: '#f8f8f8',
  },
  actionText: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: 'bold',
  },
  likedActionText: {
    color: '#e74c3c', // Red color for liked heart
  },
  noStoriesText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 50,
  },
  // Styles for the new ListFooterComponent
  listFooterContainer: {
    paddingVertical: 20, // Padding around the button within the footer
    alignItems: 'center', // Center the button
  },
  addStoryButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: '80%', // Make it a reasonable width
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addStoryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
