import React, { useEffect } from 'react';
import { FlatList, View, StyleSheet, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { useMountEffect } from '@helpers/hooks';
import PokeCard from '@components/PokeList/PokeCard';
import PokeLoading from '@components/PokeList/PokeLoading';
import metrics from '@themes/metrics';

function wait(func) {
  return new Promise(func);
}

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
  }, [payload]);

  function initPokemon() {
    pokemonActions.requestPokemons(10);
  }

  async function refreshPoke() {
    await setRefreshing(true);
    initPokemon();
  }

  return fetching ? (
    <PokeLoading />
  ) : (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id}
        onRefresh={refreshPoke}
        refreshing={refreshing}
        style={styles.pokeList}
        data={payload}
        renderItem={({ item }) => <PokeCard data={item} />}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.pokeListContent}
        onEndReachedThreshold={0.5}
        onEndReached={() => console.log('hai')}
      />
    </View>
  );
}

const mapStateToProps = (state) => ({
  pokemons: state.pokemons,
});

const mapDispatchToProps = (dispatch) => ({
  pokemonActions: dispatch.pokemons,
});

export default connect(mapStateToProps, mapDispatchToProps)(PokeList);
