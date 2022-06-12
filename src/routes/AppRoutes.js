import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../views/Home';
import Accounts from '../views/Accounts';
import CreditCards from '../views/CreditCards';

const Tab = createBottomTabNavigator();

export default function AppRoutes() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Contas" component={Accounts} />
        <Tab.Screen name="Cartões de Crédito" component={CreditCards} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
