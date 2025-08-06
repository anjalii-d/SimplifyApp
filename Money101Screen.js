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
  SafeAreaView,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// IMPORTING THE LOCAL LESSONS DATA FILE
import lessonsData from './lessonsData';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');

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

const categoryThemes = {
  "Budgeting & Spending": { color: '#FFD700', icon: '💰', bgColor: '#2c3e50' },
  "Saving & Investing": { color: '#2ecc71', icon: '📈', bgColor: '#2c3e50' },
  "Credit & Debt Management": { color: '#e74c3c', icon: '💳', bgColor: '#2c3e50' },
  "Income & Taxes": { color: '#9b59b6', icon: '💸', bgColor: '#2c3e50' },
  "Financial Planning & Milestones": { color: '#3498db', icon: '🚀', bgColor: '#2c3e50' },
  "Financial Literacy & Consumer Awareness": { color: '#f39c12', icon: '💡', bgColor: '#2c3e50' },
  "Your Future/Future Goals in Finance": { color: '#8e44ad', icon: '🔮', bgColor: '#2c3e50' }
};

export default function Money101Screen({ navigation }) {
  const [groupedLessons, setGroupedLessons] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertVisible(true);
  };

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
        <ActivityIndicator size="large" color="#FFD700" />
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
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FFD700" colors={["#FFD700"]} />
        }
      >
        {categories.length > 0 ? (
          categories.map((category) => {
            const theme = categoryThemes[category] || { color: '#7f8c8d', icon: '❓', bgColor: '#2c3e50' };
            const lessonCount = groupedLessons[category]?.length || 0;
            const completedCount = lessonsData.filter(
              (lesson) => lesson.category === category && completedLessons.has(lesson.id)
            ).length;
            const progress = lessonCount > 0 ? (completedCount / lessonCount) * 100 : 0;
            return (
              <TouchableOpacity
                key={category}
                style={styles.categoryCard}
                onPress={() => setSelectedCategory(category)}
              >
                <View style={styles.categoryCardHeader}>
                  <Text style={styles.categoryCardIcon}>{theme.icon}</Text>
                  <Text style={[styles.categoryCardTitle, { color: theme.color }]}>{category}</Text>
                </View>
                <View style={styles.categoryCardProgressContainer}>
                  <View style={styles.categoryCardProgressWrapper}>
                    <View style={[styles.categoryCardProgressBar, { width: `${progress}%`, backgroundColor: theme.color }]} />
                  </View>
                  <Text style={styles.categoryCardProgressText}>{completedCount}/{lessonCount} Complete</Text>
                </View>
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
    const theme = categoryThemes[selectedCategory] || { color: '#7f8c8d', icon: '❓', bgColor: '#1c1c3c' };

    return (
      <ScrollView
        contentContainerStyle={styles.roadmapScrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FFD700" colors={["#FFD700"]} />
        }
      >
        <Text style={[styles.roadmapHeader, { color: theme.color }]}>{selectedCategory} Journey</Text>

        <View style={styles.roadmapStartNode}>
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
                  { borderColor: theme.color },
                  isCompleted && styles.lessonRoadmapNodeCompleted
                ]}
                onPress={() => {
                  console.log(`Navigating to lesson: ${lesson.id}`);
                  // PASS THE ENTIRE LESSON OBJECT HERE
                  // FIXED: The navigation screen name must match the one in App.js
                  navigation.navigate('LessonDetailScreen', { lesson: lesson, onLessonComplete: loadCompletedLessons });
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
            style={[styles.quizRoadmapNode, { borderColor: theme.color }]}
            onPress={() => showAlert("This unit quiz will test your knowledge of all lessons in this category! Coming soon.")}
          >
            <Text style={styles.quizRoadmapTitle}>Unit Quiz!</Text>
            <Text style={styles.quizRoadmapTime}>Test Your Knowledge</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Money 101</Text>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })}>
          <Text style={styles.homeButtonText}>🏠 Home</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.subHeader}>
        {selectedCategory && (
          <TouchableOpacity style={styles.backToCategoriesButton} onPress={() => setSelectedCategory(null)}>
            <Text style={styles.backToCategoriesButtonText}>← Back</Text>
          </TouchableOpacity>
        )}
      </View>

      {selectedCategory === null ? renderCategoriesView() : renderCategoryRoadmapView()}

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
    backgroundColor: '#1c1c3c',
  },
  container: {
    flex: 1,
    backgroundColor: '#1c1c3c',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1c1c3c',
    borderBottomWidth: 2,
    borderBottomColor: '#FFD700',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#1c1c3c',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  backToCategoriesButton: {
    backgroundColor: '#3498db',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 3,
    borderColor: '#8e44ad',
  },
  backToCategoriesButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  homeButton: {
    backgroundColor: '#3498db',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 3,
    borderColor: '#8e44ad',
  },
  homeButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  scrollContent: {
    padding: 15,
  },
  categoryCard: {
    backgroundColor: '#2c3e50',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#556677',
  },
  categoryCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryCardIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  categoryCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    flexShrink: 1,
  },
  categoryCardProgressContainer: {
    marginTop: 10,
  },
  categoryCardProgressWrapper: {
    height: 10,
    backgroundColor: '#556677',
    borderRadius: 5,
  },
  categoryCardProgressBar: {
    height: '100%',
    borderRadius: 5,
  },
  categoryCardProgressText: {
    marginTop: 5,
    fontSize: 14,
    color: '#bdc3c7',
    textAlign: 'right',
  },
  roadmapScrollContent: {
    paddingHorizontal: 25,
    paddingVertical: 30,
    alignItems: 'center',
    backgroundColor: '#1c1c3c',
  },
  roadmapHeader: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
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
    backgroundColor: '#7f8c8d',
    marginBottom: 20,
    borderRadius: 3,
    position: 'relative',
  },
  lessonRoadmapNode: {
    backgroundColor: '#2c3e50',
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
    borderColor: '#3498db',
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
    color: '#bdc3c7',
    fontSize: 15,
  },
  lessonCompletedText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  quizRoadmapNode: {
    backgroundColor: '#2c3e50',
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
    borderColor: '#9b59b6',
  },
  quizRoadmapTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  quizRoadmapTime: {
    color: '#bdc3c7',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c3c',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#FFD700',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c3c',
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
    color: '#bdc3c7',
    marginBottom: 15,
  },
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
