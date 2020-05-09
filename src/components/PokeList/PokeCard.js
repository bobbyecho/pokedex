import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Image, StyleSheet } from 'react-native';
import { Caption, Text, TouchableRipple } from 'react-native-paper';
import { pokeImgUrl, capitalize } from '@helpers/transforms';
import metrics from '@themes/metrics';
import colors from '@themes/colors';
import PokeElementalIcon from '@components/PokeList/PokeElementalIcon';

const styles = StyleSheet.create({
  pokeCard: {
    alignItems: 'center',
    flexDirection: 'row',
    margin: metrics.distance.xs,
    backgroundColor: colors.white,
    borderRadius: metrics.radius.commonRadius,
  },
  pokeImage: {
    flex: 1,
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  imageContainer: {
    padding: metrics.distance.s,
    width: '40%',
    height: '100%',
  },
  pokeCardContent: {
    flex: 1,
    alignContent: 'center',
    paddingLeft: metrics.distance.xl,
    width: '60%',
  },
  pokeName: {
    fontWeight: 'bold',
    fontSize: 32,
  },
  pokeType: {
    fontSize: 15,
    marginLeft: metrics.distance.s,
  },
  pokeElement: {
    flexDirection: 'row',
    paddingVertical: metrics.distance.s,
  },
});

export default ({ data }) => {
  const navigation = useNavigation();
  const { name, types } = data;
  const pokeType = types[0].type.name;

  function goToDetail() {
    navigation.navigate('PokeDetail', { pokeData: data });
  }

  return (
    <TouchableRipple onPress={goToDetail}>
      <View style={styles.pokeCard}>
        <View style={styles.pokeCardContent}>
          <Text style={[styles.pokeName, { color: colors[pokeType] }]}>
            {capitalize(name)}
          </Text>
          <View style={styles.pokeElement}>
            <PokeElementalIcon name={pokeType} />
            <Caption style={styles.pokeType}>{pokeType}</Caption>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: pokeImgUrl(name) }}
            style={styles.pokeImage}
            onL
          />
        </View>
      </View>
    </TouchableRipple>
  );
};
