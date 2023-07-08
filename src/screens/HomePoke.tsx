import React from 'react';
import {ActivityIndicator, FlatList, Image, Text, View} from 'react-native';
import {globalStyles} from '../theme/GlobalStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {usePokemonPaginated} from '../hooks/usePokemonPaginated';
import {SimplePokemon} from '../interfaces/PokeData';

type ItemProps = {
  item: SimplePokemon;
};

export const HomePoke = () => {
  const {isLoading, simplePokemonList, loadPokemons} = usePokemonPaginated();

  console.log('data', JSON.stringify(simplePokemonList, null, 2));

  const renderItem = ({item}: ItemProps) => {
    return (
      <View key={item.id} style={{backgroundColor: 'red'}}>
        <Text>{item.name}</Text>
      </View>
    );
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
      <SafeAreaView style={{...globalStyles.globalMargin, flex: 1}}>
        <Text style={globalStyles.title}>Pokedexx</Text>
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
          // infiniteScroll
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4}
          showsVerticalScrollIndicator={false}
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
