// PathPeekScreen.js
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

// Enhanced Dummy data for careers with location-specific costs AND salaries
const careerCategories = [
  {
    id: 'tech',
    name: 'Tech',
    description: 'Innovate and build the future with coding, software development, and IT roles.',
    locationSalaries: {
      'Major City': '~$95,000/year',
      'Mid-sized City': '~$80,000/year',
      'Suburban Area': '~$70,000/year',
      'Rural Area': '~$60,000/year',
    },
    locationCosts: {
      'Major City': { housing: '$1500', food: '$400', transportation: '$150', utility: '$150' },
      'Mid-sized City': { housing: '$1200', food: '$350', transportation: '$120', utility: '$120' },
      'Suburban Area': { housing: '$1000', food: '$300', transportation: '$100', utility: '$100' },
      'Rural Area': { housing: '$800', food: '$250', transportation: '$80', utility: '$80' },
    }
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Care for others as a nurse, doctor, therapist, or medical researcher.',
    locationSalaries: {
      'Major City': '~$85,000/year',
      'Mid-sized City': '~$70,000/year',
      'Suburban Area': '~$60,000/year',
      'Rural Area': '~$50,000/year',
    },
    locationCosts: {
      'Major City': { housing: '$1200', food: '$350', transportation: '$120', utility: '$120' },
      'Mid-sized City': { housing: '$1000', food: '$300', transportation: '$100', utility: '$100' },
      'Suburban Area': { housing: '$850', food: '$280', transportation: '$90', utility: '$90' },
      'Rural Area': { housing: '$700', food: '$220', transportation: '$70', utility: '$70' },
    }
  },
  {
    id: 'arts',
    name: 'Arts & Design',
    description: 'Express creativity through visual arts, music, writing, or graphic design.',
    locationSalaries: {
      'Major City': '~$60,000/year',
      'Mid-sized City': '~$50,000/year',
      'Suburban Area': '~$45,000/year',
      'Rural Area': '~$40,000/year',
    },
    locationCosts: {
      'Major City': { housing: '$1000', food: '$300', transportation: '$100', utility: '$100' },
      'Mid-sized City': { housing: '$800', food: '$250', transportation: '$80', utility: '$80' },
      'Suburban Area': { housing: '$700', food: '$220', transportation: '$70', utility: '$70' },
      'Rural Area': { housing: '$600', food: '$180', transportation: '$60', utility: '$60' },
    }
  },
  {
    id: 'finance',
    name: 'Finance',
    description: 'Manage money, investments, and financial planning for individuals or companies.',
    locationSalaries: {
      'Major City': '~$90,000/year',
      'Mid-sized City': '~$75,000/year',
      'Suburban Area': '~$65,000/year',
      'Rural Area': '~$55,000/year',
    },
    locationCosts: {
      'Major City': { housing: '$1800', food: '$450', transportation: '$180', utility: '$180' },
      'Mid-sized City': { housing: '$1500', food: '$400', transportation: '$150', utility: '$150' },
      'Suburban Area': { housing: '$1300', food: '$350', transportation: '$130', utility: '$130' },
      'Rural Area': { housing: '$1100', food: '$300', transportation: '$110', utility: '$110' },
    }
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Shape young minds as a teacher, professor, or educational administrator.',
    locationSalaries: {
      'Major City': '~$70,000/year',
      'Mid-sized City': '~$60,000/year',
      'Suburban Area': '~$50,000/year',
      'Rural Area': '~$45,000/year',
    },
    locationCosts: {
      'Major City': { housing: '$1100', food: '$320', transportation: '$110', utility: '$110' },
      'Mid-sized City': { housing: '$950', food: '$280', transportation: '$95', utility: '$95' },
      'Suburban Area': { housing: '$800', food: '$250', transportation: '$80', utility: '$80' },
      'Rural Area': { housing: '$700', food: '$200', transportation: '$70', utility: '$70' },
    }
  },
  {
    id: 'trades',
    name: 'Skilled Trades',
    description: 'Work with your hands in fields like plumbing, electrical, carpentry, or mechanics.',
    locationSalaries: {
      'Major City': '~$65,000/year',
      'Mid-sized City': '~$55,000/year',
      'Suburban Area': '~$48,000/year',
      'Rural Area': '~$40,000/year',
    },
    locationCosts: {
      'Major City': { housing: '$900', food: '$280', transportation: '$90', utility: '$90' },
      'Mid-sized City': { housing: '$750', food: '$230', transportation: '$75', utility: '$75' },
      'Suburban Area': { housing: '$650', food: '$200', transportation: '$65', utility: '$65' },
      'Rural Area': { housing: '$550', food: '$180', transportation: '$55', utility: '$55' },
    }
  },
];

export default function PathPeekScreen() {
  const [currentView, setCurrentView] = useState('cloud');
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [selectedCostLocation, setSelectedCostLocation] = useState('Major City'); // Default location
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false); // State for dropdown visibility

  // Available location types for the dropdown
  const locationTypes = ['Major City', 'Mid-sized City', 'Suburban Area', 'Rural Area'];

  const handleCareerPress = (career) => {
    setSelectedCareer(career);
    setSelectedCostLocation('Major City'); // Reset to default location when a new career is selected
    setCurrentView('detail');
  };

  const handleLocationSelect = (locType) => {
    setSelectedCostLocation(locType);
    setIsLocationDropdownOpen(false); // Close dropdown after selection
  };

  const renderCareerCloud = () => (
    <View style={styles.contentWrapper}>
      {/* Header for Career Cloud View */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Path Peek</Text>
        <View style={styles.headerIconPlaceholder}>
          <Text style={styles.headerIconText}>?</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.cloudContainer}>
        <Text style={styles.cloudSubtitle}>Explore different career paths and their real-world costs.</Text>
        <View style={styles.careerCirclesContainer}>
          {careerCategories.map((career) => (
            <TouchableOpacity
              key={career.id}
              style={styles.careerCircle}
              onPress={() => handleCareerPress(career)}
            >
              <Text style={styles.careerCircleText}>{career.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {/* Home icon at the bottom */}
      <View style={styles.homeIconPlaceholder}>
        <Text style={{ fontSize: 24 }}>🏠</Text>
      </View>
    </View>
  );

  const renderCareerDetail = () => {
    if (!selectedCareer) return null;

    const currentCosts = selectedCareer.locationCosts[selectedCostLocation] || {};
    const currentSalary = selectedCareer.locationSalaries[selectedCostLocation] || 'N/A';

    return (
      <View style={styles.contentWrapper}>
        {/* Header for Career Detail View */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setCurrentView('cloud')} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Career</Text>
          <View style={styles.headerIconPlaceholder}>
            <Text style={styles.headerIconText}>?</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.detailScrollView}>
          {/* Displaying dynamic salary */}
          <Text style={styles.detailText}>Estimated Salary: {currentSalary}</Text>

          {/* Location Dropdown */}
          <Text style={styles.sectionHeading}>Location Type:</Text>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
          >
            <Text style={styles.dropdownButtonText}>{selectedCostLocation} ▼</Text>
          </TouchableOpacity>

          {isLocationDropdownOpen && (
            <View style={styles.dropdownOptionsContainer}>
              {locationTypes.map((locType) => (
                <TouchableOpacity
                  key={locType}
                  style={styles.dropdownOption}
                  onPress={() => handleLocationSelect(locType)}
                >
                  <Text style={styles.dropdownOptionText}>{locType}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <Text style={styles.sectionHeading}>Cost of Living (Monthly):</Text>
          <View style={styles.costBreakdown}>
            <Text style={styles.costItem}>Housing: {currentCosts.housing || 'N/A'}</Text>
            <Text style={styles.costItem}>Food: {currentCosts.food || 'N/A'}</Text>
            <Text style={styles.costItem}>Trans: {currentCosts.transportation || 'N/A'}</Text>
            <Text style={styles.costItem}>Utility: {currentCosts.utility || 'N/A'}</Text>
          </View>

          {/* Placeholder for the large circle / visual */}
          <View style={styles.largeCirclePlaceholder}>
            <Text style={styles.largeCircleText}>Career Visual</Text>
          </View>
        </ScrollView>
        {/* Home icon at the bottom */}
        <View style={styles.homeIconPlaceholder}>
          <Text style={{ fontSize: 24 }}>🏠</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {currentView === 'cloud' ? renderCareerCloud() : renderCareerDetail()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f8f8f8',
    paddingTop: 0, // <-- MODIFIED: Removed paddingTop
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
  },
  // Header Styles (Common for all Path Peek views)
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
    width: 30,
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
  backButton: {
    paddingRight: 15,
  },
  backButtonText: {
    fontSize: 24,
    color: '#3498db',
    fontWeight: 'bold',
  },

  // Career Cloud Styles
  cloudContainer: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  cloudSubtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 30,
    textAlign: 'center',
  },
  careerCirclesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  careerCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  careerCircleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
  },
  homeIconPlaceholder: {
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 'auto',
  },

  // Career Detail Styles
  detailScrollView: {
    flexGrow: 1,
    padding: 20,
  },
  detailText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  // Dropdown Styles
  dropdownButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    width: '100%',
    alignSelf: 'flex-start',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  dropdownOptionsContainer: {
    position: 'absolute',
    top: 280, // Adjust this value to position the dropdown correctly below the button
    left: 20,
    right: 20,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    zIndex: 10, // Ensure it appears above other content
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  dropdownOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownOptionText: {
    fontSize: 16,
    color: '#333',
  },
  costBreakdown: {
    width: '100%',
    paddingLeft: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  costItem: {
    fontSize: 15,
    color: '#555',
    marginBottom: 5,
  },
  largeCirclePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#d0d0d0',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#bbb',
  },
  largeCircleText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
  },
});
