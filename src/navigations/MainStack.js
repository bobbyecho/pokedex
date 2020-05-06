import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

/** List of screen  */
import PokeList from '@src/features/PokeList';
import PokeDetail from '@src/features/PokeDetail';
/** End list of screen */

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator initialRouteName="PokeList">
    <Stack.Screen
      name="PokeList"
      component={PokeList}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="PokeDetail" component={PokeDetail} />
  </Stack.Navigator>
);
