import React from 'react';
import { Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  pokeIcon: {
    width: 24,
    height: 24,
  },
});

export default ({ name }) => {
  function getIcon() {
    switch (name) {
      case 'normal':
        return require('@assets/images/poke-elements/normal.png');
      case 'fire':
        return require('@assets/images/poke-elements/fire.png');
      case 'water':
        return require('@assets/images/poke-elements/water.png');
      case 'electric':
        return require('@assets/images/poke-elements/electric.png');
      case 'grass':
        return require('@assets/images/poke-elements/grass.png');
      case 'ice':
        return require('@assets/images/poke-elements/ice.png');
      case 'ground':
        return require('@assets/images/poke-elements/ground.png');
      case 'flying':
        return require('@assets/images/poke-elements/flying.png');
      case 'ghost':
        return require('@assets/images/poke-elements/ghost.png');
      case 'rock':
        return require('@assets/images/poke-elements/rock.png');
      case 'fighting':
        return require('@assets/images/poke-elements/fighting.png');
      case 'bug':
        return require('@assets/images/poke-elements/bug.png');
      case 'poison':
        return require('@assets/images/poke-elements/poison.png');
      case 'psychic':
        return require('@assets/images/poke-elements/psychic.png');
      case 'dark':
        return require('@assets/images/poke-elements/dark.png');
      case 'steel':
        return require('@assets/images/poke-elements/steel.png');
      case 'dragon':
        return require('@assets/images/poke-elements/dragon.png');
      case 'fairy':
        return require('@assets/images/poke-elements/fairy.png');
      default:
        return null;
    }
  }

  return <Image source={getIcon()} style={styles.pokeIcon} />;
};
