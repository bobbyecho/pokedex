import React from 'react';
import { Text } from 'react-native';
import PokeDetail from '@features/PokeDetail';
import mockListPokemon from '../../__mocks__/payload/listPokemon';
import renderer from 'react-test-renderer';
import PokeCard from '@components/PokeList/PokeCard';

describe('Pokemon Detail', () => {
  let container;
  let navParam = {
    route: {
      params: {
        pokeData: mockListPokemon[0],
      },
    },
  };

  container = renderer.create(<PokeDetail {...navParam} />);
  const instance = container.root;

  it('should render successfully', () => {
    expect(container.toJSON()).toMatchSnapshot();
  });

  it('should have pokemon name "ditto"', () => {
    const PokeCardInstance = instance.findByType(PokeCard);
    const TextInstance = PokeCardInstance.findAllByType(Text);
    expect(TextInstance[0].props.children).toBe('Ditto');
  });
});
