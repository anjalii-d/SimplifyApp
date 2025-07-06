// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import auth and db directly from your firebaseConfig.js
import { auth, db } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

// Import your screens
import SplashScreen from './SplashScreen';
import OnboardingSlideshow from './OnboardingSlideshow';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import AddStoryScreen from './AddStoryScreen';
import RealityFeedScreen from './RealityFeedScreen';
import Money101Screen from './Money101Screen';
import PathPeekScreen from './PathPeekScreen';
import ProfileScreen from './ProfileScreen';
import LessonDetailScreen from './LessonDetailScreen';


const Stack = createStackNavigator();
const ONBOARDING_COMPLETED_KEY = '@SimplifyApp:onboardingCompleted';
const HAS_LAUNCHED_BEFORE_KEY = '@SimplifyApp:hasLaunchedBefore'; // NEW: Key for first launch check

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [hasLaunchedBefore, setHasLaunchedBefore] = useState(null); // null means not checked yet
  const [isLoadingInitialData, setIsLoadingInitialData] = useState(true); // Combines all loading states

  useEffect(() => {
    let unsubscribeAuth;

    const checkInitialStatus = async () => {
      try {
        // 1. Check if app has launched before
        const launchedBeforeValue = await AsyncStorage.getItem(HAS_LAUNCHED_BEFORE_KEY);
        const appHasLaunchedBefore = (launchedBeforeValue === 'true');
        setHasLaunchedBefore(appHasLaunchedBefore);

        // If it's the very first launch, mark it as launched for next time
        if (!appHasLaunchedBefore) {
          await AsyncStorage.setItem(HAS_LAUNCHED_BEFORE_KEY, 'true');
        }

        // 2. Check onboarding status
        const onboardingValue = await AsyncStorage.getItem(ONBOARDING_COMPLETED_KEY);
        const onboardingIsComplete = (onboardingValue === 'true');
        setIsOnboardingComplete(onboardingIsComplete);

        // 3. Listen for authentication state changes
        unsubscribeAuth = onAuthStateChanged(auth, (user) => {
          setIsLoggedIn(!!user); // Set isLoggedIn based on user presence
          setIsLoadingInitialData(false); // All initial checks complete
        });

      } catch (e) {
        console.error("App.js: Failed to load initial app status:", e);
        // In case of error, default to assuming it's not the first launch and not logged in
        setHasLaunchedBefore(true);
        setIsOnboardingComplete(false);
        setIsLoggedIn(false);
        setIsLoadingInitialData(false);
      }
    };

    checkInitialStatus();

    return () => {
      if (unsubscribeAuth) {
        unsubscribeAuth(); // Clean up auth listener
      }
    };
  }, []);

  // Handler for when onboarding is explicitly completed from the slideshow
  const handleOnboardingComplete = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
      setIsOnboardingComplete(true);
      // No need to navigate here, the onAuthStateChanged listener will handle it
      // or the next render cycle will pick up the new state.
    } catch (e) {
      console.error("Failed to save onboarding status to AsyncStorage", e);
    }
  };

  if (isLoadingInitialData || hasLaunchedBefore === null) { // Wait until all checks are done
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Loading app...</Text>
      </View>
    );
  }

  // Determine the initial route based on the checks
  let initialRouteName;
  if (!hasLaunchedBefore) {
    initialRouteName = 'Splash'; // First ever launch, go to Splash
  } else if (!isOnboardingComplete) {
    initialRouteName = 'OnboardingSlideshow'; // Not first launch, but onboarding not done
  } else if (!isLoggedIn) {
    initialRouteName = 'Login'; // Onboarding done, but not logged in
  } else {
    initialRouteName = 'Home'; // Onboarding done and logged in
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="OnboardingSlideshow">
            {props => <OnboardingSlideshow {...props} onOnboardingComplete={handleOnboardingComplete} />}
          </Stack.Screen>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddStory" component={AddStoryScreen} />
          <Stack.Screen name="RealityFeed" component={RealityFeedScreen} />
          <Stack.Screen name="Money101" component={Money101Screen} />
          <Stack.Screen name="PathPeek" component={PathPeekScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="LessonDetail" component={LessonDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f4f8',
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
