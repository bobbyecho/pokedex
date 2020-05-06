import React from 'react';
import { StyleSheet, Image, View, ScrollView } from 'react-native';
import { Title, Headline, Text, Chip } from 'react-native-paper';
import { connect } from 'react-redux';
import { useMountEffect } from '@helpers/hooks';
import Container from '@components/Container';
import metrics from '@themes/metrics';
import { pokeImgUrl } from '@helpers/transforms';
import colors from '@themes/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    height: metrics.screen.fullHeight,
    width: metrics.screen.fullWidth,
    alignItems: 'center',
  },
  pokeListContent: {
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  pokeImage: {
    marginTop: 20,
    width: '40%',
    height: '30%',
    resizeMode: 'contain',
  },
  pokeContainerDescription: {
    paddingHorizontal: metrics.distance.xl,
  },
  pokeRowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 20,
  },
  pokeTypeChip: {
    margin: metrics.distance.s,
    backgroundColor: '#e6e6fa',
  },
  pokeAbilityChip: {
    margin: metrics.distance.s,
    backgroundColor: '#ffe4e1',
  },
  pokeDetailStat: {
    flex: 1,
    width: (metrics.screen.fullWidth * 40) / 100,
    paddingRight: metrics.distance.m,
  },
  pokeSubTitle: {
    color: colors.info,
  },
  pokeDivider: {
    width: metrics.screen.fullWidth - 40,
    marginTop: metrics.distance.m,
    paddingLeft: metrics.distance.m,
    backgroundColor: colors.black,
  },
  pokeTextDivider: {
    color: colors.white,
  },
});

function PokeDetail(props) {
  const {
    detailPokemonActions,
    detailPokemon: { payload, fetching },
    route: {
      params: { pokeId },
    },
  } = props;

  useMountEffect(() => {
    initDetailPokemon();
  });

  function initDetailPokemon() {
    detailPokemonActions.requestPokemon(pokeId);
  }

  return (
    <Container style={styles.container} loading={fetching}>
      <Image
        source={{ uri: pokeImgUrl(payload?.name) }}
        style={styles.pokeImage}
      />
      <Headline style={styles.pokeTitle}>{payload?.name}</Headline>
      <View style={styles.pokeContainerDescription}>
        <View style={styles.pokeDivider}>
          <Title style={styles.pokeTextDivider}>Abilities</Title>
        </View>
        <View style={styles.pokeRowWrap}>
          {payload?.abilities.map((res) => {
            return (
              <Chip key={res?.ability?.name} style={styles.pokeAbilityChip}>
                {res?.ability?.name.toUpperCase()}
              </Chip>
            );
          })}
        </View>
      </View>
      <View style={styles.pokeContainerDescription}>
        <View style={styles.pokeDivider}>
          <Title style={styles.pokeTextDivider}>Types</Title>
        </View>
        <View style={styles.pokeRowWrap}>
          {payload?.types.map((res) => {
            return (
              <Chip key={res?.type?.name} style={styles.pokeTypeChip}>
                {res?.type?.name.toUpperCase()}
              </Chip>
            );
          })}
        </View>
      </View>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  detailPokemon: state.detailPokemon,
});

const mapDispatchToProps = (dispatch) => ({
  detailPokemonActions: dispatch.detailPokemon,
});

export default connect(mapStateToProps, mapDispatchToProps)(PokeDetail);
