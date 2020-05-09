import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import metrics from '@themes/metrics';

const styles = StyleSheet.create({
  container: {
    paddingVertical: metrics.distance.l,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  pokeFooter: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
    marginHorizontal: metrics.distance.m,
  },
});

export default ({ show }) => {
  return show ? (
    <View style={styles.container}>
      <Image
        source={require('@assets/images/poke-elements/logo.png')}
        style={styles.pokeFooter}
      />
      <Text>Loading...</Text>
    </View>
  ) : null;
};
