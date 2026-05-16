import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';

interface SosButtonProps {
  onPress: () => void;
}

export default function SosButton({ onPress }: SosButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.text}>SOS</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#D32F2F',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowColor: '#D32F2F',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: 2,
  },
});
