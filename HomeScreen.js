// HomeScreen.js
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

// Import all the screens that will be part of the tabs or accessible from home
import RealityFeedScreen from './RealityFeedScreen';
import Money101Screen from './Money101Screen';
import PathPeekScreen from './PathPeekScreen';
import ProfileScreen from './ProfileScreen';

export default function HomeScreen({ navigation}) {
  // State to manage which tab is currently active in the bottom navigation
  const [activeTab, setActiveTab] = useState('home');
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(150); // Current XP
  const [xpToNextLevel, setXpToNextLevel] = useState(500); // XP needed for next level

  // Helper function to render the content for the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <ScrollView contentContainerStyle={styles.homeContentScroll}>
            {/* Header with Adventure Info */}
            <View style={styles.header}>
              <TouchableOpacity style={styles.headerIcon}>
                <Text style={styles.iconText}>📖</Text> {/* Quest Log */}
              </TouchableOpacity>
              <View style={styles.levelContainer}>
                <Text style={styles.levelText}>LVL {level}</Text>
                <View style={styles.xpBarBackground}>
                  <View style={[styles.xpBarFill, { width: `${(xp / xpToNextLevel) * 100}%` }]} />
                </View>
                <Text style={styles.xpText}>{xp}/{xpToNextLevel} XP</Text>
              </View>
              <TouchableOpacity style={styles.headerIcon}>
                <Text style={styles.iconText}>🏆</Text> {/* Achievements */}
              </TouchableOpacity>
            </View>

            <Text style={styles.welcomeBackText}>Welcome, Adventurer!</Text>

            {/* Daily Quest Section */}
            <View style={styles.questCard}>
              <Text style={styles.questCardTitle}>📜 Today's Quest: "The Great Savings Hunt"</Text>
              <Text style={styles.questCardContent}>"Just managed to save up for my first concert tickets! Feels good to hit a goal."</Text>
              <Text style={styles.questRewardText}>Reward: +250 XP</Text>
            </View>

            {/* Adventure Log Section */}
            <View style={styles.adventureCard}>
              <Text style={styles.adventureCardTitle}>🗺️ The Adventure Awaits!</Text>
              <Text style={styles.adventureCardContent}>"Your journey begins here. Unlock new skills and discover hidden treasures in the world of finance!"</Text>
            </View>

            {/* Path Peek button - now a main journey button */}
            <TouchableOpacity
              style={styles.mainJourneyButton}
              onPress={() => setActiveTab('pathPeek')}
            >
              <Text style={styles.mainJourneyButtonText}>Explore the Path (Path Peek)</Text>
            </TouchableOpacity>

          </ScrollView>
        );
      case 'feed':
        return <RealityFeedScreen navigation={navigation} />;
      case 'money101':
        return <Money101Screen navigation={navigation} />;
      case 'pathPeek':
        return <PathPeekScreen navigation={navigation} />;
      case 'profile':
        return <ProfileScreen navigation={navigation} />;
      default:
        return <Text style={styles.errorText}>Your adventure has been paused. Something went wrong!</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Render the content for the active tab */}
        {renderTabContent()}

        {/* Bottom Navigation Bar */}
        <View style={styles.bottomNavBar}>
          <TouchableOpacity
            style={styles.navBarButton}
            onPress={() => setActiveTab('home')}
          >
            <Text style={[styles.navBarIcon, activeTab === 'home' && styles.navBarIconActive]}>🏰</Text>
            <Text style={[styles.navBarText, activeTab === 'home' && styles.navBarTextActive]}>Hub</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navBarButton}
            onPress={() => setActiveTab('feed')}
          >
            <Text style={[styles.navBarIcon, activeTab === 'feed' && styles.navBarIconActive]}>📢</Text>
            <Text style={[styles.navBarText, activeTab === 'feed' && styles.navBarTextActive]}>Village</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navBarButton}
            onPress={() => setActiveTab('money101')}
          >
            <Text style={[styles.navBarIcon, activeTab === 'money101' && styles.navBarIconActive]}>💰</Text>
            <Text style={[styles.navBarText, activeTab === 'money101' && styles.navBarTextActive]}>Quests</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navBarButton}
            onPress={() => setActiveTab('pathPeek')}
          >
            <Text style={[styles.navBarIcon, activeTab === 'pathPeek' && styles.navBarIconActive]}>🧭</Text>
            <Text style={[styles.navBarText, activeTab === 'pathPeek' && styles.navBarTextActive]}>Map</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navBarButton}
            onPress={() => setActiveTab('profile')}
          >
            <Text style={[styles.navBarIcon, activeTab === 'profile' && styles.navBarIconActive]}>👤</Text>
            <Text style={[styles.navBarText, activeTab === 'profile' && styles.navBarTextActive]}>Hero</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1c1c3c', // Dark blue background
  },
  container: {
    flex: 1,
    width: '100%',
  },
  homeContentScroll: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 0,
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
    fontSize: 28,
    color: '#FFD700', // Gold color for icons
  },
  levelContainer: {
    alignItems: 'center',
  },
  levelText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 5,
  },
  xpBarBackground: {
    width: 150,
    height: 10,
    backgroundColor: '#333',
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  xpBarFill: {
    height: '100%',
    backgroundColor: '#2ecc71',
    borderRadius: 5,
  },
  xpText: {
    fontSize: 14,
    color: '#e0e0e0',
    marginTop: 3,
  },
  welcomeBackText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  questCard: {
    backgroundColor: '#34495e',
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#7f8c8d',
  },
  questCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  questCardContent: {
    fontSize: 16,
    color: '#e0e0e0',
    lineHeight: 22,
  },
  questRewardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginTop: 10,
  },
  adventureCard: {
    backgroundColor: '#2c3e50',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#556677',
  },
  adventureCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  adventureCardContent: {
    fontSize: 16,
    color: '#e0e0e0',
    lineHeight: 22,
  },
  mainJourneyButton: {
    backgroundColor: '#3498db',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 20,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 3,
    borderColor: '#8e44ad',
  },
  mainJourneyButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
  },
  // Bottom Navigation Bar Styles
  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1c1c3c',
    borderTopWidth: 2,
    borderTopColor: '#FFD700',
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  navBarButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
  navBarIcon: {
    fontSize: 28,
    marginBottom: 2,
    color: '#7f8c8d',
  },
  navBarIconActive: {
    color: '#FFD700',
  },
  navBarText: {
    fontSize: 12,
    color: '#7f8c8d',
    fontWeight: '600',
  },
  navBarTextActive: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
});
