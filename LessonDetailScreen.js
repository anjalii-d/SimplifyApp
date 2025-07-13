// LessonDetailScreen.js
import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  Dimensions,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Image // Import Image component for future visual elements
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage for progress tracking

import lessonsData from './lessonsData'; // Import the hardcoded lessons data

const { width } = Dimensions.get('window');

export default function LessonDetailScreen({ route, navigation }) {
  const { lessonId, onLessonComplete } = route.params; // Get lesson ID and the callback for completion

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [quizStarted, setQuizStarted] = useState(false);
  const [quizResults, setQuizResults] = useState(null); // null: not taken, object: results
  const [userAnswers, setUserAnswers] = useState({}); // Stores answers for all questions by question.id
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scrollToIndex, setScrollToIndex] = useState(null); // State to hold the index to scroll to
  const [tempHighlightedIndex, setTempHighlightedIndex] = useState(null); // State for temporary highlight

  // State for current question's user input (used for TextInput/Radio buttons)
  const [userAnswer, setUserAnswer] = useState('');

  const scrollViewRef = useRef(null);
  // Use a Map for contentRefs for better management with dynamic indices
  const contentRefs = useRef(new Map());

  // Callback to set refs for content paragraphs
  const setContentRef = useCallback((element, index) => {
    if (element) {
      contentRefs.current.set(index, element);
    } else {
      contentRefs.current.delete(index); // Correctly delete if element is null
    }
  }, []);

  // Effect to handle scrolling to highlighted content
  useEffect(() => {
    if (scrollToIndex !== null && contentRefs.current.has(scrollToIndex) && scrollViewRef.current) {
      const targetRef = contentRefs.current.get(scrollToIndex);
      if (targetRef) {
        targetRef.measureLayout(
          scrollViewRef.current,
          (x, y, width, height) => {
            scrollViewRef.current.scrollTo({ y: y - 50, animated: true }); // Scroll slightly above the element
            setTempHighlightedIndex(scrollToIndex); // Apply temporary highlight
            // Remove highlight after a short delay
            setTimeout(() => {
              setTempHighlightedIndex(null);
            }, 3000); // Highlight for 3 seconds
          },
          (error) => {
            console.error("Layout measurement failed", error);
          }
        );
      }
      setScrollToIndex(null); // Reset scroll index after attempting to scroll
    }
  }, [scrollToIndex]);

  // Load lesson data from hardcoded data
  useEffect(() => {
    const loadLesson = () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedData = lessonsData.find(l => l.id === lessonId); // Find lesson by ID

        if (fetchedData) {
          // Validate structure for hardcoded data
          if (!Array.isArray(fetchedData.content)) {
            console.warn("Hardcoded lesson content is not an array. Please check data for lesson:", lessonId);
            fetchedData.content = [fetchedData.content || "No content available."];
          }
          if (!fetchedData.quiz || !Array.isArray(fetchedData.quiz.questions)) {
            console.warn("Hardcoded lesson quiz or quiz questions are missing/malformed. Please check data for lesson:", lessonId);
            fetchedData.quiz = { questions: [] };
          }

          setLesson({ id: lessonId, ...fetchedData });
          console.log("Loaded Hardcoded Lesson Data:", { id: lessonId, ...fetchedData });
          if (fetchedData.quiz && Array.isArray(fetchedData.quiz.questions)) {
              console.log(`Hardcoded Lesson "${fetchedData.title}" has ${fetchedData.quiz.questions.length} quiz questions.`);
          } else {
              console.log("Hardcoded Lesson has no quiz or malformed quiz questions.");
          }
          setError(null);
        } else {
          setError("Lesson not found in hardcoded data. Check lessonId.");
          setLesson(null);
        }
      } catch (err) {
        console.error("Error loading hardcoded lesson:", err);
        setError("Failed to load lesson. Please try again.");
        setLesson(null);
      } finally {
        setLoading(false);
      }
    };

    loadLesson();
  }, [lessonId]); // Re-load if lessonId changes

  // Effect to update local userAnswer when currentQuestionIndex changes
  useEffect(() => {
    if (quizStarted && lesson && lesson.quiz && lesson.quiz.questions[currentQuestionIndex]) {
      const questionId = lesson.quiz.questions[currentQuestionIndex].id;
      const savedAnswer = userAnswers[questionId] || '';
      setUserAnswer(savedAnswer); // Load saved answer for current question
      console.log(`[QUIZ DEBUG] useEffect - Loaded answer for Q ID ${questionId}: "${savedAnswer}"`);
    } else if (quizStarted && lesson && lesson.quiz && currentQuestionIndex >= lesson.quiz.questions.length) {
        console.log("[QUIZ DEBUG] useEffect - currentQuestionIndex is out of bounds, likely after quiz submission.");
        setUserAnswer(''); // Clear input if no question exists
    }
  }, [currentQuestionIndex, quizStarted, lesson, userAnswers]);


  // --- Quiz Logic ---
  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers(prev => {
        const newState = { ...prev, [questionId]: answer };
        console.log(`[QUIZ DEBUG] handleAnswerChange - Q ID: ${questionId}, Answer: "${answer}". Full userAnswers:`, newState);
        return newState;
    });
    setUserAnswer(answer); // Update local userAnswer state for TextInput/Radio
  };

  const checkQuizAnswer = (question, userAnswerToCheck) => {
    if (question.type === 'mc' || question.type === 'tf') {
      return userAnswerToCheck === question.correctAnswer;
    } else if (question.type === 'frq') {
      const normalizedUserAnswer = userAnswerToCheck ? userAnswerToCheck.toLowerCase().trim() : '';
      return Array.isArray(question.correctAnswer) && question.correctAnswer.some(correct =>
        normalizedUserAnswer === correct.toLowerCase().trim()
      );
    }
    return false;
  };

  const submitQuiz = async () => { // Made async to use await for AsyncStorage
    console.log("[QUIZ DEBUG] submitQuiz called.");
    if (!lesson || !lesson.quiz || lesson.quiz.questions.length === 0) {
        console.warn("[QUIZ DEBUG] submitQuiz: Lesson or quiz data missing/empty.");
        return;
    }

    let correctCount = 0;
    const incorrectQuestions = [];

    lesson.quiz.questions.forEach(q => {
      const userAnswerForQ = userAnswers[q.id];
      const isCorrect = checkQuizAnswer(q, userAnswerForQ);

      console.log(`[QUIZ DEBUG] Checking Q ID: ${q.id}, User Answer: "${userAnswerForQ}", Correct Answer in Data:`, q.correctAnswer);

      if (isCorrect) {
        correctCount++;
      } else {
        incorrectQuestions.push({
          questionId: q.id,
          relatedContentIndex: q.relatedContentIndex,
          userAnswer: userAnswerForQ || '',
          correctAnswer: q.correctAnswer, // This is where the correct answer from the hardcoded data is pulled
          questionText: q.questionText
        });
      }
    });

    setQuizResults({
      score: correctCount,
      total: lesson.quiz.questions.length,
      incorrectQuestions: incorrectQuestions,
    });
    setQuizStarted(false); // Go to results view
    console.log("[QUIZ DEBUG] Quiz Submitted. Results:", { score: correctCount, total: lesson.quiz.questions.length, incorrectQuestions: incorrectQuestions });

    // --- Mark Lesson as Completed if all correct ---
    if (correctCount === lesson.quiz.questions.length) {
      try {
        const storedCompletedLessons = await AsyncStorage.getItem('completedLessons');
        const completedLessonsArray = storedCompletedLessons ? JSON.parse(storedCompletedLessons) : [];
        if (!completedLessonsArray.includes(lessonId)) {
          completedLessonsArray.push(lessonId);
          await AsyncStorage.setItem('completedLessons', JSON.stringify(completedLessonsArray));
          console.log(`Lesson ${lessonId} marked as completed.`);
          // Call the callback to refresh progress on the Money101Screen
          if (onLessonComplete) {
            onLessonComplete();
          }
        }
      } catch (e) {
        console.error("Failed to save completed lesson to AsyncStorage", e);
      }
    }
  };

  const resetQuiz = () => {
    console.log("[QUIZ DEBUG] resetQuiz called.");
    setUserAnswers({});
    setQuizResults(null);
    setCurrentQuestionIndex(0);
    setQuizStarted(false);
    setScrollToIndex(null); // Reset scroll index
    setTempHighlightedIndex(null); // Clear temporary highlight
    setUserAnswer(''); // Clear current input
    // Scroll to top when quiz is reset
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  const handleNextQuestion = () => {
    console.log("[QUIZ DEBUG] Next Question button pressed!");
    console.log(`[QUIZ DEBUG] handleNextQuestion - currentQuestionIndex: ${currentQuestionIndex}, total questions: ${lesson.quiz.questions.length}`);
    console.log(`[QUIZ DEBUG] handleNextQuestion - currentQuestion.id: ${currentQuestion.id}. userAnswer (local state): "${userAnswer}". userAnswers[currentQuestion.id] (global state): "${userAnswers[currentQuestion.id]}"`);

    // Check if an answer has been provided for the current question before moving on
    if (!userAnswers[currentQuestion.id] || userAnswers[currentQuestion.id].trim() === '') {
      Alert.alert("Missing Answer", "Please select or type an answer before proceeding.");
      console.log("[QUIZ DEBUG] Alert: Missing Answer triggered.");
      return;
    }

    if (currentQuestionIndex < lesson.quiz.questions.length - 1) {
      console.log(`[QUIZ DEBUG] Advancing to next question: ${currentQuestionIndex + 1}`);
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      console.log("[QUIZ DEBUG] handleNextQuestion: Reached end of questions, calling submitQuiz (fallback).");
      submitQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    console.log("[QUIZ DEBUG] Previous Question button pressed!");
    if (currentQuestionIndex > 0) {
      console.log(`[QUIZ DEBUG] Going back to previous question: ${currentQuestionIndex - 1}`);
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
        console.log("[QUIZ DEBUG] Already on first question, cannot go back.");
    }
  };

  // Helper to check if all questions have been answered
  const areAllQuestionsAnswered = () => {
    if (!lesson || !lesson.quiz || !lesson.quiz.questions) {
        console.log("[QUIZ DEBUG] areAllQuestionsAnswered: Lesson or quiz data missing, returning false.");
        return false;
    }
    const allAnswered = lesson.quiz.questions.every(q => userAnswers[q.id] !== undefined && userAnswers[q.id] !== null && userAnswers[q.id] !== '');
    console.log(`[QUIZ DEBUG] areAllQuestionsAnswered() returns: ${allAnswered}. Current userAnswers:`, userAnswers);
    return allAnswered;
  };


  // Modified scrollToContent function to trigger state change
  const scrollToContent = (index) => {
    setQuizResults(null); // Hide quiz results
    setQuizStarted(false); // Go back to lesson content view
    setScrollToIndex(index); // Set the index, which will trigger the useEffect for scrolling
  };


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Loading lesson...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!lesson) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Lesson data is missing.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentQuestion = lesson.quiz?.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === lesson.quiz.questions.length - 1;

  // Render a single question
  const renderQuestion = (question) => {
    console.log(`[QUIZ DEBUG] Rendering Question ${question.id}. Current Index: ${currentQuestionIndex}. Local userAnswer state: "${userAnswer}".`);

    // Ensure questionText is a string before rendering
    const displayQuestionText = typeof question.questionText === 'string'
      ? question.questionText
      : 'Question text missing or invalid.';

    switch (question.type) {
      case 'mc':
      case 'tf':
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{currentQuestionIndex + 1}. {displayQuestionText}</Text>
            {question.options.map((option, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.optionButton,
                  userAnswer === option && styles.selectedOption, // Use local userAnswer for selection
                ]}
                onPress={() => handleAnswerChange(question.id, option)}
                pointerEvents="auto" // Ensure clickability
              >
                <Text style={[styles.optionText, userAnswer === option && styles.selectedOptionText]}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      case 'frq':
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{currentQuestionIndex + 1}. {displayQuestionText}</Text>
            <TextInput
              style={styles.frqInput}
              placeholder="Type your answer here..."
              placeholderTextColor="#999"
              value={userAnswer || ''} // Use local userAnswer state
              onChangeText={(text) => handleAnswerChange(question.id, text)}
              pointerEvents="auto" // Ensure clickability
            />
          </View>
        );
      default:
        return <Text>Unknown question type.</Text>;
    }
  };

  const submitButtonDisabled = !isLastQuestion || !areAllQuestionsAnswered(); // Submit only on last question AND all answered
  console.log(`[QUIZ DEBUG] Submit button disabled state: ${submitButtonDisabled}. (isLastQuestion: ${isLastQuestion}, areAllQuestionsAnswered: ${areAllQuestionsAnswered()})`);


  return (
    <KeyboardAvoidingView
      style={styles.fullScreenContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{lesson.title}</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
      >
        {!quizStarted && !quizResults && (
          <>
            {lesson.content.map((paragraph, index) => (
              <View
                key={index}
                ref={el => setContentRef(el, index)} // Use the useCallback ref setter
                style={[
                  styles.contentParagraphContainer,
                  // Apply permanent highlight for incorrect answers if quiz results are shown
                  quizResults && quizResults.incorrectQuestions.some(q => q.relatedContentIndex === index) && styles.highlightedContent,
                  // Apply temporary highlight if it matches the current tempHighlightedIndex
                  tempHighlightedIndex === index && styles.tempHighlightedContent
                ]}
              >
                {/*
                  // Future Enhancement: Render different content types (text, image, icon)
                  // Example: If your lessonsData.js had content like:
                  // { type: 'text', value: 'This is a paragraph.' },
                  // { type: 'image', uri: 'https://placehold.co/300x200?text=MoneyConcept' },
                  // { type: 'icon', name: 'money-bill' } // Using a hypothetical icon library
                  // You would parse 'paragraph' (or 'item' if content was an array of objects)
                  // and render accordingly.

                  // For now, assuming 'paragraph' is always text:
                */}
                <Text style={styles.contentParagraph}>{paragraph}</Text>

                {/* Placeholder for an image related to the concept */}
                {/* Example: If you wanted an image after the first paragraph of a specific lesson */}
                {lesson.id === 'budgeting-spending-lesson-1-hardcoded' && index === 0 && (
                  <Image
                    source={{ uri: 'https://placehold.co/300x150/8A2BE2/ffffff?text=Budget+Map' }}
                    style={styles.conceptImage}
                  />
                )}
                {lesson.id === 'saving-investing-lesson-2' && index === 1 && (
                  <Image
                    source={{ uri: 'https://placehold.co/300x150/4CAF50/ffffff?text=Compound+Interest' }}
                    style={styles.conceptImage}
                  />
                )}
                {lesson.id === 'credit-debt-lesson-1' && index === 0 && (
                  <Image
                    source={{ uri: 'https://placehold.co/300x150/FF6347/ffffff?text=Credit+Score' }}
                    style={styles.conceptImage}
                  />
                )}
                {lesson.id === 'income-taxes-lesson-1' && index === 2 && (
                  <Image
                    source={{ uri: 'https://placehold.co/300x150/00BFFF/ffffff?text=Paycheck+Breakdown' }}
                    style={styles.conceptImage}
                  />
                )}
                {lesson.id === 'financial-planning-lesson-1' && index === 1 && (
                  <Image
                    source={{ uri: 'https://placehold.co/300x150/6A5ACD/ffffff?text=SMART+Goals' }}
                    style={styles.conceptImage}
                  />
                )}
                {lesson.id === 'financial-literacy-lesson-2' && index === 2 && (
                  <Image
                    source={{ uri: 'https://placehold.co/300x150/FF4500/ffffff?text=Inflation' }}
                    style={styles.conceptImage}
                  />
                )}

                {/* You can add more conditional images/icons based on lessonId and index */}
                {/* Or, modify lessonsData.js to include image/icon data directly within content objects */}

              </View>
            ))}
            <TouchableOpacity style={styles.startQuizButton} onPress={() => {
                setQuizStarted(true);
                setCurrentQuestionIndex(0); // Ensure starting from first question
                setUserAnswers({}); // Clear any previous answers
                setUserAnswer(''); // Clear current input
            }}>
              <Text style={styles.startQuizButtonText}>Start Quiz!</Text>
            </TouchableOpacity>
          </>
        )}

        {quizStarted && !quizResults && lesson.quiz && lesson.quiz.questions.length > 0 && (
          // Quiz Section (now inside ScrollView)
          <View style={styles.quizSection}>
            {renderQuestion(lesson.quiz.questions[currentQuestionIndex])}
          </View>
        )}

        {quizResults && (
          <View style={styles.resultsSection}>
            <Text style={styles.resultsTitle}>Quiz Results</Text>
            <Text style={styles.scoreText}>You scored: {quizResults.score} / {quizResults.total}</Text>

            {quizResults.incorrectQuestions.length > 0 ? (
              <View>
                <Text style={styles.reviewPrompt}>Review the following areas:</Text>
                {quizResults.incorrectQuestions.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.incorrectItem}
                    onPress={() => scrollToContent(item.relatedContentIndex)}
                  >
                    <Text style={styles.incorrectQuestionText}>
                      Question: "{item.questionText}"
                    </Text>
                    <Text style={styles.incorrectAnswerGiven}>
                      Your Answer: "{item.userAnswer || 'No Answer'}"
                    </Text>
                    <Text style={styles.incorrectAnswerCorrect}>
                      Correct Answer: {Array.isArray(item.correctAnswer) ? item.correctAnswer.join(', ') : item.correctAnswer}
                    </Text>
                    <Text style={styles.scrollToText}>
                      Tap to review related content.
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <Text style={styles.allCorrectText}>Great job! All answers correct!</Text>
            )}

            <TouchableOpacity style={styles.resetQuizButton} onPress={resetQuiz}>
              <Text style={styles.resetQuizButtonText}>Retake Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backToLessonsButton} onPress={() => navigation.goBack()}>
              <Text style={styles.backToLessonsButtonText}>Back to Lessons</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Quiz Navigation (moved outside ScrollView, fixed at bottom) */}
      {quizStarted && !quizResults && lesson.quiz && lesson.quiz.questions.length > 0 && (
        <View style={styles.quizNavigation} pointerEvents="auto">
          <TouchableOpacity
            style={styles.quizNavButton}
            onPress={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            pointerEvents="auto"
          >
            <Text style={styles.quizNavButtonText}>← Prev</Text>
          </TouchableOpacity>
          <Text style={styles.questionCounter}>{currentQuestionIndex + 1} / {lesson.quiz.questions.length}</Text>

          {isLastQuestion ? (
            <TouchableOpacity
              style={[styles.quizNavButton, submitButtonDisabled && styles.quizNavButtonDisabled]}
              onPress={submitQuiz}
              disabled={submitButtonDisabled}
              pointerEvents="auto"
            >
              <Text style={styles.quizNavButtonText}>Submit Quiz</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.quizNavButton}
              onPress={handleNextQuestion}
              disabled={userAnswer === ''} // Disable next until current question is answered
              pointerEvents="auto"
            >
              <Text style={styles.quizNavButtonText}>Next →</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#f0f4f8', // Clean background
    overflow: 'visible',
  },
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
    paddingTop: 0,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    flexShrink: 1,
    textAlign: 'center',
  },
  backButton: {
    paddingRight: 15,
    paddingVertical: 5,
  },
  backButtonText: {
    fontSize: 24,
    color: '#3498db',
    fontWeight: 'bold',
  },
  headerRightPlaceholder: {
    width: 24,
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
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 120, // Increased padding to ensure space for fixed bottom nav
  },
  contentParagraphContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderColor: '#e0e0e0', // Default border
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  contentParagraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495e',
  },
  conceptImage: {
    width: '100%', // Make image responsive to container width
    height: 150, // Fixed height, adjust as needed
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 5,
    resizeMode: 'contain', // Or 'cover', depending on desired effect
  },
  highlightedContent: {
    backgroundColor: '#fffacd', // Light yellow for highlight of incorrect answers
    borderColor: '#f1c40f', // Yellow border
    borderWidth: 2,
  },
  tempHighlightedContent: {
    backgroundColor: '#fff8dc',
    borderColor: '#ffd700',
    borderWidth: 2,
  },
  startQuizButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  startQuizButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Quiz Section Styles (now within ScrollView)
  quizSection: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 20, // Space before the end of the scrollable content
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  optionButton: {
    backgroundColor: '#ecf0f1',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#bdc3c7',
  },
  selectedOption: {
    backgroundColor: '#3498db',
    borderColor: '#2980b9',
  },
  optionText: {
    fontSize: 16,
    color: '#34495e',
  },
  selectedOptionText: {
    color: '#ffffff',
  },
  frqInput: {
    backgroundColor: '#ecf0f1',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bdc3c7',
    fontSize: 16,
    color: '#34495e',
  },
  // Quiz Navigation (fixed at bottom of screen)
  quizNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 9999, // Ensure it's on top
    position: 'absolute', // Pin to the bottom
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff', // Clean background
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  quizNavButton: {
    backgroundColor: '#3498db', // Blue for navigation buttons
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  quizNavButtonDisabled: {
    backgroundColor: '#a0cbe0', // Lighter blue when disabled
  },
  quizNavButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  questionCounter: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7f8c8d',
  },

  // Results Section Styles
  resultsSection: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 20,
    alignItems: 'center',
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 20,
  },
  reviewPrompt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e67e22',
    marginBottom: 15,
    textAlign: 'center',
  },
  incorrectItem: {
    backgroundColor: '#fef3e0', // Light orange background for incorrect items
    borderColor: '#f1c40f',
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    width: '100%',
  },
  incorrectQuestionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#c0392b', // Red for question
    marginBottom: 5,
  },
  incorrectAnswerGiven: {
    fontSize: 14,
    color: '#e74c3c', // Red for user's wrong answer
    marginBottom: 5,
  },
  incorrectAnswerCorrect: {
    fontSize: 14,
    color: '#27ae60', // Green for correct answer
    marginBottom: 10,
  },
  scrollToText: {
    fontSize: 13,
    color: '#3498db',
    fontStyle: 'italic',
    marginTop: 5,
    textAlign: 'right',
  },
  allCorrectText: {
    fontSize: 18,
    color: '#27ae60',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resetQuizButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  resetQuizButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backToLessonsButton: {
    backgroundColor: '#7f8c8d',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  backToLessonsButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  correctAnswerHighlight: {
    backgroundColor: '#d4edda',
    borderColor: '#28a745',
    borderWidth: 2,
  },
  incorrectAnswerHighlight: {
    backgroundColor: '#f8d7da',
    borderColor: '#dc3545',
    borderWidth: 2,
  },
});
