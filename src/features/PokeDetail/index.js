import React from 'react';
import { StyleSheet, View } from 'react-native';
import Container from '@components/Container';
import metrics from '@themes/metrics';
import colors from '@themes/colors';
import PokeCard from '@components/PokeList/PokeCard';
import PokeAttribute from '@components/PokeDetail/PokeAttribute';
import PokeStats from '@components/PokeDetail/PokeStats';
import { capitalize } from '@helpers/transforms';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    height: metrics.screen.fullHeight,
    width: metrics.screen.fullWidth,
    justifyContent: 'center',
  },
  pokeDetailContainer: {
    borderRadius: metrics.radius.commonRadius,
    backgroundColor: colors.white,
    margin: metrics.distance.xxl,
    paddingVertical: metrics.distance.m,
  },
  pokeAttributes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: metrics.distance.m,
  },
});

function PokeDetail(props) {
  const {
    route: {
      params: { pokeData },
    },
  } = props;

  const pokeType = pokeData.types[0].type.name;
  const pokeHeight = pokeData.height;
  const pokeWeight = pokeData.weight;
  const pokeAbility = pokeData.abilities[0].ability.name;
  const themeColor = colors[pokeType];
  const pokeStats = pokeData.stats;

  return (
    <Container style={[styles.container, { backgroundColor: themeColor }]}>
      <View style={styles.pokeDetailContainer}>
        <PokeCard data={pokeData} />
        <View style={styles.pokeAttributes}>
          <PokeAttribute
            attribute="Height"
            value={`${pokeHeight}"`}
            color={themeColor}
          />
          <PokeAttribute
            attribute="Weight"
            value={`${pokeWeight}lbs`}
            color={themeColor}
          />
          <PokeAttribute
            attribute="Ability"
            value={capitalize(pokeAbility)}
            color={themeColor}
          />
        </View>
        <PokeStats stats={pokeStats} color={themeColor} />
      </View>
    </Container>
  );
}

export default PokeDetail;
