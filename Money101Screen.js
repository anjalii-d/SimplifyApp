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
  Dimensions,
  Alert // Added Alert for quiz placeholder
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage for progress tracking

import lessonsData from './lessonsData'; // Import the hardcoded lessons data

const { width } = Dimensions.get('window'); // Get screen width for potential responsive styling

// Define unique colors and icons for categories
const categoryThemes = {
  "Budgeting & Spending": { color: '#FFD700', icon: '💰', bgColor: '#FFECB3' }, // Gold/Yellow
  "Saving & Investing": { color: '#4CAF50', icon: '📈', bgColor: '#E8F5E9' }, // Green
  "Credit & Debt Management": { color: '#FF6347', icon: '💳', bgColor: '#FFEBEE' }, // Tomato/Red-orange
  "Income & Taxes": { color: '#8A2BE2', icon: '💸', bgColor: '#EDE7F6' }, // Blue Violet
  "Financial Planning & Milestones": { color: '#00BFFF', icon: '🚀', bgColor: '#E0F7FA' }, // Deep Sky Blue
  "Financial Literacy & Consumer Awareness": { color: '#FF4500', icon: '💡', bgColor: '#FFF3E0' }, // Orange Red
  "Your Future/Future Goals in Finance": { color: '#6A5ACD', icon: '🔮', bgColor: '#E6E6FA' } // Slate Blue
};


export default function Money101Screen({ navigation }) {
  const [groupedLessons, setGroupedLessons] = useState({}); // Stores lessons grouped by category
  const [categories, setCategories] = useState([]); // Stores sorted list of category names
  const [selectedCategory, setSelectedCategory] = useState(null); // State to track selected category
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false); // Can keep for visual refresh, but won't fetch
  const [completedLessons, setCompletedLessons] = useState(new Set()); // Stores IDs of completed lessons

  // Function to load completed lessons from AsyncStorage
  const loadCompletedLessons = useCallback(async () => {
    try {
      const storedCompletedLessons = await AsyncStorage.getItem('completedLessons');
      if (storedCompletedLessons) {
        setCompletedLessons(new Set(JSON.parse(storedCompletedLessons)));
      }
    } catch (e) {
      console.error("Failed to load completed lessons from AsyncStorage", e);
    }
  }, []);

  // Process hardcoded lessons and load completed status on component mount/focus
  useEffect(() => {
    const processLessons = () => {
      setLoading(true);
      setError(null);
      try {
        // Group lessons by category
        const tempGroupedLessons = lessonsData.reduce((acc, lesson) => {
          const category = lesson.category || 'Uncategorized';
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(lesson);
          return acc;
        }, {});

        // Sort lessons within each category by their 'order' property
        Object.keys(tempGroupedLessons).forEach(category => {
          tempGroupedLessons[category].sort((a, b) => a.order - b.order);
        });

        // Get and sort category names
        const sortedCategoryNames = Object.keys(tempGroupedLessons).sort();

        setGroupedLessons(tempGroupedLessons);
        setCategories(sortedCategoryNames);
        setLoading(false);
        console.log("Loaded and grouped all hardcoded lessons.");
      } catch (err) {
        console.error("Error processing hardcoded lessons:", err);
        setError("Failed to load lessons from internal data.");
        setLoading(false);
      }
    };

    // Load completed lessons and then process the static lesson data
    loadCompletedLessons().then(() => {
      processLessons();
    });

    // Add a listener for when the screen comes into focus
    // This ensures completed lessons are reloaded if a lesson quiz was just finished
    const unsubscribeFocus = navigation.addListener('focus', () => {
      loadCompletedLessons();
    });

    return unsubscribeFocus; // Clean up the focus listener
  }, [navigation, loadCompletedLessons]); // Re-run effect if navigation or loadCompletedLessons changes

  // onRefresh will just simulate loading, no actual data fetch
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadCompletedLessons(); // Reload completed lessons on refresh
    // Simulate a network request or data processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  }, [loadCompletedLessons]);

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
        <TouchableOpacity style={styles.retryButton} onPress={() => setLoading(true)}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // --- Render Functions for Different Views ---

  // Renders the initial view with a list of categories
  const renderCategoriesView = () => {
    return (
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {categories.length > 0 ? (
          categories.map((category) => {
            const theme = categoryThemes[category] || { color: '#7f8c8d', icon: '❓', bgColor: '#F5F5F5' };
            return (
              <TouchableOpacity
                key={category}
                style={[styles.categoryCard, { backgroundColor: theme.bgColor, borderColor: theme.color }]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={styles.categoryCardIcon}>{theme.icon}</Text>
                <Text style={[styles.categoryCardTitle, { color: theme.color }]}>{category}</Text>
                <Text style={styles.categoryCardCount}>{groupedLessons[category].length} Lessons</Text>
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={styles.noLessonsContainer}>
            <Text style={styles.noLessonsText}>No categories or lessons available.</Text>
            <TouchableOpacity style={styles.retryButton} onPress={() => setLoading(true)}>
              <Text style={styles.retryButtonText}>Reload Categories</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    );
  };

  // Renders the roadmap view for a selected category
  const renderCategoryRoadmapView = () => {
    const lessonsInCurrentCategory = groupedLessons[selectedCategory] || [];
    const theme = categoryThemes[selectedCategory] || { color: '#7f8c8d', icon: '❓', bgColor: '#F5F5F5' };

    return (
      <ScrollView
        contentContainerStyle={[styles.roadmapScrollContent, { backgroundColor: theme.bgColor }]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={[styles.roadmapHeader, { color: theme.color }]}>{selectedCategory} Journey</Text>

        {/* Starting Point of the Roadmap */}
        <View style={[styles.roadmapStartNode, { backgroundColor: theme.color }]}>
          <Text style={styles.roadmapNodeText}>Start Your Adventure!</Text>
        </View>

        {lessonsInCurrentCategory.map((lesson, index) => {
          const isCompleted = completedLessons.has(lesson.id);
          return (
            <React.Fragment key={lesson.id}>
              {/* Connector Line */}
              <View style={[styles.roadmapConnector, { backgroundColor: theme.color }]} />

              {/* Lesson Node */}
              <TouchableOpacity
                style={[
                  styles.lessonRoadmapNode,
                  { backgroundColor: isCompleted ? '#2ecc71' : '#3498db' }, // Green if completed, blue otherwise
                  isCompleted && styles.lessonRoadmapNodeCompleted // Apply completed specific styles
                ]}
                onPress={() => {
                  console.log(`Navigating to lesson: ${lesson.id}`);
                  navigation.navigate('LessonDetail', { lessonId: lesson.id, onLessonComplete: loadCompletedLessons });
                }}
              >
                <Text style={styles.lessonRoadmapTitle}>{lesson.title}</Text>
                <Text style={styles.lessonRoadmapTime}>{lesson.time}</Text>
                {isCompleted && <Text style={styles.lessonCompletedText}>✅ Completed!</Text>}
              </TouchableOpacity>
            </React.Fragment>
          );
        })}

        {/* Connector to Quiz */}
        {lessonsInCurrentCategory.length > 0 && <View style={[styles.roadmapConnector, { backgroundColor: theme.color }]} />}

        {/* Unit Quiz Node (Final Stop) */}
        {lessonsInCurrentCategory.length > 0 && (
          <TouchableOpacity
            style={[styles.quizRoadmapNode, { backgroundColor: theme.color }]} // Use category color for quiz node
            onPress={() => Alert.alert("Unit Quiz", "This unit quiz will test your knowledge of all lessons in this category! Coming soon.")}
          >
            <Text style={styles.quizRoadmapTitle}>Unit Quiz!</Text>
            <Text style={styles.quizRoadmapTime}>Test Your Knowledge</Text>
          </TouchableOpacity>
        )}

      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Money 101: Financial Literacy</Text>

      {/* Back button visible only when a category is selected (on roadmap view) */}
      {selectedCategory && (
        <TouchableOpacity style={styles.backToCategoriesButton} onPress={() => setSelectedCategory(null)}>
          <Text style={styles.backToCategoriesButtonText}>← Back to Categories</Text>
        </TouchableOpacity>
      )}

      {/* Conditional rendering based on selectedCategory state */}
      {selectedCategory ? renderCategoryRoadmapView() : renderCategoriesView()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    paddingTop: 20, // Adjusted for status bar
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  backToCategoriesButton: {
    alignSelf: 'flex-start',
    marginLeft: 15,
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  backToCategoriesButtonText: {
    fontSize: 16,
    color: '#34495e',
    fontWeight: '600',
  },
  // --- Category Grid Styles (Initial View) ---
  scrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  categoryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18, // More rounded
    padding: 20,
    marginBottom: 18, // More space
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, // Deeper shadow
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    alignItems: 'center',
    borderWidth: 3, // Border for theme color
    borderColor: '#ccc', // Default border color
  },
  categoryCardIcon: {
    fontSize: 48, // Larger icon
    marginBottom: 10,
  },
  categoryCardTitle: {
    fontSize: 24, // Larger title
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 5,
    textAlign: 'center',
  },
  categoryCardCount: {
    fontSize: 16,
    color: '#7f8c8d',
  },

  // --- Roadmap View Styles ---
  roadmapScrollContent: {
    paddingHorizontal: 25, // More padding
    paddingVertical: 30, // More padding
    alignItems: 'center', // Center roadmap items
    backgroundColor: '#f0f4f8', // Default background, overridden by theme.bgColor
  },
  roadmapHeader: {
    fontSize: 28, // Larger header
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 35, // More space
    textAlign: 'center',
  },
  roadmapStartNode: {
    backgroundColor: '#2ecc71', // Green for start
    paddingVertical: 15, // Larger padding
    paddingHorizontal: 30, // Larger padding
    borderRadius: 30, // More rounded
    marginBottom: 20, // More space
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#fff', // White border
  },
  roadmapNodeText: {
    color: '#ffffff',
    fontSize: 18, // Larger text
    fontWeight: 'bold',
  },
  roadmapConnector: {
    width: 6, // Thicker line
    height: 50, // Longer line
    backgroundColor: '#bdc3c7', // Grey line
    marginBottom: 20, // More space
    borderRadius: 3, // Slightly rounded ends
    position: 'relative',
  },
  // Add a small arrow to the connector (visual only, not actual SVG)
  // This would typically be done with a pseudo-element in web, or a separate View in RN
  // For simplicity here, I'll rely on the line and node shapes.
  lessonRoadmapNode: {
    backgroundColor: '#3498db', // Blue for lessons
    paddingVertical: 18, // Larger padding
    paddingHorizontal: 25, // Larger padding
    borderRadius: 20, // More rounded
    marginBottom: 20, // More space
    width: width * 0.8, // Take up 80% of screen width
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 7,
    borderWidth: 2,
    borderColor: '#fff', // White border
  },
  lessonRoadmapNodeCompleted: {
    backgroundColor: '#2ecc71', // Green if completed
    borderColor: '#27ae60', // Darker green border
  },
  lessonRoadmapTitle: {
    color: '#ffffff',
    fontSize: 20, // Larger title
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  lessonRoadmapTime: {
    color: '#e0f2f7',
    fontSize: 15,
  },
  lessonCompletedText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  quizRoadmapNode: {
    backgroundColor: '#9b59b6', // Purple for quiz
    paddingVertical: 20, // Larger padding
    paddingHorizontal: 35, // Larger padding
    borderRadius: 35, // More rounded
    marginTop: 20, // Space after last connector
    width: width * 0.75, // Slightly wider for quiz
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 9,
    borderWidth: 3,
    borderColor: '#fff', // White border
  },
  quizRoadmapTitle: {
    color: '#ffffff',
    fontSize: 22, // Larger title
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  quizRoadmapTime: {
    color: '#e0cffc',
    fontSize: 16,
  },

  // --- General Loading/Error/No Content Styles ---
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
