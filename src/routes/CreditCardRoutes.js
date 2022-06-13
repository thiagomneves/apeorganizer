import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CreditCards from '../views/CreditCards';

const Stack = createNativeStackNavigator();

export default function CreditCardRoutes() {
  return <Stack.Navigator>
    <Stack.Screen name="Cartão de Crédito" component={CreditCardss} />
  </Stack.Navigator>;
}
