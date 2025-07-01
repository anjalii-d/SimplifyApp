// RealityFeedScreen.js
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function RealityFeedScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reality Feed</Text>
      <Text style={styles.subtitle}>Daily stories about money in the real world.</Text>
      {/* Stories will be displayed here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1', // Light gray background
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  subttle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
});
