// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Import your screens
import LoginScreen from './LoginScreen'; // Import the new LoginScreen
import HomeScreen from './HomeScreen';

// Firebase configuration (ensure these global variables are defined in your environment)
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id'; // Using appId for consistency

// Initialize Firebase outside the component to prevent re-initialization
let app, db, auth;
if (Object.keys(firebaseConfig).length > 0) {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
} else {
  console.error("Firebase config is missing. Please ensure __firebase_config is set.");
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true); // New state for auth loading

  useEffect(() => {
    // If Firebase is not initialized, we can't proceed with auth
    if (!auth) {
      setIsLoadingAuth(false);
      console.error("Firebase Auth is not initialized. Cannot check auth state.");
      return;
    }

    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log("User is signed in:", user.uid);
        setIsLoggedIn(true);
      } else {
        // No user is signed in. Attempt anonymous sign-in if no custom token provided.
        console.log("No user signed in. Attempting anonymous sign-in or custom token sign-in.");
        if (initialAuthToken) {
          signInWithCustomToken(auth, initialAuthToken)
            .then(() => {
              console.log("Signed in with custom token.");
              setIsLoggedIn(true);
            })
            .catch((error) => {
              console.error("Error signing in with custom token:", error);
              // Fallback to anonymous if custom token fails for some reason
              signInAnonymously(auth)
                .then(() => {
                  console.log("Signed in anonymously after custom token failure.");
                  setIsLoggedIn(true);
                })
                .catch((anonError) => {
                  console.error("Error signing in anonymously:", anonError);
                  setIsLoggedIn(false); // Auth failed
                });
            });
        } else {
          // If no custom token, sign in anonymously by default
          signInAnonymously(auth)
            .then(() => {
              console.log("Signed in anonymously.");
              setIsLoggedIn(true);
            })
            .catch((error) => {
              console.error("Error signing in anonymously:", error);
              setIsLoggedIn(false); // Auth failed
            });
        }
      }
      setIsLoadingAuth(false); // Auth check complete
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []); // Empty dependency array means this runs once on mount

  if (isLoadingAuth) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Initializing app...</Text>
      </View>
    );
  }

  // Render LoginScreen if not logged in, otherwise render HomeScreen
  if (!isLoggedIn) {
    return <LoginScreen onLoginSuccess={() => setIsLoggedIn(true)} />;
  } else {
    return <HomeScreen />;
  }
}

const styles = StyleSheet.create({
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
});
