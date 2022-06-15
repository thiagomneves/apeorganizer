import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import CreditCards from '../views/CreditCards';
import CardEditor from '../views/CreditCards/CardEditor';

const Stack = createNativeStackNavigator();

export default function CreditCardRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Cartão de Crédito" component={CreditCards} />
        <Stack.Screen name="Editor de Cartão" component={CardEditor} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
