import React from 'react';
import {ActivityIndicator, FlatList, Image, Text, View} from 'react-native';
import {globalStyles} from '../theme/GlobalStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {usePokemonPaginated} from '../hooks/usePokemonPaginated';
import {SimplePokemon} from '../interfaces/PokeData';
import {PokemonCard} from '../components/PokemonCard';

export type ItemProps = {
  item: SimplePokemon;
};

export const HomePoke = () => {
  const {isLoading, simplePokemonList, loadPokemons} = usePokemonPaginated();

  const renderItem = ({item}: ItemProps) => {
    return <PokemonCard pokemon={item} />;
  };

  return (
    <View
      style={{
        // backgroundColor: 'red',
        flex: 1,
      }}>
      <Image
        source={require('../assets/pokebola.png')}
        style={globalStyles.backgroundImage}
      />
      <SafeAreaView
        style={{
          // ...globalStyles.globalMargin,
          flex: 1,
          // backgroundColor: 'green',
          alignItems: 'center',
        }}>
        {/* {isLoading ? (
          <View
            style={{
              flex: 1,
              // backgroundColor: 'yellow',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator color="red" size={50} />
          </View>
        ) : ( */}
        <FlatList
          data={simplePokemonList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          // colums
          numColumns={2}
          // infiniteScroll
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4}
          showsVerticalScrollIndicator={false}
          // Header
          ListHeaderComponent={<Text style={globalStyles.title}>Pokedex</Text>}
          // Footer
          ListFooterComponent={
            <ActivityIndicator
              style={{
                height: 100,
              }}
              color="#0048ff"
              size={50}
            />
          }
        />
        {/* )} */}
      </SafeAreaView>
    </View>
  );
};
