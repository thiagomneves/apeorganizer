import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import Accounts from '../views/Accounts';

import CreditCards from '../views/CreditCards';
import CardEditor from '../views/CreditCards/CardEditor';
import AccountEditor from '../views/Accounts/AccountEditor';

const Stack = createNativeStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: '#9AC4F8',
  },
  headerTintColor: 'white',
  headerBackTitle: 'Back',
};

function AccountNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="ContasScreen" component={Accounts} />
      <Stack.Screen name="Editor de Contas" component={AccountEditor} />
    </Stack.Navigator>
  );
}

function CreditCardNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="CartãoScreen" component={CreditCards} />
      <Stack.Screen name="Editor de Cartão" component={CardEditor} />
    </Stack.Navigator>
  );
}

export {CreditCardNavigator, AccountNavigator};
