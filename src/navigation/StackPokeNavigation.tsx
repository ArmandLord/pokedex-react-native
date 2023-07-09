import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomePoke, PokemonScreen} from '../screens';
import {SimplePokemon} from '../interfaces/PokeData';

export type RootStackParams = {
  HomePoke: undefined;
  PokemonScreen: {pokemon: SimplePokemon; color: string};
};

const Stack = createStackNavigator<RootStackParams>();

const StackPokeNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="HomePoke" component={HomePoke} />
      <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
    </Stack.Navigator>
  );
};

export default StackPokeNavigation;
