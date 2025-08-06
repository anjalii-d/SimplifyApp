// ProfileScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { getAuth, onAuthStateChanged, signInAnonymously, signInWithCustomToken } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot, updateDoc, increment } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Assuming firebaseConfig.js exports 'db'

// Global Firebase variables provided by the Canvas environment
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : '';
const appId = typeof __app_id !== 'undefined' ? String(__app_id) : 'default-app-id';

// --- Utility Functions (can be moved to a separate file like 'utils/xpUtils.js') ---

/**
 * Calculates the user's level based on their experience points (XP).
 * Uses a scalable formula where higher levels require progressively more XP.
 * @param {number} xp - The current experience points of the user.
 * @returns {{level: number, xpForCurrentLevel: number, xpToNextLevel: number, progress: number}} The calculated level and progress details.
 */
const calculateLevelProgress = (xp) => {
  // A scalable formula: level = floor(sqrt(xp / 100)) + 1
  const level = Math.floor(Math.sqrt(xp / 100)) + 1;
  const xpForCurrentLevel = (level - 1) * (level - 1) * 100;
  const xpToNextLevel = level * level * 100;
  const xpInCurrentLevel = xp - xpForCurrentLevel;
  const xpNeeded = xpToNextLevel - xpForCurrentLevel;
  const progress = xpNeeded > 0 ? xpInCurrentLevel / xpNeeded : 0;

  return {
    level,
    xpForCurrentLevel,
    xpToNextLevel,
    progress
  };
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
  const [xpToNextLevel, setXpToNextLevel] = useState(0);
  const [levelProgress, setLevelProgress] = useState(0);
  const [profilePicture, setProfilePicture] = useState(DEFAULT_PFP);
  const [loading, setLoading] = useState(true); // Manages initial data load
  const [saving, setSaving] = useState(false); // Manages profile save operation
  const [authReady, setAuthReady] = useState(false); // Indicates if Firebase Auth state is known

  // Effect for handling Firebase Authentication state changes
  useEffect(() => {
    const auth = getAuth();
    let unsubscribeAuth;

    const initAuth = async () => {
      try {
        if (initialAuthToken) {
          await signInWithCustomToken(auth, initialAuthToken);
        } else {
          await signInAnonymously(auth);
        }
      } catch (error) {
        console.error("Firebase Auth Error:", error);
      }

      unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
        if (user) {
          setUserId(user.uid);
          setAuthReady(true); // Auth is ready, now we can fetch user profile
          setupProfileListener(user.uid); // Set up real-time listener for user profile
        } else {
          setUserId(null);
          setAuthReady(false);
          setLoading(false); // No user, stop loading indicator
          Alert.alert("Authentication Required", "Please log in to view and customize your profile.");
        }
      });
    };

    initAuth();

    return () => unsubscribeAuth && unsubscribeAuth(); // Clean up auth listener on unmount
  }, [initialAuthToken]); // Rerun if auth token changes

  // Callback to set up real-time listener for user profile data
  const setupProfileListener = useCallback((uid) => {
    const userProfileRef = doc(db, `artifacts/${appId}/users/${uid}/profile`, 'userProfile');

    const unsubscribeSnapshot = onSnapshot(userProfileRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setDisplayName(data.displayName || 'Adventurer');
        setUserXp(data.xp || 0);
        setProfilePicture(data.profilePicture || DEFAULT_PFP);

        // Calculate and set level and progress
        const { level, xpToNextLevel, progress } = calculateLevelProgress(data.xp || 0);
        setUserLevel(level);
        setXpToNextLevel(xpToNextLevel);
        setLevelProgress(progress);

      } else {
        // If no profile document exists, initialize it with default values
        setDisplayName('Adventurer');
        setUserXp(0);
        setUserLevel(1);
        setProfilePicture(DEFAULT_PFP);
        setLevelProgress(0);

        setDoc(userProfileRef, { displayName: 'Adventurer', xp: 0, profilePicture: DEFAULT_PFP }, { merge: true })
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
  }, [db]);

  // Handler to save the user's profile changes to Firestore
  const handleSaveProfile = async () => {
    if (!userId) {
      Alert.alert("Error", "User not authenticated. Cannot save profile.");
      return;
    }
    if (saving) return; // Prevent multiple save attempts

    setSaving(true);
    try {
      const userProfileRef = doc(db, `artifacts/${appId}/users/${userId}/profile`, 'userProfile');

      await setDoc(userProfileRef, {
        displayName: displayName.trim(),
        profilePicture: profilePicture,
      }, { merge: true }); // Use merge: true to update fields without overwriting the entire document

      Alert.alert("Success!", "Profile saved successfully.");
    } catch (error) {
      console.error("ProfileScreen: Error saving user profile:", error);
      Alert.alert("Error", `Failed to save profile: ${error.message || 'Unknown error'}.`);
    } finally {
      setSaving(false); // Reset saving state regardless of success or failure
    }
  };

  // --- Render Logic ---

  if (!authReady || loading) {
    // Show a loading indicator while Firebase Auth state is being determined or data is loading
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFD700" />
        <Text style={styles.loadingText}>Loading Hero data...</Text>
      </View>
    );
  }

  // Once authenticated or determined no user, display the profile screen
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.homeButton}>
            <Text style={styles.homeButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Hero</Text>
          <View style={{ width: 60 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Hero Stats Card */}
          <View style={styles.heroStatsCard}>
            <View style={styles.profilePictureContainer}>
              <View style={styles.profilePictureDisplay}>
                <Text style={styles.profilePictureText}>{profilePicture}</Text>
              </View>
            </View>
            <Text style={styles.heroName}>{displayName || 'New Adventurer'}</Text>

            <View style={styles.statLine}>
              <Text style={styles.levelText}>Level {userLevel}</Text>
              <View style={styles.xpBarBackground}>
                <View style={[styles.xpBarFill, { width: `${levelProgress * 100}%` }]} />
              </View>
              <Text style={styles.xpText}>{userXp}/{xpToNextLevel} XP</Text>
            </View>

          </View>

          {/* Profile Customization Card */}
          <View style={styles.customizationCard}>
            <Text style={styles.cardTitle}>📜 Customize Your Hero</Text>

            <Text style={styles.label}>Hero Name:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your hero name"
              placeholderTextColor="#7f8c8d"
              value={displayName}
              onChangeText={setDisplayName}
              editable={!saving && userId}
            />

            <Text style={styles.label}>Choose your Emblem:</Text>
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

            <Text style={styles.label}>Your Hero ID:</Text>
            <Text style={styles.userIdText}>{userId || 'Not logged in'}</Text>
          </View>


          {/* Save Profile Button */}
          <TouchableOpacity
            style={[styles.saveButton, (!userId || saving) && styles.saveButtonDisabled]}
            onPress={handleSaveProfile}
            disabled={!userId || saving} // Disable button if not logged in or currently saving
          >
            {saving ? (
              <ActivityIndicator color="#fff" /> // Show spinner when saving
            ) : (
              <Text style={styles.saveButtonText}>Save Hero Data</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// --- Stylesheet ---

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1c1c3c', // Dark blue background
  },
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#1c1c3c',
  },
  // --- Header Styles ---
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#FFD700',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  homeButton: {
    padding: 10,
  },
  homeButtonText: {
    fontSize: 16,
    color: '#e0e0e0',
    fontWeight: 'bold',
  },

  // --- Loading State Styles ---
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c3c',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#FFD700',
    fontWeight: 'bold',
  },

  // --- Main Content Styles ---
  scrollContent: {
    flexGrow: 1, // Allows content to grow and be scrollable
    padding: 20,
    alignItems: 'center',
    paddingBottom: 40, // Extra padding at the bottom for scroll comfort
  },
  label: {
    fontSize: 16,
    color: '#FFD700',
    marginBottom: 8,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    marginTop: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  // --- Hero Stats Card ---
  heroStatsCard: {
    backgroundColor: '#2c3e50',
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#556677',
  },
  profilePictureContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 5,
    borderColor: '#FFD700',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 15,
  },
  profilePictureDisplay: {
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: '#34495e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePictureText: {
    fontSize: 60,
  },
  heroName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  statLine: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    marginTop: 5,
  },
  levelText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginRight: 10,
  },
  xpBarBackground: {
    flex: 1,
    height: 12,
    backgroundColor: '#333',
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  xpBarFill: {
    height: '100%',
    backgroundColor: '#2ecc71',
    borderRadius: 6,
  },
  xpText: {
    fontSize: 14,
    color: '#e0e0e0',
    marginLeft: 10,
  },

  // --- Customization Card ---
  customizationCard: {
    backgroundColor: '#2c3e50',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#556677',
  },
  userIdText: {
    fontSize: 14,
    color: '#95a5a6',
    marginBottom: 20,
    alignSelf: 'flex-start',
    backgroundColor: '#1c1c3c',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    borderWidth: 1,
    borderColor: '#34495e',
  },
  textInput: {
    width: '100%',
    backgroundColor: '#34495e',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#fff',
    borderColor: '#556677',
    borderWidth: 1,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
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
    backgroundColor: '#34495e',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderWidth: 2,
    borderColor: '#556677',
  },
  selectedPfpOption: {
    borderColor: '#FFD700',
    backgroundColor: '#8e44ad',
  },
  pfpOptionText: {
    fontSize: 30,
  },

  // --- Save Button Styles ---
  saveButton: {
    backgroundColor: '#8e44ad',
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 50,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 3,
    borderColor: '#FFD700',
    marginTop: 20,
  },
  saveButtonDisabled: {
    backgroundColor: '#556677',
    borderColor: '#7f8c8d',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
