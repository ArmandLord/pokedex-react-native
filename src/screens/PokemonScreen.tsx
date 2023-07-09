import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {RootStackParams} from '../navigation/StackPokeNavigation';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FadeInImage} from '../components/FadeInImage';
import {usePokemon} from '../hooks/usePokemon';
import {PokemonDetails} from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen = ({route, navigation}: Props) => {
  const {top} = useSafeAreaInsets();
  const {pokemon, color} = route.params;
  const {pokemonDetail, isLoadig} = usePokemon(route.params.pokemon.id);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={{...style.headeContainer, backgroundColor: color}}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{...style.backButton, top: top + 5}}
          onPress={() => navigation.pop()}>
          <Icon name="arrow-back-outline" size={40} color="white" />
        </TouchableOpacity>

        <Text
          style={{
            ...style.name,
            top: top + 50,
          }}>
          {pokemon.name} {'\n'} #{pokemon.id}
        </Text>
        <Image
          style={style.pokeball}
          source={require('../assets/pokebola-blanca.png')}
        />
        <FadeInImage uri={pokemon.picture} style={style.pokemon} />
      </View>

      {isLoadig ? (
        <View style={style.loadingIndicator}>
          <ActivityIndicator
            style={{marginTop: 20}}
            size={50}
            color={color}
            animating={true}
          />
        </View>
      ) : (
        <PokemonDetails pokemon={pokemonDetail} color={color} />
      )}
    </View>
  );
};

const style = StyleSheet.create({
  headeContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
  },
  backButton: {
    position: 'absolute',
    zIndex: 999,
    elevation: 9,
    left: 20,
  },
  name: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    left: 20,
  },
  pokeball: {
    width: 220,
    height: 220,
    bottom: -60,
    opacity: 0.7,
  },
  pokemon: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -15,
  },
  loadingIndicator: {
    flex: 1,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
