// RealityFeedScreen.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from './firebaseConfig';

export default function RealityFeedScreen() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("RealityFeedScreen component mounted."); // Log 1

  useEffect(() => {
    console.log("useEffect triggered."); // Log 2

    const q = query(collection(db, 'stories'), orderBy('date', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log("onSnapshot callback triggered. Snapshot size:", snapshot.size); // Log 3
      const fetchedStories = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        console.log("Fetched document data:", data); // Log 4: See the raw data
        fetchedStories.push({
          id: doc.id,
          title: data.title,
          content: data.content,
          date: data.date ? data.date.toDate().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : 'N/A',
        });
      });
      console.log("Processed stories array:", fetchedStories); // Log 5: See the array sent to state
      setStories(fetchedStories);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching stories in onSnapshot:", err); // Log 6: More specific error
      setError("Failed to load stories. Please try again.");
      setLoading(false);
    });

    return () => {
      console.log("Unsubscribing from Firestore listener."); // Log 7
      unsubscribe();
    };
  }, []);

  if (loading) {
    console.log("Rendering loading state."); // Log 8
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Loading stories...</Text>
      </View>
    );
  }

  if (error) {
    console.log("Rendering error state:", error); // Log 9
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const renderStoryItem = ({ item }) => (
    <View style={styles.storyCard}>
      <Text style={styles.storyTitle}>{item.title}</Text>
      <Text style={styles.storyContent}>{item.content}</Text>
      <Text style={styles.storyDate}>{item.date}</Text>
    </View>
  );

  console.log("Rendering main content. Stories count:", stories.length); // Log 10
  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Reality Feed</Text>
      {stories.length === 0 ? (
        <Text style={styles.noStoriesText}>No stories yet. Check back soon!</Text>
      ) : (
        <FlatList
          data={stories}
          renderItem={renderStoryItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.flatListContent}
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
    padding: 10,
    paddingTop: 40,
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
  screenTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    textAlign: 'center',
    paddingTop: 10,
  },
  flatListContent: {
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
  storyDate: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'right',
  },
  noStoriesText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 50,
  },
});
