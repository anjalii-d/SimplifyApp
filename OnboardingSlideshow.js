// OnboardingSlideshow.js
import React, { useState, useRef } from 'react'; // <-- Import useRef
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

// Data for the onboarding slides
const slides = [
  {
    title: "Reality Feed: Your Community's Wins & Wisdom",
    description: "Dive into real-life financial journeys shared by people just like you. Discover inspiring successes, learn from common challenges, and connect with a supportive community. It's your daily dose of financial reality, designed to keep you motivated!",
    icon: "🧾", // Feed icon
    color: '#3498db', // Blue
  },
  {
    title: "Money 101: Unlock Your Financial Superpowers",
    description: "Demystify personal finance with bite-sized, easy-to-understand lessons. From budgeting basics to investing essentials, we break down complex topics into simple steps. Empower yourself with knowledge and take control of your financial future!",
    icon: "📚", // Money 101 icon
    color: '#2ecc71', // Green
  },
  {
    title: "Path Peek: Chart Your Course to Success",
    description: "Explore diverse career paths and understand the financial realities of each. Get insights into earning potential, required skills, and growth opportunities. Plan your future with clarity and confidence, aligning your passions with prosperity!",
    icon: "🗺️", // Path Peek icon
    color: '#e67e22', // Orange
  },
  {
    title: "Profile: Track Your Progress, Celebrate Your Journey",
    description: "Your personalized hub to monitor your financial growth, set new goals, and reflect on your achievements. See how far you've come and what's next on your path to financial freedom. This is where your hard work pays off, visually!",
    icon: "👤", // Profile icon
    color: '#9b59b6', // Purple
  },
];

export default function OnboardingSlideshow({ navigation, onOnboardingComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef(null); // <-- Create a ref for the Swiper

  const handleDone = () => {
    onOnboardingComplete(); // Call the function passed from App.js
    // App.js will then handle navigation to Home/Login based on auth state
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1); // <-- Use the ref to call scrollBy
    }
  };

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef} // <-- Assign the ref to the Swiper component
        style={styles.wrapper}
        loop={false}
        showsButtons={false} // We'll use custom buttons
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        onIndexChanged={(index) => setCurrentIndex(index)}
      >
        {slides.map((slide, index) => (
          <View key={index} style={[styles.slide, { backgroundColor: slide.color }]}>
            <Text style={styles.icon}>{slide.icon}</Text>
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.description}>{slide.description}</Text>
          </View>
        ))}
      </Swiper>

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
            onPress={handleNext} // <-- Call the new handleNext function
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
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    width: width,
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
    bottom: 80, // Adjust position above buttons
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
  },
  nextButton: {
    backgroundColor: '#34495e', // Darker button for navigation
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
    backgroundColor: '#2ecc71', // Green for the final "Get Started" button
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
