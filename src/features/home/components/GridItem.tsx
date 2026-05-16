import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width / 3;

interface GridItemProps {
  title: string;
  icon: React.ReactNode;
  onPress?: () => void;
  textColor?: string;
}

export default function GridItem({ title, icon, onPress, textColor = '#333' }: GridItemProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      {icon}
      <Text style={[styles.title, { color: textColor }]}>{title.toUpperCase()}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  title: {
    marginTop: 12,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
