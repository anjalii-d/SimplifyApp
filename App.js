// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

// Screens
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
const HAS_LAUNCHED_BEFORE_KEY = '@SimplifyApp:hasLaunchedBefore';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [hasLaunchedBefore, setHasLaunchedBefore] = useState(null); // null = not yet checked
  const [isLoadingInitialData, setIsLoadingInitialData] = useState(true);

  useEffect(() => {
    let unsubscribeAuth;

    const checkInitialStatus = async () => {
      try {
        const launchedBeforeValue = await AsyncStorage.getItem(HAS_LAUNCHED_BEFORE_KEY);
        const appHasLaunchedBefore = launchedBeforeValue === 'true';
        setHasLaunchedBefore(appHasLaunchedBefore);

        if (!appHasLaunchedBefore) {
          await AsyncStorage.setItem(HAS_LAUNCHED_BEFORE_KEY, 'true');
        }

        const onboardingValue = await AsyncStorage.getItem(ONBOARDING_COMPLETED_KEY);
        const onboardingIsComplete = onboardingValue === 'true';
        setIsOnboardingComplete(onboardingIsComplete);

        unsubscribeAuth = onAuthStateChanged(auth, (user) => {
          setIsLoggedIn(!!user);
          setIsLoadingInitialData(false);
        });
      } catch (e) {
        console.error("App.js: Failed to load app status:", e);
        setHasLaunchedBefore(true);
        setIsOnboardingComplete(false);
        setIsLoggedIn(false);
        setIsLoadingInitialData(false);
      }
    };

    checkInitialStatus();

    return () => {
      if (unsubscribeAuth) unsubscribeAuth();
    };
  }, []);

  const handleOnboardingComplete = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
      setIsOnboardingComplete(true);
    } catch (e) {
      console.error("Failed to save onboarding status to AsyncStorage", e);
    }
  };

  // Determine the initial route name based on the app's state.
  let initialRouteName = 'Login'; // Default
  if (!hasLaunchedBefore) {
    initialRouteName = 'Splash';
  } else if (!isOnboardingComplete) {
    initialRouteName = 'OnboardingSlideshow';
  } else if (isLoggedIn) {
    initialRouteName = 'Home';
  }

  // Show a loading screen while we determine the initial state.
  if (isLoadingInitialData || hasLaunchedBefore === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFD700" />
        <Text style={styles.loadingText}>Loading app...</Text>
      </View>
    );
  }

  // The main app logic now uses a single navigator with a dynamic initialRouteName.
  return (
    <View style={styles.safeArea}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={initialRouteName}
        >
          {/* All screens are now defined in one place. */}
          {/* This is the key change to ensure the navigation context is stable. */}
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="OnboardingSlideshow">
            {props => (
              <OnboardingSlideshow {...props} onOnboardingComplete={handleOnboardingComplete} />
            )}
          </Stack.Screen>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddStoryScreen" component={AddStoryScreen} />
          <Stack.Screen name="RealityFeedScreen" component={RealityFeedScreen} />
          <Stack.Screen name="Money101Screen" component={Money101Screen} />
          <Stack.Screen name="PathPeekScreen" component={PathPeekScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="LessonDetailScreen" component={LessonDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1c1c3c',
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c3c',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#e0e0e0',
  },
});
