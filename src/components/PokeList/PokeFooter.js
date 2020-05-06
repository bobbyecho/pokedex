import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import colors from '@themes/colors';
import metrics from '@themes/metrics';

const styles = StyleSheet.create({
  pokeFooter: {
    paddingVertical: metrics.distance.m,
  },
});
export default ({ show }) => {
  return show ? (
    <ActivityIndicator color={colors.black} style={styles.pokeFooter} />
  ) : null;
};
