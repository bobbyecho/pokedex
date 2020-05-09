import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { useMountEffect } from '@helpers/hooks';
import PokeCard from '@components/PokeList/PokeCard';
import Container from '@components/Container';
import PokeListFooter from '@components/PokeList/PokeListFooter';
import PokeFilter from '@components/PokeList/PokeFilter';
import metrics from '@themes/metrics';
import PokeLoading from '@components/PokeLoading';

const styles = StyleSheet.create({
  pokeList: {
    padding: metrics.distance.m,
  },
  pokeListContent: {
    paddingBottom: 70,
  },
  filterLoading: {
    marginTop: -(metrics.screen.fullHeight * 10) / 100,
  },
});

function PokeList(props) {
  const {
    pokemonActions,
    pokemons: { payload, fetching, fetchingFilter },
  } = props;

  const [offset, setOffset] = React.useState(10);
  const [refreshing, setRefreshing] = React.useState(false);

  useMountEffect(() => {
    initPokemon();
  });

  React.useEffect(() => {
    setRefreshing(false);
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

  async function doPokeFilter(key) {
    if (key === 'All Pokemon') {
      initPokemon();
    } else {
      pokemonActions.requestPokemonTypes(key);
    }
  }

  return (
    <Container loading={fetching && !payload.length}>
      <PokeFilter onFilter={doPokeFilter} />
      {!fetchingFilter ? (
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          onRefresh={refreshPoke}
          refreshing={refreshing}
          style={styles.pokeList}
          data={payload}
          renderItem={({ item }) => (
            <PokeCard key={item.id.toString()} data={item} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.pokeListContent}
          onEndReachedThreshold={0.2}
          onEndReached={fetchMorePoke}
          ListFooterComponent={<PokeListFooter show={true} />}
        />
      ) : (
        <PokeLoading loadingStyle={styles.filterLoading} />
      )}
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
