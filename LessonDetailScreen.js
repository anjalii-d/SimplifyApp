// LessonDetailScreen.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert, Image, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LessonDetailScreen({ route, navigation }) {
  const { lesson, onLessonComplete } = route.params;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null); // { type: 'correct' | 'incorrect', message: string }
  const [quizScore, setQuizScore] = useState(0); // Track correct answers for XP
  const [xpAwardedForLesson, setXpAwardedForLesson] = useState(false); // To prevent multiple XP awards

  // Check if lesson data is valid
  if (!lesson || !lesson.content) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Lesson data not found or is incomplete.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>
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

      // Optionally, show a toast or notification to the user about XP gained
      Alert.alert("XP Gained!", `You earned ${amount} XP! Total XP: ${newXp}`);

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
        // Award XP immediately for correct answer (optional, could also be aggregated)
        // addXp(xpForQuestion);
        // We'll aggregate XP and award at quiz completion to avoid too many alerts.
      }
    } else {
      feedbackMessage = 'Not quite. Review the highlighted content.';
      setFeedback({ type: 'incorrect', message: feedbackMessage });
    }

    // If this is the last question, and it's correct, mark lesson as complete and award lesson XP
    if (isCorrect && lesson.quiz && currentQuestionIndex === lesson.quiz.questions.length - 1) {
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
  };

  const handleNextQuestion = () => {
    setFeedback(null);
    setUserAnswer('');
    if (lesson.quiz && currentQuestionIndex < lesson.quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Logic for quiz completion
      let completionMessage = "You've finished the quiz for this lesson!";
      if (lesson.quiz && lesson.quiz.questions.length > 0) {
          const totalQuestions = lesson.quiz.questions.length;
          const finalQuizScore = quizScore + (feedback && feedback.type === 'correct' ? 1 : 0); // Add score for the last question if correct
          completionMessage += ` You answered ${finalQuizScore} out of ${totalQuestions} questions correctly.`;
      }
      if (xpAwardedForLesson) {
          completionMessage += "\nXP for this lesson has been awarded!";
      }

      Alert.alert(
        "Quiz Complete!",
        completionMessage,
        [{
          text: "OK", onPress: () => {
            setCurrentQuestionIndex(0); // Reset for next time
            setQuizScore(0); // Reset quiz score
            setXpAwardedForLesson(false); // Reset XP awarded status
            // navigation.goBack(); // Optionally navigate back
          }
        }]
      );
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
    <View style={styles.container}>
      {/* Header */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    paddingTop: 0,
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
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    paddingRight: 15,
  },
  backButtonText: {
    fontSize: 24,
    color: '#3498db',
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
    color: '#7f8c8d',
    marginBottom: 20,
    textAlign: 'center',
  },
  lessonContentContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  contentItem: {
    marginBottom: 15,
  },
  lessonText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495e',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#e0e0e0',
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
    backgroundColor: '#fff3cd',
    borderRadius: 5,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ffc107',
  },
  quizSection: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  quizTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    textAlign: 'center',
  },
  questionText: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 15,
  },
  optionsContainer: {
    marginBottom: 15,
  },
  optionButton: {
    backgroundColor: '#f0f4f8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedOption: {
    backgroundColor: '#d1e7dd',
    borderColor: '#28a745',
  },
  optionText: {
    fontSize: 15,
    color: '#34495e',
  },
  textInput: {
    backgroundColor: '#f0f4f8',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: '#333',
    marginBottom: 15,
  },
  feedbackText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  feedbackCorrect: {
    color: '#155724',
    backgroundColor: '#d4edda',
  },
  feedbackIncorrect: {
    color: '#721c24',
    backgroundColor: '#f8d7da',
  },
  submitButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noQuestionsText: {
    fontSize: 15,
    color: '#7f8c8d',
    textAlign: 'center',
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
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
});