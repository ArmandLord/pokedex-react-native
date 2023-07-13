import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  FlatList,
  Dimensions,
  Platform,
} from 'react-native';
import {SearchInput} from '../components/SearchInput';
import {usePokemonSearch} from '../hooks/usePokemonSearch';
import {PokemonCard} from '../components/PokemonCard';
import {ItemProps} from './HomePoke';
import {globalStyles} from '../theme/GlobalStyles';
import {SimplePokemon} from '../interfaces/PokeData';
import {useEffect} from 'react';

const {width} = Dimensions.get('window');

export const SearchScreen = () => {
  const {isFetching, simplePokemonList} = usePokemonSearch();

  const [term, setTerm] = useState('');

  const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);

  useEffect(() => {
    if (term.length === 0) {
      return setPokemonFiltered([]);
    }

    if (isNaN(Number(term))) {
      setPokemonFiltered(
        simplePokemonList.filter(poke =>
          poke.name.toLowerCase().includes(term.toLowerCase()),
        ),
      );
    } else {
      const pokemonById = simplePokemonList.find(poke => poke.id === term);
      setPokemonFiltered(pokemonById ? [pokemonById] : []);
    }
  }, [term]);

  const renderItem = ({item}: ItemProps) => {
    return <PokemonCard pokemon={item} />;
  };

  if (isFetching) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color={'#002fff'} size={30} />
        <Text>Cargando</Text>
      </View>
    );
  }

  return (
    <View style={style.container}>
      <SearchInput
        onDebounce={value => setTerm(value)}
        style={{
          position: 'absolute',
          width: width - 50,
          top: Platform.OS === 'ios' ? 70 : 20,
        }}
      />
      <FlatList
        style={{
          marginTop: Platform.OS === 'ios' ? 120 : 70,
        }}
        data={pokemonFiltered}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        // colums
        numColumns={2}
        // infiniteScroll
        // onEndReached={loadPokemons}
        onEndReachedThreshold={0.4}
        showsVerticalScrollIndicator={false}
        // Header
        ListHeaderComponent={
          <Text
            style={{
              ...globalStyles.title,
              // backgroundColor: 'red',
              marginVertical: 10,
              marginHorizontal: 10,
            }}>
            {term}
          </Text>
        }
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
});
