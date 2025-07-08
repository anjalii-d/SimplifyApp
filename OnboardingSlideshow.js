// OnboardingSlideshow.js
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
// Removed Swiper import
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

const { width } = Dimensions.get('window');
const ONBOARDING_COMPLETED_KEY = '@SimplifyApp:onboardingCompleted';

const slides = [
  {
    title: "Reality Feed: Your Community's Wins & Wisdom",
    description: "Dive into real-life financial journeys shared by people just like you. Discover inspiring successes, learn from common challenges, and connect with a supportive community. It's your daily dose of financial reality, designed to keep you motivated!",
    icon: "🧾",
    color: '#3498db',
  },
  {
    title: "Money 101: Unlock Your Financial Superpowers",
    description: "Demystify personal finance with bite-sized, easy-to-understand lessons. From budgeting basics to investing essentials, we break down complex topics into simple steps. Empower yourself with knowledge and take control of your financial future!",
    icon: "📚",
    color: '#2ecc71',
  },
  {
    title: "Path Peek: Chart Your Course to Success",
    description: "Explore diverse career paths and understand the financial realities of each. Get insights into earning potential, required skills, and growth opportunities. Plan your future with clarity and confidence, aligning your passions with prosperity!",
    icon: "🗺️",
    color: '#e67e22',
  },
  {
    title: "Profile: Track Your Progress, Celebrate Your Journey",
    description: "Your personalized hub to monitor your financial growth, set new goals, and reflect on your achievements. See how far you've come and what's next on your path to financial freedom. This is where your hard work pays off, visually!",
    icon: "👤",
    color: '#9b59b6',
  },
];

export default function OnboardingSlideshow({ navigation, onOnboardingComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDone = async () => {
    console.log("Onboarding: 'Get Started!' button pressed.");
    try {
      await AsyncStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');

      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("Onboarding complete, user logged in, navigating to Home.");
          navigation.replace('Home');
        } else {
          console.log("Onboarding complete, user not logged in, navigating to Login.");
          navigation.replace('Login');
        }
      });
    } catch (e) {
      console.error("Failed to save onboarding status or navigate:", e);
      navigation.replace('Login');
    }
  };

  const handleNext = () => {
    console.log("Onboarding: 'Next' button pressed. Current slide:", currentIndex);
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
      console.log("Moving to next slide:", currentIndex + 1);
    } else {
      handleDone(); // If it's the last slide, act as 'Done'
    }
  };

  const currentSlideData = slides[currentIndex];

  return (
    <View style={styles.container}>
      {/* Manually rendered slide */}
      <View style={[styles.slide, { backgroundColor: currentSlideData.color }]}>
        <Text style={styles.icon}>{currentSlideData.icon}</Text>
        <Text style={styles.title}>{currentSlideData.title}</Text>
        <Text style={styles.description}>{currentSlideData.description}</Text>
      </View>

      <View style={styles.paginationContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>

      <View style={styles.navigationButtons}>
        {currentIndex < slides.length - 1 ? (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
          >
            <Text style={styles.buttonText}>Next →</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.doneButton}
            onPress={handleDone}
          >
            <Text style={styles.buttonText}>Get Started!</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  // Removed wrapper style as Swiper is gone
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    width: '100%', // Use 100% width for manual slide
  },
  icon: {
    fontSize: 80,
    marginBottom: 30,
    color: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  description: {
    fontSize: 18,
    color: '#e0f2f7',
    textAlign: 'center',
    lineHeight: 28,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 80,
    width: '100%',
  },
  dot: {
    backgroundColor: 'rgba(255,255,255,.3)',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 3,
  },
  activeDot: {
    backgroundColor: '#ffffff',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  navigationButtons: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
    zIndex: 100,
  },
  nextButton: {
    backgroundColor: '#FF0000', // TEMPORARY: Red background for debugging
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  doneButton: {
    backgroundColor: '#00FF00', // TEMPORARY: Green background for debugging
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
