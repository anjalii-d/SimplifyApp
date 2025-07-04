// AddStoryScreen.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, Alert, ScrollView } from 'react-native'; // <-- Ensure ScrollView is imported here
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { db } from './firebaseConfig'; // Import your Firestore database instance

export default function AddStoryScreen({ navigation }) {
  const [storyText, setStoryText] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null); // To store authenticated user
  const [userId, setUserId] = useState(null); // To store the user ID
  const [authReady, setAuthReady] = useState(false); // To track if auth is ready

  // Firebase Auth setup and listener
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setUserId(currentUser.uid);
      } else {
        // Sign in anonymously if no user is authenticated
        try {
          // No longer attempting anonymous sign-in here directly,
          // as App.js handles the initial auth state.
          // This component will wait for authReady from App.js's listener.
          console.log("AddStoryScreen: User not authenticated on mount. Waiting for App.js auth state.");
        } catch (error) {
          console.error("AddStoryScreen Auth Error:", error);
        }
      }
      setAuthReady(true); // Auth state is now determined (either logged in or not)
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, []);

  const handleSubmitStory = async () => {
    if (!storyText.trim()) {
      Alert.alert("Empty Story", "Please write something before submitting!");
      return;
    }
    if (!authReady || !userId) {
      Alert.alert("Authentication Pending", "Please wait while we prepare for submission. If this persists, try restarting the app.");
      return;
    }

    setLoading(true);
    try {
      // Reference to the 'stories' collection
      const storiesCollectionRef = collection(db, 'stories');

      await addDoc(storiesCollectionRef, {
        text: storyText,
        userId: userId, // Store the ID of the user who posted
        timestamp: serverTimestamp(), // Firebase server timestamp for consistency
        likes: 0, // Initial likes count
        commentsCount: 0, // Initial comments count
      });

      setStoryText(''); // Clear input after successful submission
      Alert.alert("Success!", "Your story has been added to the feed!");
      navigation.goBack(); // Go back to the Reality Feed screen
    } catch (error) {
      console.error("Error adding story: ", error);
      Alert.alert("Submission Failed", "There was an error adding your story. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Your Story</Text>
        <View style={styles.headerRightPlaceholder} /> {/* For alignment */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.promptText}>Share your financial wins, challenges, or thoughts!</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Type your story here..."
          placeholderTextColor="#999"
          multiline
          value={storyText}
          onChangeText={setStoryText}
          editable={!loading && authReady} // Disable input while loading or if auth not ready
        />

        <TouchableOpacity
          style={[styles.submitButton, (!authReady || loading) && styles.submitButtonDisabled]}
          onPress={handleSubmitStory}
          disabled={!authReady || loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Submit Story</Text>
          )}
        </TouchableOpacity>

        {!authReady && (
          <Text style={styles.authStatusText}>Authenticating... Please wait.</Text>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    paddingTop: 40, // Adjust for status bar
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
    width: 24, // To balance the back button on the left
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  promptText: {
    fontSize: 18,
    color: '#34495e',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  textInput: {
    width: '100%',
    height: 150,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#333',
    borderColor: '#e0e0e0',
    borderWidth: 1,
    marginBottom: 20,
    textAlignVertical: 'top', // For multiline input on Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  submitButton: {
    backgroundColor: '#2ecc71', // Green submit button
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  submitButtonDisabled: {
    backgroundColor: '#a0d9b5', // Lighter green when disabled
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  authStatusText: {
    marginTop: 20,
    fontSize: 14,
    color: '#7f8c8d',
  },
})
