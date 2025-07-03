// HomeScreen.js
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

// Import all the screens that will be part of the tabs or accessible from home
import RealityFeedScreen from './RealityFeedScreen';
import Money101Screen from './Money101Screen';
import PathPeekScreen from './PathPeekScreen'; // Path Peek will now be a main tab
import ProfileScreen from './ProfileScreen';

export default function HomeScreen() {
  // State to manage which tab is currently active in the bottom navigation
  const [activeTab, setActiveTab] = useState('home');

  // Helper function to render the content for the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <ScrollView contentContainerStyle={styles.homeContentScroll}>
            {/* Header section based on wireframe */}
            <View style={styles.header}>
              <TouchableOpacity style={styles.headerIcon}>
                <Text style={styles.iconText}>?</Text> {/* Infopage icon */}
              </TouchableOpacity>
              <Text style={styles.logoPlaceholder}>LOGO</Text> {/* Logo placeholder */}
              <TouchableOpacity style={styles.headerIcon}>
                <Text style={styles.iconText}>Share</Text> {/* Share icon */}
              </TouchableOpacity>
            </View>

            <Text style={styles.welcomeBackText}>Welcome back!</Text>

            {/* Featured Story Section */}
            <View style={styles.featuredSection}>
              <Text style={styles.featuredTitle}>⭐ Featured Story</Text>
              <Text style={styles.featuredContent}>"Just managed to save up for my first concert tickets! Feels good to hit a goal."</Text>
              {/* This content will eventually come from Firebase */}
            </View>

            {/* Lesson of Week Section */}
            <View style={styles.featuredSection}>
              <Text style={styles.featuredTitle}>📚 Lesson of Week</Text>
              <Text style={styles.featuredContent}>"Understanding Credit Scores: Why they matter and how to build a good one."</Text>
              {/* This content will eventually come from Firebase */}
            </View>

            {/* Path Peek button - ADDED BACK HERE */}
            <TouchableOpacity
              style={styles.pathPeekButton}
              onPress={() => setActiveTab('pathPeek')} // This will switch to the Path Peek tab
            >
              <Text style={styles.pathPeekButtonText}>Explore Career Paths (Path Peek)</Text>
            </TouchableOpacity>

          </ScrollView>
        );
      case 'feed':
        return <RealityFeedScreen />;
      case 'money101':
        return <Money101Screen />;
      case 'pathPeek': // Path Peek is now a direct tab
        return <PathPeekScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <Text>Something went wrong.</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Main content area */}
        <View style={styles.contentArea}>
          {renderTabContent()}
        </View>

        {/* Bottom Navigation Bar */}
        <View style={styles.bottomNavBar}>
          <TouchableOpacity
            style={[styles.navBarButton, activeTab === 'home' && styles.navBarButtonActive]}
            onPress={() => setActiveTab('home')}
          >
            <Text style={styles.navBarIcon}>🏠</Text>
            <Text style={styles.navBarText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navBarButton, activeTab === 'feed' && styles.navBarButtonActive]}
            onPress={() => setActiveTab('feed')}
          >
            <Text style={styles.navBarIcon}>🧾</Text>
            <Text style={styles.navBarText}>Feed</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navBarButton, activeTab === 'money101' && styles.navBarButtonActive]}
            onPress={() => setActiveTab('money101')}
          >
            <Text style={styles.navBarIcon}>📚</Text>
            <Text style={styles.navBarText}>Money 101</Text>
          </TouchableOpacity>

          {/* Path Peek Tab - KEPT HERE */}
          <TouchableOpacity
            style={[styles.navBarButton, activeTab === 'pathPeek' && styles.navBarButtonActive]}
            onPress={() => setActiveTab('pathPeek')}
          >
            <Text style={styles.navBarIcon}>🗺️</Text> {/* Using a map/path emoji for now */}
            <Text style={styles.navBarText}>Path Peek</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navBarButton, activeTab === 'profile' && styles.navBarButtonActive]}
            onPress={() => setActiveTab('profile')}
          >
            <Text style={styles.navBarIcon}>👤</Text>
            <Text style={styles.navBarText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  container: {
    flex: 1,
    width: '100%',
  },
  contentArea: {
    flex: 1, // Takes up all available space above the nav bar
  },
  // Home Tab Specific Styles
  homeContentScroll: {
    flexGrow: 1, // Allows content to grow and be scrollable
    alignItems: 'center',
    padding: 20,
    paddingTop: 0, // Header handles top spacing
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
    marginBottom: 20,
  },
  headerIcon: {
    padding: 5,
  },
  iconText: {
    fontSize: 24,
    color: '#2c3e50',
  },
  logoPlaceholder: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3498db',
  },
  welcomeBackText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 30,
    textAlign: 'center',
  },
  featuredSection: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 5,
  },
  featuredContent: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  // Path Peek button styles (re-added)
  pathPeekButton: {
    backgroundColor: '#2ecc71', // A green color for Path Peek
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20, // Space before the end of scroll view
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pathPeekButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },

  // Bottom Navigation Bar Styles
  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  navBarButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
  navBarButtonActive: {
    // Styles for the active tab button
    // You might add a different background color, bolder text, etc.
  },
  navBarIcon: {
    fontSize: 24,
    marginBottom: 4,
    color: '#7f8c8d', // Default icon color
  },
  navBarText: {
    fontSize: 12,
    color: '#7f8c8d', // Default text color
  },
  // Active tab text/icon color will be handled by conditional styling if needed later
});