// RealityFeedScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView, RefreshControl, ScrollView } from 'react-native';
import { collection, onSnapshot, doc, getDoc, updateDoc, query, where } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from './firebaseConfig';
import { formatDistanceToNow } from 'date-fns';

// Predefined tag options
const TAG_OPTIONS = ['All', 'Budgeting', 'Saving', 'Investing', 'Debt', 'Income', 'Goals', 'Challenge', 'Success', 'Learning', 'Other'];

// Helper component for a custom alert box, replacing the native Alert
const CustomAlert = ({ message, visible, onClose }) => {
  if (!visible) return null;
  return (
    <View style={alertStyles.overlay}>
      <View style={alertStyles.container}>
        <Text style={alertStyles.message}>{message}</Text>
        <TouchableOpacity onPress={onClose} style={alertStyles.button}>
          <Text style={alertStyles.buttonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Main component for the Reality Feed screen
export default function RealityFeedScreen({ navigation }) {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userId, setUserId] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedFilterTag, setSelectedFilterTag] = useState('All');

  // Function to show the custom alert
  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertVisible(true);
  };

  // Firebase Auth listener to get the current user ID
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserId(currentUser.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Function to fetch stories from Firestore
  const fetchStories = useCallback(() => {
    const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
    const collectionPath = `artifacts/${appId}/public/data/stories`;

    let storiesQuery = collection(db, collectionPath);

    // Apply a filter based on the selected tag
    if (selectedFilterTag && selectedFilterTag !== 'All') {
      storiesQuery = query(storiesQuery, where('tags', 'array-contains', selectedFilterTag));
    }

    const unsubscribe = onSnapshot(storiesQuery, (querySnapshot) => {
      const fetchedStories = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      const sortedStories = fetchedStories.sort((a, b) => {
        const aTimestamp = a.timestamp?.toDate ? a.timestamp.toDate() : new Date(0);
        const bTimestamp = b.timestamp?.toDate ? b.timestamp.toDate() : new Date(0);
        return bTimestamp - aTimestamp;
      });
      
      setStories(sortedStories);
      setLoading(false);
      setRefreshing(false);
    }, (error) => {
      console.error("Error fetching stories:", error);
      showAlert("Failed to load stories. Please check your connection.");
      setLoading(false);
      setRefreshing(false);
    });

    return () => unsubscribe();
  }, [selectedFilterTag]);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchStories();
  }, [fetchStories]);

  // Function to handle liking a story
  const handleLike = async (storyId, currentLikes) => {
    if (!userId) {
      showAlert("You must be logged in to like stories.");
      return;
    }

    try {
      const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
      const storyRef = doc(db, `artifacts/${appId}/public/data/stories`, storyId);
      const storyDoc = await getDoc(storyRef);

      if (storyDoc.exists()) {
        const likedBy = storyDoc.data().likedBy || [];
        let newLikes = currentLikes;
        let newLikedBy = [...likedBy];

        if (newLikedBy.includes(userId)) {
          newLikes -= 1;
          newLikedBy = newLikedBy.filter(uid => uid !== userId);
        } else {
          newLikes += 1;
          newLikedBy.push(userId);
        }

        await updateDoc(storyRef, {
          likes: newLikes,
          likedBy: newLikedBy,
        });
      }
    } catch (error) {
      console.error("Error updating like:", error);
      showAlert("Failed to like the story. Please try again.");
    }
  };

  // Render each story item in the list
  const renderStoryItem = ({ item }) => {
    const isLiked = item.likedBy && item.likedBy.includes(userId);
    return (
      <View style={styles.storyCard}>
        <Text style={styles.storyText}>{item.text}</Text>
        <View style={styles.tagsContainer}>
          {item.tags && item.tags.map((tag, index) => (
            <Text key={index} style={styles.tagText}>{tag}</Text>
          ))}
        </View>
        <View style={styles.storyFooter}>
          <Text style={styles.userInfoText}>Adventurer ID: {item.userId.substring(0, 8)}...</Text>
          <Text style={styles.timestampText}>
            {item.timestamp ? formatDistanceToNow(item.timestamp.toDate(), { addSuffix: true }) : 'just now'}
          </Text>
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={() => handleLike(item.id, item.likes)}>
            <Text style={styles.actionText}>{isLiked ? '❤️' : '🤍'} {item.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showAlert("Comments feature is coming soon!")}>
            <Text style={styles.actionText}>💬 {item.commentsCount}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>The Village Board</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('AddStoryScreen')}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView horizontal style={styles.tagFilterScrollView} contentContainerStyle={styles.tagFilterContainer}>
        {TAG_OPTIONS.map(tag => (
          <TouchableOpacity
            key={tag}
            style={[styles.filterTagButton, selectedFilterTag === tag && styles.selectedFilterTagButton]}
            onPress={() => setSelectedFilterTag(tag)}
          >
            <Text style={[styles.filterTagText, selectedFilterTag === tag && styles.selectedFilterTagText]}>{tag}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#FFD700" />
        </View>
      ) : (
        <FlatList
          data={stories}
          keyExtractor={(item) => item.id}
          renderItem={renderStoryItem}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh} 
              tintColor="#FFD700" 
              colors={["#FFD700"]}
            />
          }
        />
      )}

      <CustomAlert 
        message={alertMessage}
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1c1c3c', // Dark blue background from HomeScreen
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1c1c3c',
    borderBottomWidth: 2,
    borderBottomColor: '#FFD700', // Gold border from HomeScreen
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700', // Gold title from HomeScreen
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  addButton: {
    backgroundColor: '#3498db', // Blue button from HomeScreen
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 3,
    borderColor: '#8e44ad', // Purple border from HomeScreen
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  tagFilterScrollView: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#556677',
  },
  tagFilterContainer: {
    alignItems: 'center',
  },
  filterTagButton: {
    backgroundColor: '#34495e',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#556677',
  },
  selectedFilterTagButton: {
    backgroundColor: '#3498db',
    borderColor: '#8e44ad',
  },
  filterTagText: {
    color: '#bdc3c7',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedFilterTagText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 15,
  },
  storyCard: {
    backgroundColor: '#2c3e50', // Darker card background from HomeScreen
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#556677', // Border color from HomeScreen
  },
  storyText: {
    fontSize: 16,
    color: '#e0e0e0', // Lighter text color for contrast
    lineHeight: 24,
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
    marginBottom: 10,
  },
  tagText: {
    backgroundColor: '#34495e', // Darker tag background
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 12,
    color: '#bdc3c7', // Light gray text
    marginRight: 5,
    marginBottom: 5,
  },
  storyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#556677', // Lighter border color for separation
    paddingTop: 10,
  },
  userInfoText: {
    fontSize: 12,
    color: '#FFD700', // Gold color for user ID
    fontWeight: 'bold',
  },
  timestampText: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  actionText: {
    fontSize: 16,
    color: '#2ecc71', // Green color for actions
    marginRight: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const alertStyles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#2c3e50',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#7f8c8d',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#e0e0e0',
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#8e44ad',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
