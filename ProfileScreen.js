// ProfileScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot, updateDoc, increment } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Assuming firebaseConfig.js exports 'db'

// --- Utility Functions (can be moved to a separate file like 'utils/xpUtils.js') ---

/**
 * Calculates the user's level based on their experience points (XP).
 * Uses a scalable formula where higher levels require progressively more XP.
 * @param {number} xp - The current experience points of the user.
 * @returns {number} The calculated level.
 */
const calculateLevel = (xp) => {
  // A common scalable formula: level = floor(sqrt(xp / 100)) + 1
  // This means:
  // Level 1: 0-99 XP
  // Level 2: 100-299 XP (sqrt(100/100)+1 = 2, sqrt(299/100)+1 = 2)
  // Level 3: 300-599 XP (sqrt(300/100)+1 = 2, sqrt(599/100)+1 = 3)
  // etc.
  return Math.floor(Math.sqrt(xp / 100)) + 1;
};

// Predefined profile picture options (emojis for simplicity)
const PFP_OPTIONS = ['👤', '😀', '😎', '🤩', '🚀', '💡', '📚', '💰', '🌱', '🌟'];
const DEFAULT_PFP = '👤'; // Default user icon

/**
 * Awards a specified amount of XP to a user.
 * This function can be imported and called from any screen that needs to award XP.
 * @param {string} uid - The Firebase User ID of the recipient.
 * @param {number} xpAmount - The amount of XP to award. Must be greater than 0.
 */
export const awardXpToUser = async (uid, xpAmount) => {
  if (!uid || xpAmount <= 0) {
    console.warn("Invalid XP award request: UID is missing or XP amount is invalid.");
    return;
  }

  // A more robust way to get app ID would be from environment variables or a config file
  // For now, retaining your original approach but noting the improvement area.
  const appId = typeof __app_id !== 'undefined' ? String(__app_id) : 'default-app-id';
  const userProfileRef = doc(db, `artifacts/${appId}/users/${uid}/profile`, 'userProfile');

  try {
    await updateDoc(userProfileRef, {
      xp: increment(xpAmount) // Atomically increments XP in Firestore
    });
    console.log(`XP Awarded: ${xpAmount} XP to user ${uid}`);
  } catch (error) {
    console.error(`Error awarding XP to user ${uid}:`, error);
    Alert.alert("XP Award Failed", "Could not update XP. Please try again later.");
  }
};

// --- ProfileScreen Component ---

export default function ProfileScreen({ navigation }) {
  const [userId, setUserId] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [userXp, setUserXp] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [profilePicture, setProfilePicture] = useState(DEFAULT_PFP);
  const [loading, setLoading] = useState(true); // Manages initial data load
  const [saving, setSaving] = useState(false); // Manages profile save operation
  const [authReady, setAuthReady] = useState(false); // Indicates if Firebase Auth state is known

  // console.log("ProfileScreen: Component rendering..."); // Uncomment for detailed logging during development

  // Effect for handling Firebase Authentication state changes
  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        setAuthReady(true); // Auth is ready, now we can fetch user profile
        // console.log("ProfileScreen: User authenticated. UID:", user.uid);
        setupProfileListener(user.uid); // Set up real-time listener for user profile
      } else {
        setUserId(null);
        setAuthReady(false);
        setLoading(false); // No user, stop loading indicator
        // console.log("ProfileScreen: No user authenticated.");
        Alert.alert("Authentication Required", "Please log in to view and customize your profile.");
      }
    });

    return () => unsubscribeAuth(); // Clean up auth listener on unmount
  }, []); // Empty dependency array means this runs once on component mount

  // Callback to set up real-time listener for user profile data
  const setupProfileListener = useCallback((uid) => {
    const appId = typeof __app_id !== 'undefined' ? String(__app_id) : 'default-app-id';
    const userProfileRef = doc(db, `artifacts/${appId}/users/${uid}/profile`, 'userProfile');
    // console.log("ProfileScreen: Setting up real-time listener for profile:", `artifacts/${appId}/users/${uid}/profile/userProfile`);

    const unsubscribeSnapshot = onSnapshot(userProfileRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setDisplayName(data.displayName || '');
        setUserXp(data.xp || 0);
        setUserLevel(calculateLevel(data.xp || 0));
        setProfilePicture(data.profilePicture || DEFAULT_PFP);
        // console.log("ProfileScreen: Real-time profile data received:", data);
      } else {
        // If no profile document exists, initialize it with default values
        // This ensures a profile document exists for new users or if it was deleted
        // console.log("ProfileScreen: No profile document found. Initializing with defaults.");
        setDisplayName('');
        setUserXp(0);
        setUserLevel(1);
        setProfilePicture(DEFAULT_PFP);
        setDoc(userProfileRef, { displayName: '', xp: 0, profilePicture: DEFAULT_PFP }, { merge: true })
          .then(() => console.log("ProfileScreen: Default profile created."))
          .catch(error => console.error("ProfileScreen: Error creating default profile:", error));
      }
      setLoading(false); // Data is loaded or initialized, stop loading
    }, (error) => {
      console.error("ProfileScreen: Error listening to user profile:", error);
      Alert.alert("Error", "Failed to load profile data in real-time. Please try again.");
      setLoading(false);
    });

    return () => unsubscribeSnapshot(); // Clean up Firestore snapshot listener on unmount
  }, [db]); // Depend on db to ensure listener is re-setup if db changes (unlikely, but good practice)

  // Handler to save the user's profile changes to Firestore
  const handleSaveProfile = async () => {
    if (!userId) {
      Alert.alert("Error", "User not authenticated. Cannot save profile.");
      return;
    }
    if (saving) return; // Prevent multiple save attempts

    setSaving(true);
    try {
      const appId = typeof __app_id !== 'undefined' ? String(__app_id) : 'default-app-id';
      const userProfileRef = doc(db, `artifacts/${appId}/users/${userId}/profile`, 'userProfile');

      await setDoc(userProfileRef, {
        displayName: displayName.trim(),
        // XP is primarily updated via awardXpToUser, but ensuring it's part of the profile document
        xp: userXp,
        profilePicture: profilePicture,
      }, { merge: true }); // Use merge: true to update fields without overwriting the entire document

      Alert.alert("Success!", "Profile saved successfully.");
      // console.log("ProfileScreen: Profile saved for user:", userId);
    } catch (error) {
      console.error("ProfileScreen: Error saving user profile:", error);
      Alert.alert("Error", `Failed to save profile: ${error.message || 'Unknown error'}.`);
    } finally {
      setSaving(false); // Reset saving state regardless of success or failure
    }
  };

  // --- Render Logic ---

  if (!authReady) {
    // Show a loading indicator while Firebase Auth state is being determined
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Authenticating...</Text>
      </View>
    );
  }

  // Once authenticated or determined no user, display the profile screen
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Back Button: Calls navigation.goBack() to return to the previous screen in the stack */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* User Profile Picture Display */}
        <View style={styles.profilePictureContainer}>
          <View style={styles.profilePictureDisplay}>
            <Text style={styles.profilePictureText}>{profilePicture}</Text>
          </View>
          <Text style={styles.userName}>{displayName || 'New User'}</Text>
        </View>

        {/* Profile Picture Selection Options */}
        <Text style={styles.label}>Choose your Profile Picture:</Text>
        <View style={styles.pfpOptionsContainer}>
          {PFP_OPTIONS.map((pfp, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.pfpOptionButton,
                profilePicture === pfp && styles.selectedPfpOption, // Highlight selected PFP
              ]}
              onPress={() => setProfilePicture(pfp)}
            >
              <Text style={styles.pfpOptionText}>{pfp}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* User ID Display */}
        <Text style={styles.label}>Your User ID:</Text>
        <Text style={styles.userIdText}>{userId || 'Not logged in'}</Text>

        {/* Display Name Input */}
        <Text style={styles.label}>Display Name:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your display name"
          placeholderTextColor="#999"
          value={displayName}
          onChangeText={setDisplayName}
          editable={!saving && userId} // Disable editing while saving or if not logged in
        />

        {/* Save Profile Button */}
        <TouchableOpacity
          style={[styles.saveButton, (!userId || saving) && styles.saveButtonDisabled]}
          onPress={handleSaveProfile}
          disabled={!userId || saving} // Disable button if not logged in or currently saving
        >
          {saving ? (
            <ActivityIndicator color="#fff" /> // Show spinner when saving
          ) : (
            <Text style={styles.saveButtonText}>Save Profile</Text>
          )}
        </TouchableOpacity>

        {/* XP and Level Display */}
        <View style={styles.xpContainer}>
          <Text style={styles.xpText}>XP: {userXp}</Text>
          <Text style={styles.xpText}>Level: {userLevel}</Text>
          {/* You could add a progress bar or next level info here */}
        </View>

        {/* Example Button to Award XP (for testing) */}
        {/* This would typically be triggered by in-app actions, not directly on the profile screen */}
        {/* <TouchableOpacity
          style={styles.awardXpButton}
          onPress={() => userId && awardXpToUser(userId, 50)}
          disabled={!userId}
        >
          <Text style={styles.awardXpButtonText}>Award 50 XP (Test)</Text>
        </TouchableOpacity> */}

      </ScrollView>
    </View>
  );
}

// --- Stylesheet ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
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
    paddingRight: 15, // Provide some spacing for the arrow
  },
  backButtonText: {
    fontSize: 24,
    color: '#3498db',
    fontWeight: 'bold',
  },
  headerRightPlaceholder: {
    width: 24, // Matches the back button's approximate width for symmetrical header
  },
  scrollContent: {
    flexGrow: 1, // Allows content to grow and be scrollable
    padding: 20,
    alignItems: 'center',
    paddingBottom: 40, // Extra padding at the bottom for scroll comfort
  },
  label: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 8,
    alignSelf: 'flex-start', // Align label to the start
    fontWeight: '600',
    marginTop: 15,
  },
  userIdText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 20,
    alignSelf: 'flex-start',
    backgroundColor: '#e9eff4',
    padding: 10,
    borderRadius: 8,
    width: '100%',
  },
  textInput: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#333',
    borderColor: '#e0e0e0',
    borderWidth: 1,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  saveButton: {
    backgroundColor: '#3498db',
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
    marginTop: 10,
  },
  saveButtonDisabled: {
    backgroundColor: '#a0d9f0', // Lighter color for disabled state
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  xpContainer: {
    marginTop: 40,
    padding: 20,
    backgroundColor: '#e9eff4',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d0dbe4',
  },
  xpText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  profilePictureDisplay: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#d0d0d0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#bbb',
    overflow: 'hidden',
  },
  profilePictureText: {
    fontSize: 60,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#34495e',
  },
  pfpOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
    width: '100%',
  },
  pfpOptionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e9eff4',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  selectedPfpOption: {
    borderColor: '#3498db',
    backgroundColor: '#d1e7dd',
  },
  pfpOptionText: {
    fontSize: 30,
  },
  awardXpButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  awardXpButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});