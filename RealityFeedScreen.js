// RealityFeedScreen.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ScrollView, ActivityIndicator, TextInput } from 'react-native';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { getAuth } from 'firebase/auth'; // Import getAuth to potentially get current user's ID for display

export default function RealityFeedScreen({ navigation}) { // Receive navigation prop
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('latest');
  const [tagSearch, setTagSearch] = useState('');

  // Dummy filter options based on wireframe
  const filterOptions = ['Latest', 'Tags'];

  useEffect(() => {
    // Query to the 'stories' collection, ordered by timestamp descending
    // This matches the 'timestamp' field saved by AddStoryScreen
    const q = query(collection(db, 'stories'), orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedStories = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        fetchedStories.push({
          id: doc.id,
          text: data.text, // 'text' is the field from AddStoryScreen
          userId: data.userId || 'Anonymous', // Display userId
          timestamp: data.timestamp ? data.timestamp.toDate().toLocaleString() : 'N/A', // Format timestamp
          likes: data.likes || 0,
          commentsCount: data.commentsCount || 0,
          // Assuming stories might have tags for future filtering, though not saved by AddStoryScreen yet
          tags: data.tags || [],
        });
      });
      setStories(fetchedStories);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching stories:", err);
      setError("Failed to load stories. Please try again.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const renderStoryItem = ({ item }) => (
    <View style={styles.storyCard}>
      <Text style={styles.storyContent}>{item.text}</Text>
      <View style={styles.storyFooter}>
        <Text style={styles.storyMeta}>Posted by: {item.userId.substring(0, 8)}...</Text> {/* Display truncated userId */}
        <Text style={styles.storyMeta}>{item.timestamp}</Text>
      </View>
      <View style={styles.storyActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>❤️ {item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>💬 {item.commentsCount}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleAddStory = () => {
    // Navigate to the AddStoryScreen
    navigation.navigate('AddStory');
  };

  const handleSearchIconPress = () => {
    console.log("Search icon pressed!");
    // Future functionality: Implement search logic or toggle search input visibility
  };

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
      {/* Header with Search Icon */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reality Feed</Text>
        <TouchableOpacity onPress={handleSearchIconPress} style={styles.searchIcon}>
          <Text style={styles.searchIconText}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Filters Section */}
      <View style={styles.filtersSection}>
        <View style={styles.filterButtonsContainer}>
          {filterOptions.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                activeFilter.toLowerCase() === filter.toLowerCase() && styles.activeFilterButton,
              ]}
              onPress={() => setActiveFilter(filter.toLowerCase())}
            >
              <Text style={[
                styles.filterButtonText,
                activeFilter.toLowerCase() === filter.toLowerCase() && styles.activeFilterButtonText,
              ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* #tag / Search Input Placeholder */}
        <View style={styles.tagSearchContainer}>
          <TextInput
            style={styles.tagSearchInput}
            placeholder="#tag / Search stories..."
            placeholderTextColor="#a0a0a0"
            value={tagSearch}
            onChangeText={setTagSearch}
          />
        </View>
      </View>

      {/* Anonymous Stories List */}
      {stories.length === 0 ? (
        <Text style={styles.noStoriesText}>No stories yet. Be the first to share!</Text>
      ) : (
        <FlatList
          data={stories}
          renderItem={renderStoryItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.flatListContent}
          style={styles.storiesList}
        />
      )}

      {/* Add Your Story Button with Home Icon */}
      <View style={styles.bottomActionContainer}>
        <TouchableOpacity style={styles.addStoryButton} onPress={handleAddStory}>
          <Text style={styles.addStoryButtonText}>+ Add your own</Text>
        </TouchableOpacity>
        {/* Home icon placeholder as per wireframe */}
        <View style={styles.homeIconPlaceholder}>
          <Text style={{ fontSize: 24 }}>🏠</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ecf0f1',
    paddingTop: 0, // <-- MODIFIED: Removed paddingTop
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
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom: 10,
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
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
  tagSearchContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  tagSearchInput: {
    fontSize: 14,
    color: '#333',
  },
  // Stories List Styles
  storiesList: {
    flex: 1,
    width: '100%',
  },
  flatListContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
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
  storyContent: { // Changed from storyTitle to storyContent for main text
    fontSize: 16,
    color: '#34495e',
    lineHeight: 24,
    marginBottom: 10,
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
  tagsContainer: { // Keeping tags container for future use, though not currently populated by AddStoryScreen
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  tagText: {
    fontSize: 12,
    color: '#7f8c8d',
    marginRight: 8,
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
  },
  noStoriesText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 50,
  },
  // Bottom Action Container (Add Story Button & Home Icon)
  bottomActionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  addStoryButton: {
    backgroundColor: '#2ecc71', // Green button
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25, // Pill shape
    flex: 1, // Allow button to take available space
    marginRight: 15, // Space from home icon
    alignItems: 'center',
  },
  addStoryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  homeIconPlaceholder: {fontSize: 24,},
});
