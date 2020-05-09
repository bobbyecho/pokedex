import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import metrics from '@themes/metrics';
import { capitalize } from '@helpers/transforms';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: metrics.distance.xl,
  },
  pokeLineContainer: {
    paddingVertical: metrics.distance.m,
  },
  pokeLine: {
    height: 7,
    marginTop: 4,
  },
  lineTitle: {
    fontWeight: '700',
    fontSize: 13,
  },
});

function Line({ name, value, color }) {
  console.log(name, value);
  return (
    <View style={styles.pokeLineContainer}>
      <Text style={styles.lineTitle}>{capitalize(name)}</Text>
      <View
        style={[
          styles.pokeLine,
          {
            width: (metrics.screen.fullWidth * value) / 265,
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
}

export default function ({ stats, color }) {
  return (
    <View style={styles.container}>
      {stats.map((v) => {
        const {
          stat: { name },
          base_stat: baseStat,
        } = v;

        return <Line key={name} name={name} value={baseStat} color={color} />;
      })}
    </View>
  );
}
