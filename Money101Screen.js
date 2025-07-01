// Money101Screen.js
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Money101Screen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Money 101</Text>
      <Text style={styles.subtitle}>Your foundation for financial knowledge.</Text>
      {/* Lessons will be displayed here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8f6f3', // Another light background color
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
});
