import React, { useContext } from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { ThemeContext } from '../contexts/ThemeContext';
import Revenues from '../views/Categories/Revenues';
import Expenses from '../views/Categories/Expenses';

const Tab = createMaterialTopTabNavigator();

function makeScreenOptions(theme) {
  return {
    tabBarLabelStyle: { 
      fontSize: 12,
      color: theme.headerTitle,
    },
    tabBarStyle: { 
      backgroundColor: theme.backgroundContainer,
    },
  };
}

export function CategoriesTopTabNavigator() {
  const {chosenTheme} = useContext(ThemeContext);
  const screenOptions = makeScreenOptions(chosenTheme)

  return (
    <Tab.Navigator tabBarOptions={{activeTintColor: '#e91e63'}} screenOptions={screenOptions}>
      <Tab.Screen name="Receitas" component={Revenues} />
      <Tab.Screen name="Despesas" component={Expenses} />
    </Tab.Navigator>
  );
}
