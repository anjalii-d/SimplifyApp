// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native'; // <-- Import SafeAreaView
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

// Import auth and db directly from your firebaseConfig.js
import { auth, db } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

// Import your screens
import SplashScreen from './SplashScreen'; // New Splash Screen
import OnboardingSlideshow from './OnboardingSlideshow'; // New Onboarding Slideshow
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import AddStoryScreen from './AddStoryScreen';
import RealityFeedScreen from './RealityFeedScreen';
import Money101Screen from './Money101Screen';
import PathPeekScreen from './PathPeekScreen';
import ProfileScreen from './ProfileScreen';
import LessonDetailScreen from './LessonDetailScreen'; // <-- NEW: Import LessonDetailScreen

const Stack = createStackNavigator();
const ONBOARDING_COMPLETED_KEY = '@SimplifyApp:onboardingCompleted';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [isLoadingOnboarding, setIsLoadingOnboarding] = useState(true); // New state for onboarding check

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const value = await AsyncStorage.getItem(ONBOARDING_COMPLETED_KEY);
        if (value !== null && value === 'true') {
          setIsOnboardingComplete(true);
        } else {
          setIsOnboardingComplete(false);
        }
      } catch (e) {
        console.error("Failed to load onboarding status from AsyncStorage", e);
        setIsOnboardingComplete(false); // Assume not complete on error
      } finally {
        setIsLoadingOnboarding(false); // Onboarding check complete
      }
    };

    checkOnboardingStatus();

    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in:", user.uid);
        setIsLoggedIn(true);
      } else {
        console.log("No user signed in. Displaying Login Screen.");
        setIsLoggedIn(false);
      }
      setIsLoadingAuth(false); // Auth check complete
    });

    return () => unsubscribe();
  }, []);

  const handleOnboardingComplete = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
      setIsOnboardingComplete(true);
    } catch (e) {
      console.error("Failed to save onboarding status to AsyncStorage", e);
    }
  };

  // Show a loading screen while checking both auth and onboarding status
  if (isLoadingAuth || isLoadingOnboarding) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Initializing app...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}> {/* <-- NEW: Wrap with SafeAreaView */}
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isOnboardingComplete ? (
            <>
              <Stack.Screen name="Splash" component={SplashScreen} />
              <Stack.Screen name="OnboardingSlideshow">
                {props => <OnboardingSlideshow {...props} onOnboardingComplete={handleOnboardingComplete} />}
              </Stack.Screen>
            </>
          ) : isLoggedIn ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="AddStory" component={AddStoryScreen} />
              <Stack.Screen name="RealityFeed" component={RealityFeedScreen} />
              <Stack.Screen name="Money101" component={Money101Screen} />
              <Stack.Screen name="PathPeek" component={PathPeekScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="LessonDetail" component={LessonDetailScreen} />
            </>
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { // <-- NEW: Style for SafeAreaView
    flex: 1,
    backgroundColor: '#f0f4f8', // Match your app's background
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
});
