import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackPokeNavigation from './src/navigation/StackPokeNavigation';

const App = () => {
  return (
    <NavigationContainer>
      <StackPokeNavigation />
    </NavigationContainer>
  );
};

export default App;
