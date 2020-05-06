import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Image, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { pokeImgUrl } from '@helpers/transforms';
import metrics from '@themes/metrics';
import colors from '@themes/colors';

const styles = StyleSheet.create({
  pokeCard: {
    borderRadius: 0,
    margin: metrics.distance.xs,
  },
  pokeImage: {
    justifyContent: 'center',
    width: 150,
    height: 100,
    resizeMode: 'contain',
  },
  imageContainer: {
    paddingHorizontal: metrics.distance.s,
    width: '100%',
    height: 150,
    justifyContent: 'center',
  },
  pokeCardContent: {
    position: 'relative',
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    padding: metrics.distance.s,
  },
  pokeXp: {
    color: colors.error,
  },
});

export default ({ data }) => {
  const navigation = useNavigation();
  const { id, name, weight, height, base_experience: xp } = data;

  function goToDetail() {
    navigation.navigate('PokeDetail', { pokeId: id });
  }

  return (
    <Card style={styles.pokeCard} onPress={goToDetail}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: pokeImgUrl(name) }} style={styles.pokeImage} />
      </View>
      <Card.Content style={styles.pokeCardContent}>
        <Title>{name}</Title>
        <Paragraph style={styles.pokeXp}>{`XP: ${xp}`}</Paragraph>
        <Paragraph>{`weight: ${weight}`}</Paragraph>
        <Paragraph>{`height: ${height}`}</Paragraph>
      </Card.Content>
    </Card>
  );
};
