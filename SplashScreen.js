// SplashScreen.js
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Animated, Easing } from 'react-native';

export default function SplashScreen({ navigation }) {
  // Animated value for the button's scale
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Function to create a pulsing animation loop
  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05, // Scale up slightly
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1, // Return to original size
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
      { iterations: -1 } // Loop indefinitely
    ).start();
  };

  useEffect(() => {
    startPulseAnimation();
  }, []);

  const handlePress = () => {
    // This screen is primarily shown on the very first install.
    // Tapping it always leads to the onboarding slideshow.
    // Using replace ensures the user can't navigate back to the splash screen.
    navigation.replace('OnboardingSlideshow');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Thematic App Emblem/Logo */}
        <Image
          source={{ uri: 'https://placehold.co/200x200/FFD700/8e44ad?text=QUEST' }} // Placeholder for a gold emblem
          style={styles.emblem}
        />
        
        {/* App Title */}
        <Text style={styles.title}>Quest Log</Text>
        
        {/* Slogan */}
        <Text style={styles.slogan}>Your adventure awaits...</Text>

        {/* Clickable Button to Proceed with a pulsating animation */}
        <Animated.View style={[styles.buttonContainer, { transform: [{ scale: pulseAnim }] }]}>
          <TouchableOpacity style={styles.startQuestButton} onPress={handlePress}>
            <Text style={styles.buttonText}>Begin Your Quest</Text>
          </TouchableOpacity>
        </Animated.View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1c1c3c', // Dark, adventurous background
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c3c',
    padding: 20,
  },
  emblem: {
    width: 200,
    height: 200,
    marginBottom: 30,
    resizeMode: 'contain',
    borderRadius: 100, // Make it circular
    borderWidth: 5,
    borderColor: '#FFD700', // Gold border
    shadowColor: '#FFD700', // Gold shadow for a glowing effect
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFD700', // Gold color
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  slogan: {
    fontSize: 22,
    color: '#e0e0e0', // Lighter grey for contrast
    marginBottom: 60,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  buttonContainer: {
    // This view wraps the button to apply the scaling animation
  },
  startQuestButton: {
    backgroundColor: '#8e44ad', // A deep purple/magenta from the profile screen
    paddingVertical: 18,
    paddingHorizontal: 35,
    borderRadius: 50, // Pill shape
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 3,
    borderColor: '#FFD700', // Gold border
  },
  buttonText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
