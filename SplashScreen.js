// SplashScreen.js
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Easing,
} from "react-native";
import { getFirebaseAuth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function SplashScreen({ navigation }) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const auth = getFirebaseAuth(); // 🔑 Use helper function

  useEffect(() => {
    // Pulsing animation for button
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigation.replace("Home");
    });

    return () => unsubscribe();
  }, []);

  const handlePress = () => navigation.replace("OnboardingSlideshow");

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={{ uri: "https://placehold.co/200x200/FFD700/8e44ad?text=QUEST" }}
          style={styles.emblem}
        />
        <Text style={styles.title}>Quest Log</Text>
        <Text style={styles.slogan}>Your adventure awaits...</Text>
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity style={styles.startQuestButton} onPress={handlePress}>
            <Text style={styles.buttonText}>Begin Your Quest</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#1c1c3c" },
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  emblem: {
    width: 200,
    height: 200,
    marginBottom: 30,
    resizeMode: "contain",
    borderRadius: 100,
    borderWidth: 5,
    borderColor: "#FFD700",
  },
  title: { fontSize: 48, fontWeight: "bold", color: "#FFD700", marginBottom: 10 },
  slogan: { fontSize: 22, color: "#e0e0e0", marginBottom: 60, textAlign: "center" },
  startQuestButton: {
    backgroundColor: "#8e44ad",
    paddingVertical: 18,
    paddingHorizontal: 35,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#FFD700",
  },
  buttonText: { fontSize: 20, color: "#fff", fontWeight: "bold" },
});
