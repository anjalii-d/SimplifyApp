// SplashScreen.js
import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function SplashScreen({ navigation }) {
  const handlePress = () => {
    navigation.navigate('OnboardingSlideshow'); // Navigate to the new slideshow screen
  };

  return (
    <View style={styles.container}>
      {/* App Logo */}
      <Image
        source={{ uri: 'https://placehold.co/150x150/3498db/ffffff?text=LOGO' }} // Placeholder logo
        style={styles.logo}
      />
      {/* App Name/Slogan */}
      <Text style={styles.appName}>$implify</Text>
      <Text style={styles.slogan}>Real-world money, simplified.</Text>

      {/* Clickable Arrow to Proceed */}
      <TouchableOpacity style={styles.arrowButton} onPress={handlePress}>
        <Text style={styles.arrowText}>→</Text>
      </TouchableOpacity>

      {/* Optional: A subtle loading indicator if needed */}
      {/* <ActivityIndicator size="small" color="#ffffff" style={styles.activityIndicator} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db', // A vibrant blue background
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75, // Make it circular
    marginBottom: 20,
    resizeMode: 'contain', // Ensure the image fits well
  },
  appName: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  slogan: {
    fontSize: 20,
    color: '#e0f2f7', // Lighter shade of white/blue
    marginBottom: 60, // Space before the arrow
    textAlign: 'center',
    fontStyle: 'italic',
  },
  arrowButton: {
    backgroundColor: '#2ecc71', // Green button
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30, // Pill shape
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  arrowText: {
    fontSize: 30,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  activityIndicator: {
    marginTop: 20,
  },
});
