import React from 'react';
import { View, ScrollView } from 'react-native';
import PokeLoading from '@components/PokeLoading';

export default (props) => {
  const { loading, children, scrollable } = props;
  const Content = scrollable ? ScrollView : View;

  return loading ? (
    <PokeLoading />
  ) : (
    <Content
      {...props}
      showsVerticalScrollIndicator={scrollable ? false : null}>
      {children}
    </Content>
  );
};
