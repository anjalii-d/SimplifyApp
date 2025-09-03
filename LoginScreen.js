// LoginScreen.js
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getFirebaseAuth } from "./firebaseConfig";

export default function LoginScreen({ navigation }) {
  const auth = getFirebaseAuth(); // 🔑 Use helper function

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingSignup, setLoadingSignup] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const showCustomAlert = (title, message) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalVisible(true);
  };

  // ------------------ HANDLERS ------------------
  const handleLogin = async () => {
    if (!email || !password) {
      showCustomAlert("Input Error", "Please enter both email and password.");
      return;
    }

    setLoadingLogin(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      let errorMessage = "Login failed. Please check your credentials.";
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "The email address is not valid.";
          break;
        case "auth/user-disabled":
          errorMessage = "This user account has been disabled.";
          break;
        case "auth/user-not-found":
          errorMessage = "No user found with this email. Please sign up.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password. Please try again.";
          break;
        case "auth/too-many-requests":
          errorMessage =
            "Too many login attempts. Please wait and try again later.";
          break;
      }
      showCustomAlert("Login Error", errorMessage);
    } finally {
      setLoadingLogin(false);
    }
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      showCustomAlert("Input Error", "Please enter both email and password.");
      return;
    }
    if (password.length < 6) {
      showCustomAlert(
        "Password Too Short",
        "Password must be at least 6 characters long."
      );
      return;
    }

    setLoadingSignup(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      showCustomAlert("Success!", "Account created! You are now logged in.");
    } catch (error) {
      let errorMessage = error.message;
      if (error.code === "auth/email-already-in-use") {
        errorMessage =
          "This email is already in use. Please log in or use a different email.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "The email address is not valid.";
      } else if (error.code === "auth/operation-not-allowed") {
        errorMessage =
          "Email/Password sign-up is not enabled. Please contact support.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "The password is too weak. Please choose a stronger password.";
      }
      showCustomAlert("Sign Up Error", errorMessage);
    } finally {
      setLoadingSignup(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      showCustomAlert("Missing Email", "Please enter your email address first.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      showCustomAlert(
        "Password Reset",
        "A password reset link has been sent to your email."
      );
    } catch (error) {
      showCustomAlert("Error", "Failed to send reset email. Please try again.");
    }
  };

  // ------------------ RENDER ------------------
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to $implify!</Text>
      <Text style={styles.subtitle}>Real-world money, simplified.</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        editable={!loadingLogin && !loadingSignup}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        editable={!loadingLogin && !loadingSignup}
      />

      <TouchableOpacity
        style={[styles.button, loadingLogin && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loadingLogin}
      >
        {loadingLogin ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.signUpButton, loadingSignup && styles.buttonDisabled]}
        onPress={handleSignUp}
        disabled={loadingSignup}
      >
        {loadingSignup ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{modalTitle}</Text>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalCloseButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// ------------------ STYLES ------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f8",
    padding: 20,
  },
  title: { fontSize: 32, fontWeight: "bold", color: "#2c3e50", marginBottom: 10, textAlign: "center" },
  subtitle: { fontSize: 18, color: "#7f8c8d", marginBottom: 40, textAlign: "center" },
  input: {
    width: "80%",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 15,
    width: "80%",
    alignItems: "center",
  },
  signUpButton: { backgroundColor: "#2ecc71" },
  buttonDisabled: { backgroundColor: "#a0a0a0" },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  forgotPassword: { marginTop: 10, fontSize: 14, color: "#2980b9", textDecorationLine: "underline" },
  centeredView: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalView: { margin: 20, backgroundColor: "white", borderRadius: 20, padding: 35, alignItems: "center" },
  modalTitle: { marginBottom: 15, textAlign: "center", fontSize: 22, fontWeight: "bold", color: "#2c3e50" },
  modalText: { marginBottom: 15, textAlign: "center", fontSize: 16, color: "#34495e" },
  modalButton: { borderRadius: 20, paddingVertical: 10, paddingHorizontal: 20, marginTop: 10 },
  modalCloseButton: { backgroundColor: "#3498db" },
  modalButtonText: { color: "white", fontWeight: "bold", textAlign: "center", fontSize: 16 },
});