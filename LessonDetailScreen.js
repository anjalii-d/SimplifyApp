// LessonDetailScreen.js
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  TextInput,
  Dimensions,
  SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export default function LessonDetailScreen({ route, navigation }) {
  const { lesson, onLessonComplete } = route.params;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null); // { type: 'correct' | 'incorrect', message: string }
  const [quizScore, setQuizScore] = useState(0); // Track correct answers for XP
  const [xpAwardedForLesson, setXpAwardedForLesson] = useState(false); // To prevent multiple XP awards
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertVisible(true);
  };

  // Check if lesson data is valid
  if (!lesson || !lesson.content) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Lesson data not found or is incomplete.</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const currentQuestion = lesson.quiz?.questions[currentQuestionIndex];

  // Function to add XP
  const addXp = async (amount) => {
    if (amount <= 0) return; // Ensure positive XP

    try {
      const currentXpString = await AsyncStorage.getItem('userXP');
      const currentXp = currentXpString ? parseInt(currentXpString) : 0;
      const newXp = currentXp + amount;
      await AsyncStorage.setItem('userXP', newXp.toString());
      console.log(`XP updated: ${currentXp} + ${amount} = ${newXp}`);
      showAlert(`You earned ${amount} XP! Total XP: ${newXp}`);

    } catch (e) {
      console.error("Failed to update XP in AsyncStorage", e);
    }
  };

  const handleAnswerSubmit = async () => {
    if (!currentQuestion) return;

    let isCorrect = false;
    let feedbackMessage = '';
    let xpForQuestion = 0; // XP for this specific question

    if (currentQuestion.type === 'mc' || currentQuestion.type === 'tf') {
      isCorrect = userAnswer === currentQuestion.correctAnswer;
    } else if (currentQuestion.type === 'frq') {
      isCorrect = currentQuestion.correctAnswer.some(ans =>
        userAnswer.trim().toLowerCase() === ans.toLowerCase()
      );
    }

    if (isCorrect) {
      feedbackMessage = 'Correct! Great job.';
      xpForQuestion = lesson.quiz?.xpPerCorrectAnswer || 0; // Get XP from lesson data
      setFeedback({ type: 'correct', message: feedbackMessage });
      setQuizScore(prevScore => prevScore + 1); // Increment quiz score
      if (xpForQuestion > 0) {
        // We'll aggregate XP and award at quiz completion to avoid too many alerts.
      }
    } else {
      feedbackMessage = 'Not quite. Review the highlighted content.';
      setFeedback({ type: 'incorrect', message: feedbackMessage });
    }
  };

  const handleNextQuestion = async () => {
    // If this is the last question, and it's correct, mark lesson as complete and award lesson XP
    const isLastQuestion = lesson.quiz && currentQuestionIndex === lesson.quiz.questions.length - 1;
    const isCorrect = feedback?.type === 'correct';

    if (isLastQuestion && isCorrect) {
      try {
        const storedCompletedLessons = await AsyncStorage.getItem('completedLessons');
        const completedLessonsSet = storedCompletedLessons ? new Set(JSON.parse(storedCompletedLessons)) : new Set();

        if (!completedLessonsSet.has(lesson.id)) { // Only award XP if lesson hasn't been completed before
          completedLessonsSet.add(lesson.id);
          await AsyncStorage.setItem('completedLessons', JSON.stringify(Array.from(completedLessonsSet)));

          const totalQuizXp = (quizScore + (isCorrect ? 1 : 0)) * (lesson.quiz?.xpPerCorrectAnswer || 0); // Include current question if correct
          const totalLessonXp = (lesson.xpAward || 0) + totalQuizXp;

          if (totalLessonXp > 0) {
            await addXp(totalLessonXp);
          }
          setXpAwardedForLesson(true); // Mark that XP has been awarded
        }

        if (onLessonComplete) {
          onLessonComplete(); // Notify parent (Money101Screen) to refresh completed status
        }
      } catch (e) {
        console.error("Failed to save completed lesson or award XP to AsyncStorage", e);
      }
    }

    // After handling completion logic, move to the next question or show completion message
    setFeedback(null);
    setUserAnswer('');
    if (lesson.quiz && currentQuestionIndex < lesson.quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Logic for quiz completion
      let completionMessage = "You've finished the quiz for this lesson!";
      if (lesson.quiz && lesson.quiz.questions.length > 0) {
          const totalQuestions = lesson.quiz.questions.length;
          const finalQuizScore = quizScore + (isCorrect ? 1 : 0); // Add score for the last question if correct
          completionMessage += ` You answered ${finalQuizScore} out of ${totalQuestions} questions correctly.`;
      }
      if (xpAwardedForLesson) {
          completionMessage += "\nXP for this lesson has been awarded!";
      }

      showAlert(completionMessage);
      setCurrentQuestionIndex(0); // Reset for next time
      setQuizScore(0); // Reset quiz score
      setXpAwardedForLesson(false); // Reset XP awarded status
    }
  };


  // Function to determine if a content paragraph should be highlighted
  const getParagraphStyle = (index) => {
    const questionRelatedToParagraph = lesson.quiz?.questions.find(
      (q) => q.relatedContentIndex === index
    );

    if (feedback && feedback.type === 'incorrect' && questionRelatedToParagraph &&
        questionRelatedToParagraph.id === currentQuestion?.id) {
      return styles.highlightedParagraph;
    }
    return {};
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{lesson.title}</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.lessonTime}>{lesson.time}</Text>

        {/* Lesson Content */}
        <View style={styles.lessonContentContainer}>
          {lesson.content.map((item, index) => (
            <View key={index} style={[styles.contentItem, getParagraphStyle(index)]}>
              {item.type === 'text' && <Text style={styles.lessonText}>{item.value}</Text>}
              {item.type === 'image' && (
                <View style={styles.imageContainer}>
                  <Image source={{ uri: item.src }} style={styles.lessonImage} resizeMode="contain" />
                </View>
              )}
              {item.type === 'icon' && <Text style={styles.lessonIcon}>{item.name}</Text>}
            </View>
          ))}
        </View>

        {/* Quiz Section */}
        {lesson.quiz && lesson.quiz.questions.length > 0 && (
          <View style={styles.quizSection}>
            <Text style={styles.quizTitle}>Quiz Time!</Text>
            {currentQuestion ? (
              <View>
                <Text style={styles.questionText}>{currentQuestionIndex + 1}. {currentQuestion.questionText}</Text>

                {currentQuestion.type === 'mc' && (
                  <View style={styles.optionsContainer}>
                    {currentQuestion.options.map((option, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[styles.optionButton, userAnswer === option && styles.selectedOption]}
                        onPress={() => setUserAnswer(option)}
                      >
                        <Text style={styles.optionText}>{option}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                {currentQuestion.type === 'tf' && (
                  <View style={styles.optionsContainer}>
                    <TouchableOpacity
                      style={[styles.optionButton, userAnswer === 'True' && styles.selectedOption]}
                      onPress={() => setUserAnswer('True')}
                    >
                      <Text style={styles.optionText}>True</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.optionButton, userAnswer === 'False' && styles.selectedOption]}
                      onPress={() => setUserAnswer('False')}
                    >
                      <Text style={styles.optionText}>False</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {currentQuestion.type === 'frq' && (
                  <TextInput
                    style={styles.textInput}
                    placeholder="Type your answer here..."
                    placeholderTextColor="#999"
                    value={userAnswer}
                    onChangeText={setUserAnswer}
                  />
                )}

                {feedback && (
                  <Text style={[styles.feedbackText, feedback.type === 'correct' ? styles.feedbackCorrect : styles.feedbackIncorrect]}>
                    {feedback.message}
                  </Text>
                )}

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={feedback ? handleNextQuestion : handleAnswerSubmit}
                >
                  <Text style={styles.submitButtonText}>
                    {feedback ? (lesson.quiz && currentQuestionIndex === lesson.quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question') : 'Submit Answer'}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={styles.noQuestionsText}>No questions available for this lesson.</Text>
            )}
          </View>
        )}
      </ScrollView>
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
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#1c1c3c',
    borderBottomWidth: 2,
    borderBottomColor: '#FFD700',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFD700',
    flex: 1,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  backButton: {
    paddingRight: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  headerRightPlaceholder: {
    width: 24,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },
  lessonTime: {
    fontSize: 14,
    color: '#bdc3c7',
    marginBottom: 20,
    textAlign: 'center',
  },
  lessonContentContainer: {
    backgroundColor: '#2c3e50',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#556677',
  },
  contentItem: {
    marginBottom: 15,
  },
  lessonText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#e0e0e0',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#556677',
  },
  lessonImage: {
    width: '100%',
    height: '100%',
  },
  lessonIcon: {
    fontSize: 48,
    textAlign: 'center',
    marginVertical: 10,
  },
  highlightedParagraph: {
    backgroundColor: '#4a4a6b',
    borderRadius: 5,
    padding: 8,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  quizSection: {
    backgroundColor: '#2c3e50',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#556677',
  },
  quizTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 15,
    textAlign: 'center',
  },
  questionText: {
    fontSize: 18,
    color: '#e0e0e0',
    marginBottom: 15,
  },
  optionsContainer: {
    marginBottom: 15,
  },
  optionButton: {
    backgroundColor: '#384d63',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#556677',
  },
  selectedOption: {
    backgroundColor: '#3498db',
    borderColor: '#8e44ad',
  },
  optionText: {
    fontSize: 16,
    color: '#e0e0e0',
  },
  textInput: {
    backgroundColor: '#384d63',
    borderWidth: 2,
    borderColor: '#556677',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#e0e0e0',
    marginBottom: 15,
  },
  feedbackText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 15,
    paddingVertical: 8,
    borderRadius: 10,
  },
  feedbackCorrect: {
    color: '#ffffff',
    backgroundColor: '#27ae60',
  },
  feedbackIncorrect: {
    color: '#ffffff',
    backgroundColor: '#c0392b',
  },
  submitButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 3,
    borderColor: '#8e44ad',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  noQuestionsText: {
    fontSize: 16,
    color: '#bdc3c7',
    textAlign: 'center',
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
