// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import auth and db directly from your firebaseConfig.js
import { auth, db } from './firebaseConfig'; // Now importing 'auth' directly
import { onAuthStateChanged } from 'firebase/auth'; // Only need onAuthStateChanged here

// Import your screens
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import AddStoryScreen from './AddStoryScreen';
import RealityFeedScreen from './RealityFeedScreen'; // Ensure RealityFeedScreen is imported
import Money101Screen from './Money101Screen'; // Ensure Money101Screen is imported
import PathPeekScreen from './PathPeekScreen'; // Ensure PathPeekScreen is imported
import ProfileScreen from './ProfileScreen'; // Ensure ProfileScreen is imported


const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log("User is signed in:", user.uid);
        setIsLoggedIn(true);
      } else {
        // No user is signed in. We will now rely on the LoginScreen
        // to handle sign-in/sign-up and then onAuthStateChanged will detect it.
        console.log("No user signed in. Displaying Login Screen.");
        setIsLoggedIn(false);
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

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          // If logged in, show HomeScreen and other app screens
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="AddStory" component={AddStoryScreen} />
            {/* Register other main screens that HomeScreen might navigate to directly if needed,
                though HomeScreen's internal state handles most of its child screen rendering.
                It's good practice to register them here if they are targets for navigation. */}
            <Stack.Screen name="RealityFeed" component={RealityFeedScreen} />
            <Stack.Screen name="Money101" component={Money101Screen} />
            <Stack.Screen name="PathPeek" component={PathPeekScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        ) : (
          // If not logged in, show LoginScreen.
          // We no longer pass onLoginSuccess as a prop, as onAuthStateChanged handles state change.
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
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
