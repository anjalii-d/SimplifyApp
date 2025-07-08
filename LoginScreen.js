// LoginScreen.js
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen({ navigation }) { // <-- Receive navigation prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State for loading indicator

  const auth = getAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Input Error", "Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully!");
      // App.js's onAuthStateChanged listener will now handle navigation to Home
    } catch (error) {
      console.error("Login failed:", error.message);
      let errorMessage = "Login failed. Please check your credentials.";
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = "The email address is not valid.";
          break;
        case 'auth/user-disabled':
          errorMessage = "This user account has been disabled.";
          break;
        case 'auth/user-not-found':
          errorMessage = "No user found with this email. Please sign up.";
          break;
        case 'auth/wrong-password':
          errorMessage = "Incorrect password. Please try again.";
          break;
        case 'auth/too-many-requests':
          errorMessage = "Too many login attempts. Please try again later.";
          break;
        default:
          errorMessage = `Login failed: ${error.message}`; // Fallback for unexpected errors
      }
      Alert.alert("Login Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert("Input Error", "Please enter both email and password.");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Password Too Short", "Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up successfully!");
      Alert.alert("Success!", "Account created! You are now logged in.");
      // App.js's onAuthStateChanged listener will now handle navigation to Home
    } catch (error) {
      console.error("Sign up failed:", error.message);
      let errorMessage = "Sign up failed. Please try again.";
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = "This email is already in use. Please log in or use a different email.";
          break;
        case 'auth/invalid-email':
          errorMessage = "The email address is not valid.";
          break;
        case 'auth/operation-not-allowed':
          errorMessage = "Email/Password sign-up is not enabled. Please contact support."; // This is the error if not enabled
          break;
        case 'auth/weak-password':
          errorMessage = "The password is too weak. Please choose a stronger password.";
          break;
        default:
          errorMessage = `Sign up failed: ${error.message}`; // Fallback for unexpected errors
      }
      Alert.alert("Sign Up Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* NEW: Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Splash')} // Navigate back to the Splash screen
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Welcome to $implify!</Text>
      <Text style={styles.subtitle}>Real-world money, simplified.</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        editable={!loading}
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.signUpButton, loading && styles.buttonDisabled]}
        onPress={handleSignUp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
    padding: 20,
  },
  // NEW: Back Button Styles
  backButton: {
    position: 'absolute',
    top: 40, // Adjust based on SafeAreaView and status bar height
    left: 20,
    zIndex: 10,
    padding: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#34495e', // Darker color for the arrow
    fontWeight: 'bold',
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
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  signUpButton: {
    backgroundColor: '#2ecc71',
  },
  buttonDisabled: {
    backgroundColor: '#a0a0a0',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});
