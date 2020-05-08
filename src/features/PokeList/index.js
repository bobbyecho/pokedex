import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { useMountEffect } from '@helpers/hooks';
import PokeCard from '@components/PokeList/PokeCard';
import Container from '@components/Container';
import PokeListFooter from '@components/PokeList/PokeListFooter';
import PokeFilter from '@components/PokeList/PokeFilter';
import metrics from '@themes/metrics';

const styles = StyleSheet.create({
  pokeList: {
    padding: metrics.distance.m,
  },
  pokeListContent: {
    paddingBottom: 70,
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
      <PokeFilter />
      <FlatList
        keyExtractor={(item) => item.id}
        onRefresh={refreshPoke}
        refreshing={refreshing}
        style={styles.pokeList}
        data={payload}
        renderItem={({ item }) => <PokeCard key={item.id} data={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.pokeListContent}
        onEndReachedThreshold={0.2}
        onEndReached={fetchMorePoke}
        ListFooterComponent={<PokeListFooter show={true} />}
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
