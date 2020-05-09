import React from 'react';

import Lottie from 'lottie-react-native';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f8ff',
  },
  subContainer: {
    width: 200,
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default ({ loadingStyle = {} }) => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Lottie
          source={require('@assets/lottie/pokeloading.json')}
          autoPlay={true}
          style={loadingStyle}
        />
      </View>
    </View>
  );
};
