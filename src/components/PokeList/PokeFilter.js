import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { RadioButton, TouchableRipple } from 'react-native-paper';
import { capitalize } from '@helpers/transforms';
import pokeTypes from '@helpers/pokeTypes';
import PokeElementalIcon from './PokeElementalIcon';
import Icon from 'react-native-vector-icons/AntDesign';
import metrics from '@themes/metrics';
import colors from '@themes/colors';
import Modal from 'react-native-modal';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: metrics.distance.l,
    paddingHorizontal: metrics.distance.m,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  radioFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    paddingHorizontal: metrics.distance.xxl,
  },
  radioWrapper: {
    paddingVertical: metrics.distance.xxl,
  },
  containerRadius: {
    backgroundColor: 'white',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  modalFilter: {
    margin: 0,
    justifyContent: 'flex-end',
    marginTop: 100,
  },
  filterIconTextWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
export default ({ onFilter }) => {
  const [type, setType] = React.useState('All Pokemon');
  const [modalVisible, setModalVisible] = React.useState(false);

  function toggleModal() {
    setModalVisible(!modalVisible);
  }

  function onFilterSelected(selectedType) {
    setType(selectedType);
    toggleModal();
    onFilter(selectedType);
  }

  return (
    <TouchableRipple onPress={toggleModal}>
      <View style={styles.container}>
        <View style={styles.leftView}>
          <Image
            source={require('@assets/images/poke-elements/logo.png')}
            style={styles.pokeLogo}
          />
          <Text style={styles.pokeLogoText}>Pokedex</Text>
        </View>
        <View style={styles.centerView}>
          <PokeElementalIcon name={type} />
          <Text style={[styles.textName, { color: colors[type] }]}>
            {capitalize(type)}
          </Text>
        </View>
        <Icon size={15} name="caretdown" />

        <Modal
          onBackdropPress={toggleModal}
          isVisible={modalVisible}
          useNativeDriver={true}
          style={styles.modalFilter}>
          <View style={styles.containerRadius}>
            <ScrollView
              contentContainerStyle={styles.radioWrapper}
              showsVerticalScrollIndicator={false}>
              <RadioButton.Group value={type}>
                {Object.keys(pokeTypes).map((v) => {
                  const typeString = pokeTypes[v];
                  return (
                    <TouchableRipple
                      key={typeString}
                      onPress={() => onFilterSelected(typeString)}>
                      <View style={styles.radioFilterContainer}>
                        <View style={styles.filterIconTextWrapper}>
                          {typeString !== 'All Pokemon' ? (
                            <PokeElementalIcon name={typeString} />
                          ) : null}
                          <Text
                            style={{
                              marginLeft: metrics.distance.m,
                              color: colors[v],
                            }}>
                            {capitalize(v)}
                          </Text>
                        </View>
                        <RadioButton key={typeString} value={typeString} />
                      </View>
                    </TouchableRipple>
                  );
                })}
              </RadioButton.Group>
            </ScrollView>
          </View>
        </Modal>
      </View>
    </TouchableRipple>
  );
};
