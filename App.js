//App.js
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import HomeScreen from './HomeScreen';

export default function App() {
  return (
     <View style={styles.container}>
      <HomeScreen />
     </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

