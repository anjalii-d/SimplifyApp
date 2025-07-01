// HomeScreen.js
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import RealityFeedScreen from './RealityFeedScreen';
import Money101Screen from './Money101Screen';

export default function HomeScreen() {
  const [activeScreen, setActiveScreen] = useState('home');
  const renderScreen = () => {
    switch (activeScreen) {
      case 'realityFeed':
        return <RealityFeedScreen />;
      case 'money101':
        return <Money101Screen />;
      default:
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Welcome to SimplifyApp!</Text>
            <Text style={styles.subtitle}>Your journey to financial literacy starts here.</Text>

            {/* Navigation Buttons */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => setActiveScreen('realityFeed')} // When pressed, switch to Reality Feed screen
            >
              <Text style={styles.buttonText}>Go to Reality Feed</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => setActiveScreen('money101')} // When pressed, switch to Money 101 screen
            >
              <Text style={styles.buttonText}>Go to Money 101</Text>
            </TouchableOpacity>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      {/* If not on the home screen, show a back button */}
      {activeScreen !== 'home' && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setActiveScreen('home')} // Go back to home screen
        >
          <Text style={styles.backButtonText}>← Back to Home</Text>
        </TouchableOpacity>
      )}
      {renderScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f0f4f8',
    paddingTop: 50,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3498db', // A nice blue color for buttons
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 15,
    width: '80%', // Make buttons take up most of the width
    alignItems: 'center',
    shadowColor: '#000', // Add shadow for a modern look
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#ffffff', // White text on buttons
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    position: 'absolute', // Position the back button at the top left
    top: 20,
    left: 20,
    zIndex: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.1)', // Slightly transparent background
  },
  backButtonText: {
    color: '#2c3e50',
    fontSize: 16,
  },
});