// LoginScreen.js
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// No longer need to destructure onLoginSuccess from route.params
export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State for loading indicator

  // Get the auth instance (now exported from firebaseConfig.js)
  const auth = getAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Input Error", "Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully!!");
      // The onAuthStateChanged listener in App.js will now handle navigation
    } catch (error) {
      console.error("Login failed:", error.message);
      let errorMessage = "Login failed. Please check your credentials.";
      if (error.code === 'auth/invalid-email') {
        errorMessage = "Invalid email address.";
      } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = "Incorrect email or password.";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Too many login attempts. Please try again later.";
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
      // The onAuthStateChanged listener in App.js will now handle navigation
    } catch (error) {
      console.error("Sign up failed:", error.message);
      let errorMessage = "Sign up failed. Please try again.";
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "This email is already in use.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Invalid email address.";
      }
      Alert.alert("Sign Up Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
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
        editable={!loading} // Disable input when loading
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry // Hides password characters
        value={password}
        onChangeText={setPassword}
        editable={!loading} // Disable input when loading
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading} // Disable button when loading
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
        disabled={loading} // Disable button when loading
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
    marginBottom: 40, // Increased margin for inputs
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
    backgroundColor: '#3498db', // A primary blue color
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
    backgroundColor: '#2ecc71', // A different color for sign up
  },
  buttonDisabled: {
    backgroundColor: '#a0a0a0', // Grey out buttons when loading
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});
