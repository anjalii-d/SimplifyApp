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
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// IMPORTING THE LOCAL LESSONS DATA FILE
import lessonsData from './lessonsData';

const { width } = Dimensions.get('window');

const categoryThemes = {
  "Budgeting & Spending": { color: '#FFD700', icon: '💰', bgColor: '#FFECB3' },
  "Saving & Investing": { color: '#4CAF50', icon: '📈', bgColor: '#E8F5E9' },
  "Credit & Debt Management": { color: '#FF6347', icon: '💳', bgColor: '#FFEBEE' },
  "Income & Taxes": { color: '#8A2BE2', icon: '💸', bgColor: '#EDE7F6' },
  "Financial Planning & Milestones": { color: '#00BFFF', icon: '🚀', bgColor: '#E0F7FA' },
  "Financial Literacy & Consumer Awareness": { color: '#FF4500', icon: '💡', bgColor: '#FFF3E0' },
  "Your Future/Future Goals in Finance": { color: '#6A5ACD', icon: '🔮', bgColor: '#E6E6FA' }
};

export default function Money101Screen({ navigation }) {
  const [groupedLessons, setGroupedLessons] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [completedLessons, setCompletedLessons] = useState(new Set());

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

  // Use useEffect to process the local lessonsData
  useEffect(() => {
    const processLessons = () => {
      setLoading(true);
      setError(null);
      try {
        // Group lessons by category from the imported lessonsData
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

    loadCompletedLessons().then(() => {
      processLessons();
    });

    const unsubscribeFocus = navigation.addListener('focus', () => {
      loadCompletedLessons();
    });

    return unsubscribeFocus;
  }, [navigation, loadCompletedLessons]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadCompletedLessons();
    // Simulate a network request or data processing if needed
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
                <Text style={styles.categoryCardCount}>{groupedLessons[category]?.length || 0} Lessons</Text>
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

        <View style={[styles.roadmapStartNode, { backgroundColor: theme.color }]}>
          <Text style={styles.roadmapNodeText}>Start Your Adventure!</Text>
        </View>

        {lessonsInCurrentCategory.map((lesson, index) => {
          const isCompleted = completedLessons.has(lesson.id);
          return (
            <React.Fragment key={lesson.id}>
              <View style={[styles.roadmapConnector, { backgroundColor: theme.color }]} />

              <TouchableOpacity
                style={[
                  styles.lessonRoadmapNode,
                  { backgroundColor: isCompleted ? '#2ecc71' : '#3498db' },
                  isCompleted && styles.lessonRoadmapNodeCompleted
                ]}
                onPress={() => {
                  console.log(`Navigating to lesson: ${lesson.id}`);
                  // PASS THE ENTIRE LESSON OBJECT HERE
                  navigation.navigate('LessonDetail', { lesson: lesson, onLessonComplete: loadCompletedLessons });
                }}
              >
                <Text style={styles.lessonRoadmapTitle}>{lesson.title}</Text>
                <Text style={styles.lessonRoadmapTime}>{lesson.time}</Text>
                {isCompleted && <Text style={styles.lessonCompletedText}>✅ Completed!</Text>}
              </TouchableOpacity>
            </React.Fragment>
          );
        })}

        {lessonsInCurrentCategory.length > 0 && <View style={[styles.roadmapConnector, { backgroundColor: theme.color }]} />}

        {lessonsInCurrentCategory.length > 0 && (
          <TouchableOpacity
            style={[styles.quizRoadmapNode, { backgroundColor: theme.color }]}
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

      {selectedCategory && (
        <TouchableOpacity style={styles.backToCategoriesButton} onPress={() => setSelectedCategory(null)}>
          <Text style={styles.backToCategoriesButtonText}>← Back to Categories</Text>
        </TouchableOpacity>
      )}

      {selectedCategory === null ? renderCategoriesView() : renderCategoryRoadmapView()}
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
  scrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  categoryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ccc',
  },
  categoryCardIcon: {
    fontSize: 48,
    marginBottom: 10,
  },
  categoryCardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 5,
    textAlign: 'center',
  },
  categoryCardCount: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  roadmapScrollContent: {
    paddingHorizontal: 25,
    paddingVertical: 30,
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
  },
  roadmapHeader: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 35,
    textAlign: 'center',
  },
  roadmapStartNode: {
    backgroundColor: '#2ecc71',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#fff',
  },
  roadmapNodeText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  roadmapConnector: {
    width: 6,
    height: 50,
    backgroundColor: '#bdc3c7',
    marginBottom: 20,
    borderRadius: 3,
    position: 'relative',
  },
  lessonRoadmapNode: {
    backgroundColor: '#3498db',
    paddingVertical: 18,
    paddingHorizontal: 25,
    borderRadius: 20,
    marginBottom: 20,
    width: width * 0.8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 7,
    borderWidth: 2,
    borderColor: '#fff',
  },
  lessonRoadmapNodeCompleted: {
    backgroundColor: '#2ecc71',
    borderColor: '#27ae60',
  },
  lessonRoadmapTitle: {
    color: '#ffffff',
    fontSize: 20,
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
    backgroundColor: '#9b59b6',
    paddingVertical: 20,
    paddingHorizontal: 35,
    borderRadius: 35,
    marginTop: 20,
    width: width * 0.75,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 9,
    borderWidth: 3,
    borderColor: '#fff',
  },
  quizRoadmapTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  quizRoadmapTime: {
    color: '#e0cffc',
    fontSize: 16,
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
