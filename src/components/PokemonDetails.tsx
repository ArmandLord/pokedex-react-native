import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {PokeDataDetail} from '../interfaces/PokeDataDetail';
import {FadeInImage} from './FadeInImage';

interface Props {
  pokemon: PokeDataDetail;
  color: string;
}

export const PokemonDetails = ({pokemon, color}: Props) => {
  return (
    <ScrollView
      style={{
        ...StyleSheet.absoluteFillObject,
      }}>
      <View style={style.container}>
        <Text style={style.title}>Type</Text>
        <Text style={style.subtitle}>
          {pokemon.types.map(({type}) => type.name).join(', ')}
        </Text>
        <Text style={style.title}>Peso</Text>
        <Text style={style.subtitle}>{pokemon.weight} kg</Text>
        <Text style={style.title}>Sprites</Text>
        <ScrollView horizontal={true} style={style.containerSprites}>
          <FadeInImage
            uri={pokemon.sprites.front_default}
            style={style.pokemon}
          />
          <FadeInImage
            uri={pokemon.sprites.back_default}
            style={style.pokemon}
          />
          <FadeInImage
            uri={pokemon.sprites.front_shiny}
            style={style.pokemon}
          />
          <FadeInImage uri={pokemon.sprites.back_shiny} style={style.pokemon} />
        </ScrollView>
        <Text style={style.title}>Habilidades</Text>
        <View style={style.containerTags}>
          {pokemon.abilities.map(({ability}) => (
            <View
              key={ability.url}
              style={{...style.tags, backgroundColor: color}}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                }}>
                {ability.name}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 400,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  containerSprites: {},
  pokemon: {
    width: 120,
    height: 120,
  },
  containerTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  tags: {
    marginRight: 10,
    padding: 10,
    borderRadius: 10,
    color: '#8f8f8f',
  },
});
