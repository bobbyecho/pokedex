import React from 'react';
import { View } from 'react-native';
import PokeLoading from '@components/PokeLoading';

export default ({ loading, children }) => {
  return loading ? <PokeLoading /> : <View>{children}</View>;
};
