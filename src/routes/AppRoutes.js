import React from 'react';
import { Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../views/Home';
import Accounts from '../views/Accounts';
import CreditCards from '../views/CreditCards';
import DailySummary from '../views/DailySummary';
import Budgets from '../views/Budgets';
import Assets from '../views/Assets';
import Config from '../views/Config';

const Tab = createBottomTabNavigator();

export default function AppRoutes() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Config" component={Config} />
        <Tab.Screen name="Contas" component={Accounts} />
        <Tab.Screen name="Cartões de Crédito" component={CreditCards} />
        <Tab.Screen name="Resumo Diário" component={DailySummary} />
        <Tab.Screen name="Orçamento" component={Budgets} />
        <Tab.Screen name="Ativos" component={Assets} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
