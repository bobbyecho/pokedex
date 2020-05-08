import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  textValue: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});
export default function DetailAttrPoke({ attribute, value, color }) {
  return (
    <View>
      <Text style={{ color }}>{attribute}</Text>
      <Text style={styles.textValue}>{value}</Text>
    </View>
  );
}
