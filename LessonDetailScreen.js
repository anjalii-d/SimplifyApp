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
  Platform
} from 'react-native';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Import your Firestore instance

const { width } = Dimensions.get('window');

// --- Dummy Lesson Data (for testing before Firestore is populated) ---
// In a real app, this would be fetched from Firestore.
const dummyLesson = {
  id: 'lesson1',
  title: 'Understanding Your First Budget',
  category: 'Budgeting Basics',
  content: [
    "Welcome to your first step towards financial freedom! Budgeting isn't about restricting yourself; it's about giving your money a purpose and making it work for you. Think of it as a roadmap for your cash.",
    "The core idea of budgeting is to track your income (money coming in) and your expenses (money going out). When you know where your money is going, you can make informed decisions about your spending.",
    "A popular budgeting method is the 50/30/20 rule. This suggests allocating 50% of your after-tax income to needs (rent, groceries), 30% to wants (entertainment, dining out), and 20% to savings and debt repayment.",
    "Another simple method is the envelope system. You allocate cash to different spending categories and once an envelope is empty, you stop spending in that category until the next budgeting period. This is great for visual learners.",
    "Remember, consistency is key! Review your budget regularly, adjust it as your income or expenses change, and don't be afraid to start small. Every little bit of planning helps you reach your financial goals faster.",
  ],
  quiz: {
    questions: [
      {
        id: 'q1',
        type: 'mc',
        questionText: "What is the primary purpose of budgeting?",
        options: [
          "To restrict all spending",
          "To give your money a purpose and make it work for you",
          "To avoid paying taxes",
          "To impress your friends"
        ],
        correctAnswer: "To give your money a purpose and make it work for you",
        relatedContentIndex: 0, // Relates to the first paragraph
      },
      {
        id: 'q2',
        type: 'tf',
        questionText: "The 50/30/20 rule suggests 50% for wants.",
        options: ["True", "False"],
        correctAnswer: "False", // 50% is for needs
        relatedContentIndex: 2, // Relates to the 50/30/20 rule paragraph
      },
      {
        id: 'q3',
        type: 'frq',
        questionText: "What budgeting method involves allocating cash to different spending categories in physical containers?",
        correctAnswer: ["envelope system", "envelopes"], // Allow variations
        relatedContentIndex: 3, // Relates to the envelope system paragraph
      },
      {
        id: 'q4',
        type: 'mc',
        questionText: "Which of these is NOT a core idea of budgeting?",
        options: [
          "Tracking income",
          "Tracking expenses",
          "Knowing where your money is going",
          "Ignoring your spending habits"
        ],
        correctAnswer: "Ignoring your spending habits",
        relatedContentIndex: 1, // Relates to tracking income/expenses paragraph
      },
      {
        id: 'q5',
        type: 'tf',
        questionText: "Consistency is not important when it comes to budgeting.",
        options: ["True", "False"],
        correctAnswer: "False",
        relatedContentIndex: 4, // Relates to consistency paragraph
      },
      {
        id: 'q6',
        type: 'frq',
        questionText: "What is the term for money coming into your possession?",
        correctAnswer: ["income"],
        relatedContentIndex: 1, // Relates to income/expenses paragraph
      },
    ]
  }
};
// --- End Dummy Lesson Data ---


export default function LessonDetailScreen({ route, navigation }) {
  const { lessonId } = route.params; // Get the lesson ID passed from Money101Screen

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [quizStarted, setQuizStarted] = useState(false);
  const [quizResults, setQuizResults] = useState(null); // null: not taken, object: results
  const [userAnswers, setUserAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scrollToIndex, setScrollToIndex] = useState(null); // State to hold the index to scroll to
  const [tempHighlightedIndex, setTempHighlightedIndex] = useState(null); // State for temporary highlight

  const scrollViewRef = useRef(null);
  // Use a Map for contentRefs for better management with dynamic indices
  const contentRefs = useRef(new Map());

  // Callback to set refs for content paragraphs
  const setContentRef = useCallback((element, index) => {
    if (element) {
      contentRefs.current.set(index, element);
    } else {
      contentRefs.current.delete(index);
    }
  }, []);

  // Fetch lesson data from Firestore
  useEffect(() => {
    const fetchLesson = async () => {
      setLoading(true);
      setError(null);
      try {
        // For now, using dummy data. Uncomment Firestore fetch when ready.
        setLesson(dummyLesson);

        // --- Uncomment this block to fetch from Firestore ---
        // const lessonDocRef = doc(db, 'lessons', lessonId);
        // const lessonDocSnap = await getDoc(lessonDocRef);
        // if (lessonDocSnap.exists()) {
        //   setLesson({ id: lessonDocSnap.id, ...lessonDocSnap.data() });
        //   setError(null);
        // } else {
        //   setError("Lesson not found.");
        //   setLesson(null);
        // }
        // --- End Firestore fetch block ---

      } catch (err) {
        console.error("Error fetching lesson:", err);
        setError("Failed to load lesson. Please try again.");
        setLesson(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [lessonId]); // Re-fetch if lessonId changes

  // Effect to handle scrolling once the content is rendered and scrollToIndex is set
  useEffect(() => {
    if (scrollToIndex !== null && !quizStarted && !quizResults && lesson) {
      const targetRef = contentRefs.current.get(scrollToIndex);
      if (scrollViewRef.current && targetRef) {
        // Give React Native a moment to render and measure the content
        setTimeout(() => {
          if (targetRef) { // Re-check if targetRef still exists after timeout
            targetRef.measureLayout(
              scrollViewRef.current,
              (x, y, width, height) => {
                console.log(`MeasureLayout for index ${scrollToIndex}: x=${x}, y=${y}, width=${width}, height=${height}`);
                if (y !== undefined && y !== null) {
                  scrollViewRef.current.scrollTo({ y: y, animated: true });
                  setTempHighlightedIndex(scrollToIndex); // Set temporary highlight
                  console.log(`Highlighting index: ${scrollToIndex}`); // Debug log
                  setTimeout(() => {
                    setTempHighlightedIndex(null); // Clear highlight after 3 seconds
                    console.log(`Clearing highlight for index: ${scrollToIndex}`); // Debug log
                  }, 3000);
                  setScrollToIndex(null); // Reset scrollToIndex after scrolling
                } else {
                  console.warn(`Failed to get valid Y coordinate for content index: ${scrollToIndex}`);
                }
              },
              (error) => {
                console.error("MeasureLayout error:", error);
                console.warn("Failed to measure layout for content index:", scrollToIndex);
              }
            );
          } else {
            console.warn(`Cannot scroll to content index ${scrollToIndex} after timeout: targetRef is null.`);
          }
        }, 250); // Increased delay to 250ms for even more stability
      } else {
        console.warn(`Cannot scroll to content index ${scrollToIndex}: scrollViewRef or targetRef is null (useEffect initial check).`);
      }
    }
  }, [scrollToIndex, quizStarted, quizResults, lesson]); // Dependencies for this effect


  // --- Quiz Logic ---
  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const checkQuizAnswer = (question, userAnswer) => {
    if (question.type === 'mc' || question.type === 'tf') {
      return userAnswer === question.correctAnswer;
    } else if (question.type === 'frq') {
      const normalizedUserAnswer = userAnswer ? userAnswer.toLowerCase().trim() : '';
      // Check if any of the correct answers match (case-insensitive, trimmed)
      return question.correctAnswer.some(correct =>
        normalizedUserAnswer === correct.toLowerCase().trim()
      );
    }
    return false;
  };

  const submitQuiz = () => {
    if (!lesson || !lesson.quiz) return;

    let correctCount = 0;
    const incorrectQuestions = [];

    lesson.quiz.questions.forEach(q => {
      const isCorrect = checkQuizAnswer(q, userAnswers[q.id]);
      if (isCorrect) {
        correctCount++;
      } else {
        incorrectQuestions.push({
          questionId: q.id,
          relatedContentIndex: q.relatedContentIndex,
          userAnswer: userAnswers[q.id] || '',
          correctAnswer: q.correctAnswer,
          questionText: q.questionText
        });
      }
    });

    setQuizResults({
      score: correctCount,
      total: lesson.quiz.questions.length,
      incorrectQuestions: incorrectQuestions,
    });
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setQuizResults(null);
    setCurrentQuestionIndex(0);
    setQuizStarted(false);
    setScrollToIndex(null); // Reset scroll index
    setTempHighlightedIndex(null); // Clear temporary highlight
    // Scroll to top when quiz is reset
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < lesson.quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      submitQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
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

  // Render a single question
  const renderQuestion = (question) => {
    switch (question.type) {
      case 'mc':
      case 'tf':
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{question.questionText}</Text>
            {question.options.map((option, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.optionButton,
                  userAnswers[question.id] === option && styles.selectedOption,
                  quizResults && checkQuizAnswer(question, option) && styles.correctAnswerHighlight,
                  quizResults && userAnswers[question.id] === option && !checkQuizAnswer(question, option) && styles.incorrectAnswerHighlight
                ]}
                onPress={() => handleAnswerChange(question.id, option)}
                disabled={!!quizResults} // Disable options after quiz submission
              >
                <Text style={[styles.optionText, userAnswers[question.id] === option && styles.selectedOptionText]}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      case 'frq':
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{question.questionText}</Text>
            <TextInput
              style={[
                styles.frqInput,
                quizResults && !checkQuizAnswer(question, userAnswers[question.id]) && styles.incorrectAnswerHighlight,
                quizResults && checkQuizAnswer(question, userAnswers[question.id]) && styles.correctAnswerHighlight
              ]}
              placeholder="Type your answer here..."
              placeholderTextColor="#999"
              value={userAnswers[question.id] || ''}
              onChangeText={(text) => handleAnswerChange(question.id, text)}
              editable={!quizResults} // Disable input after quiz submission
            />
            {quizResults && !checkQuizAnswer(question, userAnswers[question.id]) && (
              <Text style={styles.correctAnswerHint}>Correct: {Array.isArray(question.correctAnswer) ? question.correctAnswer.join(', ') : question.correctAnswer}</Text>
            )}
          </View>
        );
      default:
        return <Text>Unknown question type.</Text>;
    }
  };

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
                <Text style={styles.contentParagraph}>{paragraph}</Text>
              </View>
            ))}
            <TouchableOpacity style={styles.startQuizButton} onPress={() => setQuizStarted(true)}>
              <Text style={styles.startQuizButtonText}>Start Quiz!</Text>
            </TouchableOpacity>
          </>
        )}

        {quizStarted && !quizResults && lesson.quiz && lesson.quiz.questions.length > 0 && (
          <View style={styles.quizSection}>
            {renderQuestion(lesson.quiz.questions[currentQuestionIndex])}
            <View style={styles.quizNavigation}>
              <TouchableOpacity
                style={styles.quizNavButton}
                onPress={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                <Text style={styles.quizNavButtonText}>← Prev</Text>
              </TouchableOpacity>
              <Text style={styles.questionCounter}>{currentQuestionIndex + 1} / {lesson.quiz.questions.length}</Text>
              <TouchableOpacity
                style={styles.quizNavButton}
                onPress={handleNextQuestion}
              >
                <Text style={styles.quizNavButtonText}>
                  {currentQuestionIndex === lesson.quiz.questions.length - 1 ? 'Submit Quiz' : 'Next →'}
                </Text>
              </TouchableOpacity>
            </View>
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#f0f4f8',
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
    paddingTop: 0, // <-- MODIFIED: Set to 0 as SafeAreaView handles top padding
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    flexShrink: 1, // Allow title to shrink
    textAlign: 'center',
  },
  backButton: {
    paddingRight: 15,
    paddingVertical: 5, // Make touch target larger
  },
  backButtonText: {
    fontSize: 24,
    color: '#3498db',
    fontWeight: 'bold',
  },
  headerRightPlaceholder: {
    width: 24, // To balance the back button on the left
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
    paddingBottom: 100, // Ensure space for keyboard/buttons
  },
  contentParagraphContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
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
  highlightedContent: {
    backgroundColor: '#fffacd', // Light yellow for highlight of incorrect answers
    borderColor: '#f1c40f', // Yellow border
    borderWidth: 2,
  },
  tempHighlightedContent: { // NEW: Style for temporary highlight
    backgroundColor: '#fff8dc', // Pastel butter yellow
    borderColor: '#ffd700', // A slightly darker yellow border
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

  // Quiz Section Styles
  quizSection: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 20,
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
  quizNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  quizNavButton: {
    backgroundColor: '#34495e',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
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
    backgroundColor: '#d4edda', // Light green
    borderColor: '#28a745', // Green border
  },
  incorrectAnswerHighlight: {
    backgroundColor: '#f8d7da', // Light red
    borderColor: '#dc3545', // Red border
  },
});
