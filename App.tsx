import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackPokeNavigation from './src/navigation/StackPokeNavigation';
import {BottomNavigationTab} from './src/navigation/BottomNavigationTab';

const App = () => {
  return (
    <NavigationContainer>
      {/* <StackPokeNavigation /> */}
      <BottomNavigationTab />
    </NavigationContainer>
  );
};

export default App;
