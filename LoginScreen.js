// LoginScreen.js
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function LoginScreen({ onLoginSuccess }) {
  const handleLogin = () => {
    // In a real app, this would involve Firebase authentication.
    // For now, we'll simulate success and navigate to the Home screen.
    console.log("Login button pressed.");
    onLoginSuccess();
  };

  const handleSignUp = () => {
    // In a real app, this would involve Firebase user creation.
    // For now, we'll just log.
    console.log("Sign Up button pressed.");
    // Could potentially navigate to a signup form if needed later
    onLoginSuccess(); // Simulate signup also leading to home for now
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to $implify!</Text>
      <Text style={styles.subtitle}>Real-world money, simplified.</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8', // Light background
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 50,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3498db', // A primary blue color
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 15,
    width: '80%', // Take up most of the width
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});
