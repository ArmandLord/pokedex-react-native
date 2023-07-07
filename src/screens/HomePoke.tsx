import React from 'react';
import {Image, Text, View} from 'react-native';
import {globalStyles} from '../theme/GlobalStyles';
import {SafeAreaView} from 'react-native-safe-area-context';

export const HomePoke = () => {
  return (
    <View>
      <Image
        source={require('../assets/pokebola.png')}
        style={globalStyles.backgroundImage}
      />
      <SafeAreaView style={globalStyles.globalMargin}>
        <Text style={globalStyles.title}>Pokedex</Text>
      </SafeAreaView>
    </View>
  );
};
