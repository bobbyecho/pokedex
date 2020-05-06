import React from 'react';
import { StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import { connect } from 'react-redux';
import { useMountEffect } from '@helpers/hooks';
import Container from '@components/Container';
import metrics from '@themes/metrics';

const styles = StyleSheet.create({
  pokeListContent: {
    alignItems: 'center',
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
    <Container style={styles.container} loading={fetching && !payload}>
      <Title>{payload?.name}</Title>
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
