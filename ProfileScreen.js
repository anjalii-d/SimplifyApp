// ProfileScreen.js
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native'; // Added ScrollView for potential future content

export default function ProfileScreen() {
  // Placeholder for future profile data and gamification stats
  const userName = "Student User";
  const userBadge = "Bronze Learner"; // Example badge
  const userLevel = 7;
  const xpToNextLevel = 150; // Example XP needed
  const lessonsCompleted = 12;
  const dailyStreak = 5;

  const handleEditProfile = () => {
    // Future functionality: navigate to an edit profile screen or open a modal
    console.log("Edit Profile button pressed!");
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerIconPlaceholder}>
          <Text style={styles.headerIconText}>?</Text> {/* Placeholder for an icon */}
        </View>
      </View>

      {/* Edit Button */}
      <TouchableOpacity onPress={handleEditProfile} style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Picture Placeholder */}
        <View style={styles.profilePictureContainer}>
          <View style={styles.profilePicturePlaceholder}>
            <Text style={styles.profilePictureText}>👤</Text> {/* User icon emoji */}
          </View>
          <Text style={styles.userName}>{userName}</Text>
        </View>

        {/* Gamified Data Section */}
        <View style={styles.infoSection}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Badge/Level:</Text>
            <Text style={styles.infoValue}>{userBadge} (Lv. {userLevel})</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>XP to next lvl:</Text>
            <Text style={styles.infoValue}>{xpToNextLevel}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Lessons Completed:</Text>
            <Text style={styles.infoValue}>{lessonsCompleted}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Streak:</Text>
            <Text style={styles.infoValue}>{dailyStreak} 🔥</Text>
          </View>
        </View>
      </ScrollView>

      {/* Home icon at the very bottom as per wireframe */}
      <View style={styles.homeIconPlaceholder}>
        <Text style={{ fontSize: 24 }}>🏠</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f8f8f8', // Light background
    paddingTop: 40, // Adjust for status bar
  },
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  headerIconPlaceholder: {
    width: 30, // Small circle placeholder for an icon
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIconText: {
    fontSize: 18,
    color: '#555',
  },
  // Edit Button Styles (positioned just below header)
  editButton: {
    alignSelf: 'flex-end', // Align to the right
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#e0e0e0', // Light grey background
    marginRight: 20, // Match horizontal padding of header
    marginTop: 10, // Space below header
    marginBottom: 20, // Space before profile picture
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  editButtonText: {
    fontSize: 16,
    color: '#555',
    fontWeight: '600',
  },
  scrollContent: {
    flexGrow: 1, // Allows content to grow and be scrollable
    alignItems: 'center', // Center content horizontally
    paddingBottom: 20, // Add padding at the bottom of the scroll view
  },
  // Profile Picture and Name Styles
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 30, // Space before info sections
  },
  profilePicturePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60, // Makes it a circle
    backgroundColor: '#d0d0d0', // Placeholder color
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#bbb',
  },
  profilePictureText: {
    fontSize: 60, // Large emoji for placeholder
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#34495e',
  },
  // Gamified Info Section
  infoSection: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
    width: '90%', // Take up most of the width
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 16,
    color: '#555',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  // Home Icon at the bottom
  homeIconPlaceholder: {
    alignSelf: 'center',
    marginTop: 'auto', // Pushes it to the bottom
    marginBottom: 20,
  },
});
