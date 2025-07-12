// Money101Screen.js
import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
// Removed Firestore imports for lessons: import { collection, getDocs } from 'firebase/firestore';
// Removed db import as it's no longer used for lesson content, but keep if used elsewhere (e.g., auth)
// import { db } from './firebaseConfig';
// Removed useFocusEffect as data is now hardcoded and doesn't need to be fetched
// import { useFocusEffect } from '@react-navigation/native';

import lessonsData from './lessonsData'; // Import the hardcoded lessons data

export default function Money101Screen({ navigation }) {
  const [lessons, setLessons] = useState([]); // Will now store sorted hardcoded lessons
  const [loading, setLoading] = useState(true); // Still use loading state for initial processing
  const [error, setError] = useState(null); // Keep error state for potential data issues
  const [refreshing, setRefreshing] = useState(false); // Can keep for visual refresh, but won't fetch

  // Process hardcoded lessons on component mount
  useEffect(() => {
    try {
      // Group lessons by category and sort them
      const groupedLessons = lessonsData.reduce((acc, lesson) => {
        const category = lesson.category || 'Uncategorized';
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(lesson);
        return acc;
      }, {});

      // Sort categories alphabetically
      const sortedCategories = Object.keys(groupedLessons).sort();

      // Create a flat array of lessons, sorted by category and then by order
      const processedLessons = [];
      sortedCategories.forEach(category => {
        groupedLessons[category].sort((a, b) => a.order - b.order);
        processedLessons.push(...groupedLessons[category]);
      });

      setLessons(processedLessons);
      setLoading(false);
      console.log("Loaded all hardcoded lessons:", processedLessons.length);
    } catch (err) {
      console.error("Error processing hardcoded lessons:", err);
      setError("Failed to load lessons from internal data.");
      setLoading(false);
    }
  }, []); // Empty dependency array means this runs once on mount

  // onRefresh will just simulate loading, no actual data fetch
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // Simulate a network request or data processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Loading lessons...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        {/* No actual fetchLessons, just a visual retry */}
        <TouchableOpacity style={styles.retryButton} onPress={() => setLoading(true)}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Group lessons by category for display
  const groupedLessonsForDisplay = lessons.reduce((acc, lesson) => {
    const category = lesson.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(lesson);
    return acc;
  }, {});

  const categories = Object.keys(groupedLessonsForDisplay).sort();

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Money 101: Financial Literacy</Text>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {categories.length > 0 ? (
          categories.map((category) => (
            <View key={category} style={styles.categorySection}>
              <Text style={styles.categoryHeader}>{category}</Text>
              {groupedLessonsForDisplay[category].map((lesson) => (
                <TouchableOpacity
                  key={lesson.id}
                  style={styles.lessonCard}
                  onPress={() => {
                    // Navigate to LessonDetailScreen, passing the lesson's ID
                    console.log(`Navigating to lesson: ${lesson.id}`);
                    navigation.navigate('LessonDetail', { lessonId: lesson.id });
                  }}
                >
                  <Text style={styles.lessonTitle}>{lesson.title}</Text>
                  <Text style={styles.lessonDescription}>{lesson.description || lesson.content[0].substring(0, 100) + '...'}</Text>
                  <View style={styles.lessonMeta}>
                    <Text style={styles.lessonTime}>{lesson.time}</Text>
                    <Text style={styles.lessonProgress}>Progress: {lesson.progress || '0%'}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))
        ) : (
          <View style={styles.noLessonsContainer}>
            <Text style={styles.noLessonsText}>No lessons available yet.</Text>
            <TouchableOpacity style={styles.retryButton} onPress={() => setLoading(true)}>
              <Text style={styles.retryButtonText}>Reload Lessons</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  categorySection: {
    marginBottom: 20,
  },
  categoryHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 5,
  },
  lessonCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lessonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 8,
  },
  lessonCategory: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  lessonDescription: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  lessonMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  lessonTime: {
    fontSize: 14,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  lessonProgress: {
    fontSize: 14,
    color: '#2ecc71',
    fontWeight: 'bold',
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
    fontSize: 18,
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 15,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noLessonsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  noLessonsText: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 15,
  },
});
