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
        // First launch check
        const launchedBeforeValue = await AsyncStorage.getItem(HAS_LAUNCHED_BEFORE_KEY);
        const appHasLaunchedBefore = launchedBeforeValue === 'true';
        setHasLaunchedBefore(appHasLaunchedBefore);

        if (!appHasLaunchedBefore) {
          await AsyncStorage.setItem(HAS_LAUNCHED_BEFORE_KEY, 'true');
        }

        // Onboarding check
        const onboardingValue = await AsyncStorage.getItem(ONBOARDING_COMPLETED_KEY);
        const onboardingIsComplete = onboardingValue === 'true';
        setIsOnboardingComplete(onboardingIsComplete);

        // Firebase auth listener
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

  if (isLoadingInitialData || hasLaunchedBefore === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Loading app...</Text>
      </View>
    );
  }

  // Determine initial route explicitly based on state:
  let initialRouteName = 'Login'; // default fallback
  if (!hasLaunchedBefore) {
    initialRouteName = 'Splash';
  } else if (!isOnboardingComplete) {
    initialRouteName = 'OnboardingSlideshow';
  } else if (isLoggedIn) {
    initialRouteName = 'Home';
  }

  return (
    <View style={styles.safeArea}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={initialRouteName}
        >
          {isLoggedIn ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="AddStory" component={AddStoryScreen} />
              <Stack.Screen name="RealityFeed" component={RealityFeedScreen} />
              <Stack.Screen name="Money101" component={Money101Screen} />
              <Stack.Screen name="PathPeek" component={PathPeekScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="LessonDetail" component={LessonDetailScreen} />
            </>
          ) : !hasLaunchedBefore ? (
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : !isOnboardingComplete ? (
            <Stack.Screen name="OnboardingSlideshow">
              {props => (
                <OnboardingSlideshow
                  {...props}
                  onOnboardingComplete={handleOnboardingComplete}
                />
              )}
            </Stack.Screen>
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
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
});
