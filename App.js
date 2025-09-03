import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from "./firebaseConfig";

// Screens
import SplashScreen from "./SplashScreen";
import OnboardingSlideshow from "./OnboardingSlideshow";
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import AddStoryScreen from "./AddStoryScreen";
import RealityFeedScreen from "./RealityFeedScreen";
import Money101Screen from "./Money101Screen";
import PathPeekScreen from "./PathPeekScreen";
import ProfileScreen from "./ProfileScreen";
import LessonDetailScreen from "./LessonDetailScreen";

const Stack = createStackNavigator();

const ONBOARDING_COMPLETED_KEY = "@SimplifyApp:onboardingCompleted";
const HAS_LAUNCHED_BEFORE_KEY = "@SimplifyApp:hasLaunchedBefore";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [hasLaunchedBefore, setHasLaunchedBefore] = useState(null);
  const [isLoadingInitialData, setIsLoadingInitialData] = useState(true);

  useEffect(() => {
    const auth = getFirebaseAuth();
    let unsubscribeAuth;

    const checkInitialStatus = async () => {
      try {
        // ✅ Has the app launched before?
        const launchedBeforeValue = await AsyncStorage.getItem(
          HAS_LAUNCHED_BEFORE_KEY
        );
        const appHasLaunchedBefore = launchedBeforeValue === "true";
        setHasLaunchedBefore(appHasLaunchedBefore);

        if (!appHasLaunchedBefore) {
          await AsyncStorage.setItem(HAS_LAUNCHED_BEFORE_KEY, "true");
        }

        // ✅ Check onboarding
        const onboardingValue = await AsyncStorage.getItem(
          ONBOARDING_COMPLETED_KEY
        );
        setIsOnboardingComplete(onboardingValue === "true");

        // ✅ Firebase auth listener
        unsubscribeAuth = onAuthStateChanged(auth, (user) => {
          setIsLoggedIn(!!user);
          setIsLoadingInitialData(false);
        });
      } catch (e) {
        console.error("App.js init error:", e);
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
      await AsyncStorage.setItem(ONBOARDING_COMPLETED_KEY, "true");
      setIsOnboardingComplete(true);
    } catch (e) {
      console.error("Failed to save onboarding status", e);
    }
  };

  // ✅ Decide initial route safely
  let initialRouteName = "Login";
  if (hasLaunchedBefore === false) {
    initialRouteName = "Splash";
  } else if (!isOnboardingComplete) {
    initialRouteName = "OnboardingSlideshow";
  } else if (isLoggedIn) {
    initialRouteName = "Home";
  }

  if (isLoadingInitialData || hasLaunchedBefore === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFD700" />
        <Text style={styles.loadingText}>Loading app...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={initialRouteName}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="OnboardingSlideshow">
            {(props) => (
              <OnboardingSlideshow
                {...props}
                onOnboardingComplete={handleOnboardingComplete}
              />
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#1c1c3c" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c1c3c",
  },
  loadingText: { marginTop: 10, fontSize: 16, color: "#e0e0e0" },
});