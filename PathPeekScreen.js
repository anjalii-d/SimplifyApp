// PathPeekScreen.js
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  BackHandler // Import BackHandler for Android
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

const { width } = Dimensions.get('window');

// Enhanced Dummy data for careers with location-specific costs AND salaries
const careerCategories = [
  {
    id: 'tech',
    name: 'Tech',
    description: 'Innovate and build the future with coding, software development, and IT roles.',
    emoji: '💻',
    color: '#3498db',
    locationSalaries: {
      'Major City': 95000,
      'Mid-sized City': 80000,
      'Suburban Area': 70000,
      'Rural Area': 60000,
    },
    locationCosts: {
      'Major City': { housing: 1500, food: 400, transportation: 150, utility: 150 },
      'Mid-sized City': { housing: 1200, food: 350, transportation: 120, utility: 120 },
      'Suburban Area': { housing: 1000, food: 300, transportation: 100, utility: 100 },
      'Rural Area': { housing: 800, food: 250, transportation: 80, utility: 80 },
    }
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Care for others as a nurse, doctor, therapist, or medical researcher.',
    emoji: '🩺',
    color: '#2ecc71',
    locationSalaries: {
      'Major City': 85000,
      'Mid-sized City': 70000,
      'Suburban Area': 60000,
      'Rural Area': 50000,
    },
    locationCosts: {
      'Major City': { housing: 1200, food: 350, transportation: 120, utility: 120 },
      'Mid-sized City': { housing: 1000, food: 300, transportation: 100, utility: 100 },
      'Suburban Area': { housing: 850, food: 280, transportation: 90, utility: 90 },
      'Rural Area': { housing: 700, food: 220, transportation: 70, utility: 70 },
    }
  },
  {
    id: 'arts',
    name: 'Arts & Design',
    description: 'Express creativity through visual arts, music, writing, or graphic design.',
    emoji: '🎨',
    color: '#f39c12',
    locationSalaries: {
      'Major City': 60000,
      'Mid-sized City': 50000,
      'Suburban Area': 45000,
      'Rural Area': 40000,
    },
    locationCosts: {
      'Major City': { housing: 1000, food: 300, transportation: 100, utility: 100 },
      'Mid-sized City': { housing: 800, food: 250, transportation: 80, utility: 80 },
      'Suburban Area': { housing: 700, food: 220, transportation: 70, utility: 70 },
      'Rural Area': { housing: 600, food: 180, transportation: 60, utility: 60 },
    }
  },
  {
    id: 'finance',
    name: 'Finance',
    description: 'Manage money, investments, and financial planning for individuals or companies.',
    emoji: '💰',
    color: '#9b59b6',
    locationSalaries: {
      'Major City': 90000,
      'Mid-sized City': 75000,
      'Suburban Area': 65000,
      'Rural Area': 55000,
    },
    locationCosts: {
      'Major City': { housing: 1800, food: 450, transportation: 180, utility: 180 },
      'Mid-sized City': { housing: 1500, food: 400, transportation: 150, utility: 150 },
      'Suburban Area': { housing: 1300, food: 350, transportation: 130, utility: 130 },
      'Rural Area': { housing: 1100, food: 300, transportation: 110, utility: 110 },
    }
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Shape young minds as a teacher, professor, or educational administrator.',
    emoji: '�',
    color: '#e74c3c',
    locationSalaries: {
      'Major City': 70000,
      'Mid-sized City': 60000,
      'Suburban Area': 50000,
      'Rural Area': 45000,
    },
    locationCosts: {
      'Major City': { housing: 1100, food: 320, transportation: 110, utility: 110 },
      'Mid-sized City': { housing: 950, food: 280, transportation: 95, utility: 95 },
      'Suburban Area': { housing: 800, food: 250, transportation: 80, utility: 80 },
      'Rural Area': { housing: 700, food: 200, transportation: 70, utility: 70 },
    }
  },
  {
    id: 'trades',
    name: 'Skilled Trades',
    description: 'Work with your hands in fields like plumbing, electrical, carpentry, or mechanics.',
    emoji: '🔧',
    color: '#FFD700', // Using the gold theme color
    locationSalaries: {
      'Major City': 65000,
      'Mid-sized City': 55000,
      'Suburban Area': 48000,
      'Rural Area': 40000,
    },
    locationCosts: {
      'Major City': { housing: 900, food: 280, transportation: 90, utility: 90 },
      'Mid-sized City': { housing: 750, food: 230, transportation: 75, utility: 75 },
      'Suburban Area': { housing: 650, food: 200, transportation: 65, utility: 65 },
      'Rural Area': { housing: 550, food: 180, transportation: 55, utility: 55 },
    }
  },
];

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function PathPeekScreen({ navigation }) {
  const [currentView, setCurrentView] = useState('cloud');
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [selectedCostLocation, setSelectedCostLocation] = useState('Major City');

  const handleCareerPress = (career) => {
    setSelectedCareer(career);
    setSelectedCostLocation('Major City');
    setCurrentView('detail');
  };

  const handleLocationSelect = (locType) => {
    setSelectedCostLocation(locType);
  };

  // Available location types for the buttons
  const locationTypes = ['Major City', 'Mid-sized City', 'Suburban Area', 'Rural Area'];

  // This hook runs whenever the screen is focused or unfocused.
  // We use it to manage the hardware back button on Android.
  useFocusEffect(
    React.useCallback(() => {
      // Define the behavior for the Android hardware back button
      const onBackPress = () => {
        if (currentView === 'detail') {
          // If we are in the detail view, pressing back should return to the career cloud
          setCurrentView('cloud');
          return true; // Prevents default behavior (e.g., exiting the app)
        } else {
          // If we are in the career cloud view, allow the default behavior, which
          // is to go back to the previous screen on the navigation stack
          return false;
        }
      };

      // Add the event listener when the screen is focused
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      // Return a cleanup function to remove the listener when the screen is unfocused
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [currentView]) // Re-run this effect if the currentView state changes
  );

  const renderCareerCloud = () => (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.homeButton} onPress={() => navigation.goBack()}>
          <Text style={styles.homeButtonText}>← Go Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Path Peek</Text>
        {/* Added a Home button for consistent navigation */}
        <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.homeButtonText}>🏠 Hub</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.cloudContainer}>
        <Text style={styles.cloudSubtitle}>🗺️ Explore different career paths and their real-world costs.</Text>
        <View style={styles.careerCirclesContainer}>
          {careerCategories.map((career) => (
            <TouchableOpacity
              key={career.id}
              style={[styles.careerCard, { backgroundColor: career.color }]}
              onPress={() => handleCareerPress(career)}
            >
              <Text style={styles.careerEmoji}>{career.emoji}</Text>
              <Text style={styles.careerName}>{career.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  const renderCareerDetail = () => {
    if (!selectedCareer) return null;

    const currentCosts = selectedCareer.locationCosts[selectedCostLocation] || {};
    const currentSalary = selectedCareer.locationSalaries[selectedCostLocation] || 0;
    const totalMonthlyCost = Object.values(currentCosts).reduce((sum, cost) => sum + cost, 0);
    const monthlySalary = currentSalary / 12;
    const remainingMoney = monthlySalary - totalMonthlyCost;

    const remainingColor = remainingMoney > 0 ? '#2ecc71' : '#e74c3c';

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          {/* This button returns to the career cloud by changing local state */}
          <TouchableOpacity onPress={() => setCurrentView('cloud')} style={styles.homeButton}>
            <Text style={styles.homeButtonText}>← Map</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{selectedCareer.name}</Text>
          {/* This button goes all the way back to the main navigation stack */}
          <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.homeButtonText}>🏠 Hub</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.detailScrollView}>
          <View style={styles.detailCard}>
            <Text style={styles.cardTitle}>📜 Quest Details</Text>
            <Text style={styles.detailDescription}>{selectedCareer.description}</Text>
          </View>

          {/* Location Buttons */}
          <Text style={styles.sectionHeading}>Choose Your Kingdom:</Text>
          <View style={styles.locationButtonsContainer}>
            {locationTypes.map((locType) => (
              <TouchableOpacity
                key={locType}
                style={[
                  styles.locationButton,
                  selectedCostLocation === locType && styles.locationButtonSelected,
                ]}
                onPress={() => handleLocationSelect(locType)}
              >
                <Text
                  style={[
                    styles.locationButtonText,
                    selectedCostLocation === locType && styles.locationButtonTextSelected,
                  ]}
                >
                  {locType}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* New visual comparison - Thematic Bar Chart */}
          <View style={styles.visualCard}>
            <Text style={styles.cardTitle}>📊 Hero's Gold Ledger</Text>
            <View style={styles.barChartContainer}>
              <View style={[
                styles.salaryBar,
                { height: `${(Math.min(monthlySalary, monthlySalary + totalMonthlyCost) / (monthlySalary + totalMonthlyCost || 1)) * 100}%` }
              ]}>
                <Text style={styles.barLabelText}>Salary</Text>
              </View>
              <View style={[
                styles.costBar,
                { height: `${(Math.min(totalMonthlyCost, monthlySalary + totalMonthlyCost) / (monthlySalary + totalMonthlyCost || 1)) * 100}%` }
              ]}>
                <Text style={styles.barLabelText}>Costs</Text>
              </View>
            </View>
            <View style={styles.visualStats}>
              <Text style={styles.visualStatText}>💰 Monthly Income: {formatCurrency(monthlySalary)}</Text>
              <Text style={styles.visualStatText}>💸 Total Costs: {formatCurrency(totalMonthlyCost)}</Text>
              <Text style={[styles.visualStatText, { color: remainingColor, fontWeight: 'bold' }]}>
                ✨ Remaining Gold: {formatCurrency(remainingMoney)}
              </Text>
            </View>
          </View>

          <View style={styles.costBreakdownCard}>
            <Text style={styles.cardTitle}>📜 Living Expenses (Monthly)</Text>
            <View style={styles.costItemRow}>
              <Text style={styles.costItemLabel}>🏡 Housing:</Text>
              <Text style={styles.costItemValue}>{formatCurrency(currentCosts.housing)}</Text>
            </View>
            <View style={styles.costItemRow}>
              <Text style={styles.costItemLabel}>🍽️ Food:</Text>
              <Text style={styles.costItemValue}>{formatCurrency(currentCosts.food)}</Text>
            </View>
            <View style={styles.costItemRow}>
              <Text style={styles.costItemLabel}>🚗 Transport:</Text>
              <Text style={styles.costItemValue}>{formatCurrency(currentCosts.transportation)}</Text>
            </View>
            <View style={styles.costItemRow}>
              <Text style={styles.costItemLabel}>💡 Utilities:</Text>
              <Text style={styles.costItemValue}>{formatCurrency(currentCosts.utility)}</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  return (
    <View style={styles.container}>
      {currentView === 'cloud' ? renderCareerCloud() : renderCareerDetail()}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1c1c3c',
  },
  container: {
    flex: 1,
    width: '100%',
  },
  // --- Header Styles ---
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#FFD700',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  homeButton: {
    padding: 10,
  },
  homeButtonText: {
    fontSize: 16,
    color: '#e0e0e0',
    fontWeight: 'bold',
  },

  // --- Career Cloud Styles ---
  cloudContainer: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  cloudSubtitle: {
    fontSize: 18,
    color: '#FFD700',
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  careerCirclesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  careerCard: {
    width: (width / 2) - 30,
    height: (width / 2) - 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  careerEmoji: {
    fontSize: 48,
    marginBottom: 10,
  },
  careerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },

  // --- Career Detail Styles ---
  detailScrollView: {
    flexGrow: 1,
    padding: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  detailDescription: {
    fontSize: 16,
    color: '#e0e0e0',
    lineHeight: 22,
    textAlign: 'center',
  },
  detailCard: {
    backgroundColor: '#2c3e50',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#556677',
    alignItems: 'center',
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  // Location Buttons
  locationButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  locationButton: {
    backgroundColor: '#34495e',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    margin: 5,
    borderWidth: 1,
    borderColor: '#556677',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  locationButtonSelected: {
    backgroundColor: '#8e44ad',
    borderColor: '#FFD700',
  },
  locationButtonText: {
    fontSize: 14,
    color: '#fff',
  },
  locationButtonTextSelected: {
    fontWeight: 'bold',
  },
  // Visual Card
  visualCard: {
    backgroundColor: '#2c3e50',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#556677',
  },
  barChartContainer: {
    flexDirection: 'row',
    height: 150,
    width: '80%',
    marginBottom: 15,
    backgroundColor: '#34495e',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#556677',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  salaryBar: {
    width: '50%',
    backgroundColor: '#2ecc71',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 5,
  },
  costBar: {
    width: '50%',
    backgroundColor: '#e74c3c',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 5,
  },
  barLabelText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom: 5,
  },
  visualStats: {
    alignItems: 'center',
    width: '100%',
  },
  visualStatText: {
    fontSize: 16,
    color: '#e0e0e0',
    marginTop: 5,
  },
  // Cost Breakdown Card
  costBreakdownCard: {
    backgroundColor: '#2c3e50',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#556677',
  },
  costItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#34495e',
    paddingBottom: 5,
  },
  costItemLabel: {
    fontSize: 16,
    color: '#e0e0e0',
    fontWeight: '600',
  },
  costItemValue: {
    fontSize: 16,
    color: '#fff',
  },
});