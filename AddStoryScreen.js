import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, Alert, ScrollView } from 'react-native';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from './firebaseConfig';

// Predefined tag options
const TAG_OPTIONS = ['Budgeting', 'Saving', 'Investing', 'Debt', 'Income', 'Goals', 'Challenge', 'Success', 'Learning', 'Other'];

// Helper component for a custom alert box, replacing the native Alert
const CustomAlert = ({ message, visible, onClose }) => {
  if (!visible) return null;
  return (
    <View style={alertStyles.overlay}>
      <View style={alertStyles.container}>
        <Text style={alertStyles.message}>{message}</Text>
        <TouchableOpacity onPress={onClose} style={alertStyles.button}>
          <Text style={alertStyles.buttonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function AddStoryScreen({ navigation }) {
  const [storyText, setStoryText] = useState('');
  const [selectedTags, setSelectedTags] = useState(new Set()); // Using a Set for efficient tag management
  const [customTag, setCustomTag] = useState(''); // For the 'Other' tag input
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Function to show the custom alert
  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertVisible(true);
  };

  // Firebase Auth setup and listener
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserId(currentUser.uid);
        console.log("AddStoryScreen: User authenticated. UID:", currentUser.uid);
      } else {
        setUserId(null);
        console.log("AddStoryScreen: No user authenticated.");
      }
      setAuthReady(true);
      console.log("AddStoryScreen: Auth state ready.");
    });

    return () => unsubscribe();
  }, []);

  // Function to toggle tag selection
  const handleTagPress = (tag) => {
    setSelectedTags(prevTags => {
      const newTags = new Set(prevTags);
      if (newTags.has(tag)) {
        newTags.delete(tag);
        // If 'Other' is deselected, clear custom tag input
        if (tag === 'Other') {
          setCustomTag('');
        }
      } else {
        newTags.add(tag);
      }
      return newTags;
    });
  };

  const handleSubmitStory = async () => {
    if (!storyText.trim()) {
      showAlert("Please write something before submitting!");
      return;
    }
    if (!authReady || !userId) {
      showAlert("Please wait while we prepare for submission. If this persists, try restarting the app.");
      console.log("AddStoryScreen: Submission blocked. Not authenticated or auth not ready. userId:", userId, "authReady:", authReady); // Log auth status
      return;
    }

    // Prepare tags for submission
    const tagsToSubmit = Array.from(selectedTags);
    if (selectedTags.has('Other') && customTag.trim()) {
      const cleanedCustomTag = customTag.trim();
      // Only add the custom tag if it's not empty and not just "Other" itself
      if (cleanedCustomTag.length > 0 && cleanedCustomTag.toLowerCase() !== 'other' && !tagsToSubmit.some(tag => tag.toLowerCase() === cleanedCustomTag.toLowerCase())) {
        tagsToSubmit.push(cleanedCustomTag);
      }
    }
    // Remove "Other" if it was just a placeholder and no custom tag was entered, or if a custom tag was added
    const finalTags = tagsToSubmit.filter(tag => tag !== 'Other' || (tag === 'Other' && customTag.trim()));


    setLoading(true);
    try {
      // MANDATORY: Use __app_id for Firestore paths
      const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
      const collectionPath = `artifacts/${appId}/public/data/stories`; // Define collection path

      console.log("AddStoryScreen: Attempting to add story...");
      console.log("AddStoryScreen: User ID:", userId);
      console.log("AddStoryScreen: App ID:", appId);
      console.log("AddStoryScreen: Collection Path:", collectionPath);
      console.log("AddStoryScreen: Story Text:", storyText);
      console.log("AddStoryScreen: Final Tags:", finalTags);


      await addDoc(collection(db, collectionPath), { // Use collectionPath here
        text: storyText,
        userId: userId,
        timestamp: serverTimestamp(),
        likes: 0,
        commentsCount: 0,
        tags: finalTags,
      });

      setStoryText('');
      setSelectedTags(new Set());
      setCustomTag('');
      showAlert("Your story has been added to the feed!");
      navigation.goBack();
    } catch (error) {
      console.error("AddStoryScreen: Error adding story:", error); // Log the full error object
      showAlert(`There was an error adding your story: ${error.message || 'Unknown error'}. Please try again.`);
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
        <Text style={styles.headerTitle}>Share Your Adventure</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.promptText}>What have you discovered on your journey?</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Type your story here..."
          placeholderTextColor="#7f8c8d"
          multiline
          value={storyText}
          onChangeText={setStoryText}
          editable={!loading && authReady}
        />

        <Text style={styles.tagsLabel}>Select Tags (Optional):</Text>
        <View style={styles.tagsContainer}>
          {TAG_OPTIONS.map((tag) => (
            <TouchableOpacity
              key={tag}
              style={[
                styles.tagButton,
                selectedTags.has(tag) && styles.selectedTagButton,
              ]}
              onPress={() => handleTagPress(tag)}
              disabled={!loading && !authReady} // Disable if loading or auth not ready
            >
              <Text style={[
                styles.tagButtonText,
                selectedTags.has(tag) && styles.selectedTagButtonText,
              ]}>
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedTags.has('Other') && (
          <TextInput
            style={styles.customTagInput}
            placeholder="Enter custom tag (e.g., 'Side Quest')"
            placeholderTextColor="#7f8c8d"
            value={customTag}
            onChangeText={setCustomTag}
            editable={!loading && authReady}
          />
        )}

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

      <CustomAlert 
        message={alertMessage}
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c3c',
    paddingTop: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1c1c3c',
    borderBottomWidth: 2,
    borderBottomColor: '#FFD700',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  backButton: {
    paddingRight: 15,
  },
  backButtonText: {
    fontSize: 24,
    color: '#3498db',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  headerRightPlaceholder: {
    width: 24,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  promptText: {
    fontSize: 18,
    color: '#e0e0e0',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  textInput: {
    width: '100%',
    height: 150,
    backgroundColor: '#2c3e50',
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    color: '#e0e0e0',
    borderColor: '#556677',
    borderWidth: 2,
    marginBottom: 20,
    textAlignVertical: 'top',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  tagsLabel: {
    fontSize: 16,
    color: '#FFD700',
    marginBottom: 10,
    alignSelf: 'flex-start',
    fontWeight: '600',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: 15,
  },
  tagButton: {
    backgroundColor: '#34495e',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#556677',
  },
  selectedTagButton: {
    backgroundColor: '#3498db',
    borderColor: '#8e44ad',
  },
  tagButtonText: {
    color: '#bdc3c7',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedTagButtonText: {
    color: '#ffffff',
  },
  customTagInput: {
    width: '100%',
    backgroundColor: '#2c3e50',
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    color: '#e0e0e0',
    borderColor: '#556677',
    borderWidth: 2,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  submitButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#27ae60',
  },
  submitButtonDisabled: {
    backgroundColor: '#95a5a6',
    borderColor: '#7f8c8d',
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
});

const alertStyles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#2c3e50',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#7f8c8d',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#e0e0e0',
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#8e44ad',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
