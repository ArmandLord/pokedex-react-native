import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SearchScreen} from '../screens';
import Icon from 'react-native-vector-icons/Ionicons';
import {Platform} from 'react-native';
import StackPokeNavigation from './StackPokeNavigation';

const Tab = createBottomTabNavigator();

export const BottomNavigationTab = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={
        {
          // backgroundColor: 'green',
        }
      }
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#418931',
        tabBarStyle: {
          backgroundColor: 'rgba(255, 255, 255, 0.772)121)',
          position: 'absolute',
          bottom: 0,
          height: Platform.OS === 'ios' ? 80 : 60,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={StackPokeNavigation}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" size={25} color={color} />,
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="search" size={25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
