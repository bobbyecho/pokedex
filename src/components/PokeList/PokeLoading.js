import React from 'react';
import Lottie from 'lottie-react-native';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  pokeLoading: {
    backgroundColor: '#f0f8ff',
  },
});

export default () => {
  return (
    <Lottie
      source={require('@assets/lottie/pokeloading.json')}
      autoPlay={true}
      style={styles.pokeLoading}
    />
  );
};
