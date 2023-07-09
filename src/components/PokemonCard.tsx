import React, {useEffect, useRef, useState} from 'react';
import {SimplePokemon} from '../interfaces/PokeData';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FadeInImage} from './FadeInImage';
import ImageColors from 'react-native-image-colors';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../navigation/StackPokeNavigation';

interface Props {
  pokemon: SimplePokemon;
}

const {width} = Dimensions.get('window');

export type StackNavigation = StackNavigationProp<
  RootStackParams,
  'PokemonScreen'
>;

export const PokemonCard = ({pokemon}: Props) => {
  const [bgColor, setBgColor] = useState('gray');
  const useMounted = useRef(true);

  const {navigate} = useNavigation<StackNavigation>();

  useEffect(() => {
    ImageColors.getColors(pokemon.picture, {
      fallback: 'grey',
      cache: true,
      key: pokemon.picture,
    }).then((colors: any) => {
      if (!useMounted.current) return;
      colors.platform === 'ios';
      switch (colors.platform) {
        case 'android':
          setBgColor(colors.dominant || bgColor);
          break;
        case 'ios':
          setBgColor(colors.background || bgColor);
          break;
        case 'web':
          setBgColor(colors.dominant || bgColor);
          break;
        default:
          setBgColor(bgColor);
          break;
      }
    });

    return () => {
      useMounted.current = false;
    };
  }, []);

  return (
    <TouchableOpacity
      onPress={() => navigate('PokemonScreen', {pokemon, color: bgColor})}
      activeOpacity={0.8}
      style={{...styles.cardContainer, backgroundColor: bgColor}}>
      <View>
        <Text style={styles.name}>
          {pokemon.name}
          {'\n' + '#' + pokemon.id}
        </Text>
      </View>
      <View style={styles.pokeContainer}>
        <Image
          style={styles.img}
          source={require('../assets/pokebola-blanca.png')}
        />
      </View>
      <FadeInImage uri={pokemon.picture} style={styles.fadeInImage} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    // backgroundColor: 'gray',
    height: 120,
    width: width * 0.4,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 10,
  },
  img: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -20,
    bottom: -20,
    opacity: 0.5,
  },
  fadeInImage: {
    width: 110,
    height: 110,
    position: 'absolute',
    right: -5,
    bottom: -8,
  },
  pokeContainer: {
    // backgroundColor: 'green',
    width: 100,
    height: 100,
    position: 'absolute',
    right: -1,
    bottom: -1,
    overflow: 'hidden',
    opacity: 0.7,
  },
});
