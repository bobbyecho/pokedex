import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { capitalize } from '@helpers/transforms';
import pokeTypes from '@helpers/pokeTypes';
import PokeElementalIcon from './PokeElementalIcon';
import Icon from 'react-native-vector-icons/AntDesign';
import metrics from '@themes/metrics';
import colors from '@themes/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: metrics.distance.l,
    paddingHorizontal: metrics.distance.m,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centerView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -50,
  },
  leftView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textName: {
    marginHorizontal: metrics.distance.s,
    fontSize: 15,
  },
  pokeLogo: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: metrics.distance.s,
  },
  pokeLogoText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});
export default (onFilter) => {
  const [type, setType] = React.useState('All Pokemon');

  return (
    <View style={styles.container}>
      <View style={styles.leftView}>
        <Image
          source={require('@assets/images/poke-elements/logo.png')}
          style={styles.pokeLogo}
        />
        <Text style={styles.pokeLogoText}>Pokedex</Text>
      </View>
      <View style={styles.centerView}>
        {type !== '' ? <PokeElementalIcon name={type} /> : null}
        <Text style={[styles.textName, { color: colors[type] }]}>
          {capitalize(type)}
        </Text>
      </View>
      <Icon size={22} name="caretdown" />
    </View>
  );
};
