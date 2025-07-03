// RealityFeedScreen.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ScrollView, ActivityIndicator, TextInput } from 'react-native';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from './firebaseConfig';

export default function RealityFeedScreen() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('latest'); // State for active filter
  const [tagSearch, setTagSearch] = useState(''); // State for tag search input

  // Dummy filter options based on wireframe
  const filterOptions = ['Latest', 'Tags'];

  useEffect(() => {
    // Firebase query for stories, ordered by date descending (latest)
    // We'll expand this to handle other filters and tag search later
    const q = query(collection(db, 'stories'), orderBy('date', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedStories = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        fetchedStories.push({
          id: doc.id,
          title: data.title,
          content: data.content,
          date: data.date ? data.date.toDate().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : 'N/A',
          // Assuming stories might have tags for future filtering
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
      <Text style={styles.storyTitle}>{item.title}</Text>
      <Text style={styles.storyContent}>{item.content}</Text>
      <Text style={styles.storyDate}>{item.date}</Text>
      {item.tags && item.tags.length > 0 && (
        <View style={styles.tagsContainer}>
          {item.tags.map((tag, index) => (
            <Text key={index} style={styles.tagText}>#{tag}</Text>
          ))}
        </View>
      )}
    </View>
  );

  const handleAddStory = () => {
    console.log("Add your story button pressed!");
    // Future functionality: Navigate to a story submission screen
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
    paddingTop: 0, // Header handles top spacing
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
  storyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 5,
  },
  storyContent: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    marginBottom: 10,
  },
  tagsContainer: {
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
  storyDate: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'right',
    marginTop: 5,
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
  homeIconPlaceholder: {
    // This is the home icon next to 'Add your own'
    fontSize: 24, // Size of the emoji
  },
});
