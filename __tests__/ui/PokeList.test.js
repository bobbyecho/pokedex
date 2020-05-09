import React from 'react';
import { FlatList } from 'react-native';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import PokeList from '@features/PokeList';
import mockListPokemon from '../../__mocks__/payload/listPokemon';
import renderer from 'react-test-renderer';

const mockStore = configureStore();

describe('Pokemon List', () => {
  let store;
  let container;

  store = mockStore({
    pokemons: {
      payload: mockListPokemon,
    },
  });

  container = renderer.create(
    <Provider store={store}>
      <PokeList />
    </Provider>,
  );

  const instance = container.root;

  it('should render successfully', () => {
    expect(container.toJSON()).toMatchSnapshot();
  });

  it('should render 1 item based on payload', () => {
    const flatListInstance = instance.findByType(FlatList);
    expect(flatListInstance.props.data).toHaveLength(1);
  });
});
