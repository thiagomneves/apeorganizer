import React from 'react';
import {Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import { AccountNavigator, CreditCardNavigator}  from './StackRoutes';
import Home from '../views/Home';
import AccountEditor from '../views/Accounts/AccountEditor';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Contas" component={AccountNavigator} />
        <Drawer.Screen name="Cartão de Crédito" component={CreditCardNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
