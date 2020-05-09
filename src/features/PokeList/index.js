import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
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
  const [refreshingMore, setRefreshingMore] = React.useState(false);
  const [filterBy, setFilterBy] = React.useState('All Pokemon');

  useMountEffect(() => {
    initPokemon();
  });

  React.useEffect(() => {
    setRefreshing(false);
    setRefreshingMore(false);
  }, [payload]);

  function initPokemon() {
    if (filterBy !== 'All Pokemon') {
      pokemonActions.requestPokemonTypes(filterBy);
    } else {
      pokemonActions.requestPokemons(20);
    }
  }

  async function refreshPoke() {
    await setRefreshing(true);
    initPokemon();
  }

  async function fetchMorePoke() {
    const nextOffset = offset + 20;
    await setOffset(nextOffset);
    await setRefreshingMore(true);
    pokemonActions.requestMorePokemons(nextOffset);
  }

  async function doPokeFilter(key) {
    await setFilterBy(key);

    if (key === 'All Pokemon') {
      pokemonActions.requestPokemons(20);
    } else {
      pokemonActions.requestPokemonTypes(key);
    }
  }

  return (
    <Container loading={fetching && !payload.length}>
      <PokeFilter onFilter={doPokeFilter} />
      {!fetchingFilter ? (
        <FlatList
          keyExtractor={(item) => item.name}
          onRefresh={refreshPoke}
          refreshing={refreshing}
          style={styles.pokeList}
          data={payload}
          renderItem={({ item }) => <PokeCard key={item.name} data={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.pokeListContent}
          onEndReachedThreshold={0.7}
          onEndReached={fetchMorePoke}
          ListFooterComponent={<PokeListFooter show={refreshingMore} />}
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
