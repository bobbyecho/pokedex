import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { useMountEffect } from '@helpers/hooks';
import PokeCard from '@components/PokeList/PokeCard';
import Container from '@components/Container';
import PokeFooter from '@components/PokeList/PokeFooter';
import metrics from '@themes/metrics';

const styles = StyleSheet.create({
  pokeList: {
    padding: metrics.distance.m,
  },
  pokeListContent: {
    alignItems: 'center',
    paddingBottom: metrics.distance.xl,
  },
});

function PokeList(props) {
  const {
    pokemonActions,
    pokemons: { payload, fetching },
  } = props;

  const [offset, setOffset] = React.useState(10);
  const [refreshing, setRefreshing] = React.useState(false);

  useMountEffect(() => {
    initPokemon();
  });

  React.useEffect(() => {
    setRefreshing(false);
    console.log(payload.length);
  }, [payload]);

  function initPokemon() {
    pokemonActions.requestPokemons(10);
  }

  async function refreshPoke() {
    await setRefreshing(true);
    initPokemon();
  }

  async function fetchMorePoke() {
    const nextOffset = offset + 10;
    await setOffset(nextOffset);
    pokemonActions.requestMorePokemons(nextOffset);
  }

  return (
    <Container style={styles.container} loading={fetching && !payload.length}>
      <FlatList
        keyExtractor={(item) => item.id}
        onRefresh={refreshPoke}
        refreshing={refreshing}
        style={styles.pokeList}
        data={payload}
        renderItem={({ item }) => <PokeCard key={item.id} data={item} />}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.pokeListContent}
        onEndReachedThreshold={0.2}
        onEndReached={fetchMorePoke}
        ListFooterComponent={<PokeFooter show={fetching} />}
      />
    </Container>
  );
}

const mapStateToProps = (state) => ({
  pokemons: state.pokemons,
});

const mapDispatchToProps = (dispatch) => ({
  pokemonActions: dispatch.pokemons,
});

export default connect(mapStateToProps, mapDispatchToProps)(PokeList);
