// ProfileScreen.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Platform } from 'react-native'; // Removed KeyboardAvoidingView from import
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Assuming firebaseConfig.js exports 'db'

export default function ProfileScreen({ navigation }) {
  const [userId, setUserId] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [authReady, setAuthReady] = useState(false);

  console.log("ProfileScreen: Component rendering..."); // Added for web debugging

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        setAuthReady(true);
        console.log("ProfileScreen: User authenticated. UID:", user.uid);
        // Fetch user profile data
        await fetchUserProfile(user.uid);
      } else {
        setUserId(null);
        setAuthReady(false);
        setLoading(false); // Stop loading if no user
        console.log("ProfileScreen: No user authenticated.");
        Alert.alert("Authentication Required", "Please log in to view and customize your profile.");
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserProfile = async (uid) => {
    setLoading(true);
    try {
      const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
      // Path for user-specific private data
      const userProfileRef = doc(db, `artifacts/${appId}/users/${uid}/profile`, 'userProfile');
      console.log("ProfileScreen: Fetching profile from path:", `artifacts/${appId}/users/${uid}/profile/userProfile`);

      const docSnap = await getDoc(userProfileRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setDisplayName(data.displayName || '');
        console.log("ProfileScreen: Profile data fetched:", data);
      } else {
        console.log("ProfileScreen: No profile document found for user. Creating default.");
        setDisplayName(''); // Default empty if no profile exists
      }
    } catch (error) {
      console.error("ProfileScreen: Error fetching user profile:", error);
      Alert.alert("Error", "Failed to load profile data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!userId) {
      Alert.alert("Error", "User not authenticated. Cannot save profile.");
      return;
    }
    if (saving) return; // Prevent double submission

    setSaving(true);
    try {
      const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
      const userProfileRef = doc(db, `artifacts/${appId}/users/${userId}/profile`, 'userProfile');

      await setDoc(userProfileRef, {
        displayName: displayName.trim(),
        // You can add more profile fields here later, like XP, level, etc.
      }, { merge: true }); // Use merge: true to only update specified fields

      Alert.alert("Success!", "Profile saved successfully.");
      console.log("ProfileScreen: Profile saved for user:", userId);
    } catch (error) {
      console.error("ProfileScreen: Error saving user profile:", error);
      Alert.alert("Error", `Failed to save profile: ${error.message || 'Unknown error'}.`);
    } finally {
      setSaving(false);
    }
  };

  if (!authReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Authenticating...</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    // Replaced KeyboardAvoidingView with a standard View for web compatibility
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Your User ID:</Text>
        <Text style={styles.userIdText}>{userId || 'Not logged in'}</Text>

        <Text style={styles.label}>Display Name:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your display name"
          placeholderTextColor="#999"
          value={displayName}
          onChangeText={setDisplayName}
          editable={!saving && userId}
        />

        <TouchableOpacity
          style={[styles.saveButton, (!userId || saving) && styles.saveButtonDisabled]}
          onPress={handleSaveProfile}
          disabled={!userId || saving}
        >
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Save Profile</Text>
          )}
        </TouchableOpacity>

        {/* Placeholder for XP/Level - we'll add this later */}
        <View style={styles.xpPlaceholder}>
          <Text style={styles.xpText}>XP: 0</Text>
          <Text style={styles.xpText}>Level: 1</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    width: '100%', // Ensure it takes full width
    height: '100%', // Ensure it takes full height
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
    paddingRight: 15,
  },
  backButtonText: {
    fontSize: 24,
    color: '#3498db',
    fontWeight: 'bold',
  },
  headerRightPlaceholder: {
    width: 24,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 8,
    alignSelf: 'flex-start',
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
    backgroundColor: '#a0d9f0',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  xpPlaceholder: {
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
});
