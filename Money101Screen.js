// Money101Screen.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Import your Firestore database instance

export default function Money101Screen({ navigation }) { // <-- Receive navigation prop
  const [lessons, setLessons] = useState({}); // Stores lessons grouped by category
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null); // State for selected category

  useEffect(() => {
    const fetchLessons = () => {
      // Query all lessons, ordered by category and then by the 'order' field within each category
      const q = query(collection(db, 'lessons'), orderBy('category'), orderBy('order'));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedLessons = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          fetchedLessons.push({
            id: doc.id,
            title: data.title,
            content: data.content, // Ensure content is an array of strings for LessonDetailScreen
            category: data.category,
            order: data.order,
            time: data.time || '5 min read', // Placeholder for 'time' as per wireframe
            progress: data.progress || '0%', // Placeholder for 'progress'
          });
        });

        // Group lessons by category
        const groupedLessons = fetchedLessons.reduce((acc, lesson) => {
          const category = lesson.category || 'Uncategorized'; // Default if category is missing
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(lesson);
          return acc;
        }, {});

        setLessons(groupedLessons);
        setLoading(false);

        // If no category is selected and we have categories, set the first one as default
        if (Object.keys(groupedLessons).length > 0 && selectedCategory === null) {
          setSelectedCategory(Object.keys(groupedLessons).sort()[0]);
        }

      }, (err) => {
        console.error("Error fetching lessons:", err);
        setError("Failed to load lessons. Please try again.");
        setLoading(false);
      });

      return () => unsubscribe();
    };

    fetchLessons();
  }, [selectedCategory]); // Re-run effect if selectedCategory changes (though not strictly needed for fetch, good for initial selection logic)

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    // No need to change currentView state here, as we're using navigation for detail
  };

  const handleLessonPress = (lessonId) => { // Now accepts lessonId directly
    // Navigate to the LessonDetailScreen, passing the lesson's ID
    navigation.navigate('LessonDetail', { lessonId: lessonId });
  };

  const renderCategoriesView = () => {
    const categories = Object.keys(lessons).sort();
    return (
      <View style={styles.contentWrapper}>
        {/* Header for Category View */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Money 101</Text>
          <View style={styles.headerIconPlaceholder}>
            <Text style={styles.headerIconText}>?</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.categoryGrid}>
          {categories.length > 0 ? (
            categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={styles.categoryCard}
                onPress={() => handleCategoryPress(category)}
              >
                <Text style={styles.categoryCardText}>{category}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noContentText}>No categories found.</Text>
          )}
        </ScrollView>
        {/* Home icon at the bottom */}
        <View style={styles.homeIconPlaceholder}>
          <Text style={{ fontSize: 24 }}>🏠</Text>
        </View>
      </View>
    );
  };

  const renderLessonsForCategoryView = () => {
    const lessonsInCategory = lessons[selectedCategory] || [];
    return (
      <View style={styles.contentWrapper}>
        {/* Header for Lessons List View */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setSelectedCategory(null)} style={styles.backButton}> {/* Go back to categories */}
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{selectedCategory}</Text>
          <View style={styles.headerIconPlaceholder}>
            <Text style={styles.headerIconText}>?</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.lessonsList}>
          {lessonsInCategory.length > 0 ? (
            lessonsInCategory.map((lesson) => (
              <TouchableOpacity
                key={lesson.id}
                style={styles.lessonListItem}
                onPress={() => handleLessonPress(lesson.id)} // Pass lesson.id
              >
                <Text style={styles.lessonListItemTitle}>{lesson.title}</Text>
                {/* Display a snippet of content, assuming it's a string for this view */}
                <Text style={styles.lessonListItemDesc}>{Array.isArray(lesson.content) ? lesson.content[0].substring(0, 70) + '...' : lesson.content.substring(0, 70) + '...'}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noContentText}>No lessons in this category yet.</Text>
          )}
        </ScrollView>
        {/* Home icon at the bottom */}
        <View style={styles.homeIconPlaceholder}>
          <Text style={{ fontSize: 24 }}>🏠</Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading financial wisdom...</Text>
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

  // Render either categories or lessons for a selected category
  return (
    <View style={styles.container}>
      {selectedCategory === null ? renderCategoriesView() : renderLessonsForCategoryView()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f0f4f8', // Light background
    paddingTop: 0, // <-- MODIFIED: Removed paddingTop
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
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
    backgroundColor: '#f0f4f8',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  // Header Styles (Common for all Money 101 views)
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
  headerIconPlaceholder: {
    width: 30, // Small circle placeholder
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIconText: {
    fontSize: 18,
    color: '#555',
  },
  backButton: {
    paddingRight: 15,
  },
  backButtonText: {
    fontSize: 24, // Larger back arrow
    color: '#3498db',
    fontWeight: 'bold',
  },

  // Category Grid Styles
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 15,
    flexGrow: 1,
  },
  categoryCard: {
    width: '45%', // Roughly two columns
    aspectRatio: 1, // Make it square
    backgroundColor: '#ffffff',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  categoryCardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
    textAlign: 'center',
  },

  // Lessons List Styles
  lessonsList: {
    padding: 15,
    flexGrow: 1,
  },
  lessonListItem: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  lessonListItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 5,
  },
  lessonListItemDesc: {
    fontSize: 14,
    color: '#555',
  },

  noContentText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 50,
    width: '100%',
  },
  homeIconPlaceholder: {
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 'auto', // Pushes it to the bottom
  },
});
