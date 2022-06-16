import React, { useContext } from 'react';
import {StatusBar} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Accounts from '../views/Accounts';

import Home from '../views/Home';
import CreditCards from '../views/CreditCards';
import CardEditor from '../views/CreditCards/CardEditor';
import AccountEditor from '../views/Accounts/AccountEditor';
import ButtonDrawler from '../shared/ButtonDrawler';
import Config from '../views/Config/index';
import { ThemeContext } from '../contexts/ThemeContext';

const Stack = createNativeStackNavigator();

function makeScreenOptions(theme) {
  return {
    headerStyle: {
      backgroundColor: theme.backgroundContainer,
    },
    headerTintColor: theme.headerTitle,
  };
}

function HomeNavigator({navigation}) {
  const {chosenTheme} = useContext(ThemeContext);
  const screenOptions = makeScreenOptions(chosenTheme)
  return (
    <>
      <StatusBar backgroundColor={chosenTheme.backgroundContainer} />
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          options={{
            headerTitle: 'Visão Geral',
            headerLeft: () => <ButtonDrawler onPress={navigation.toggleDrawer} />,
          }}
          name="HomeScreen"
          component={Home}
          />
      </Stack.Navigator>
    </>
  );
}

function AccountNavigator({navigation}) {
  const {chosenTheme} = useContext(ThemeContext);
  const screenOptions = makeScreenOptions(chosenTheme)
  return (
    <>
    <StatusBar backgroundColor={chosenTheme.backgroundContainer} />
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        options={{
          headerTitle: 'Contas',
          headerLeft: () => <ButtonDrawler onPress={navigation.toggleDrawer} />,
        }}
        name="ContasScreen"
        component={Accounts}
      />
      <Stack.Screen name="Editor de Contas" component={AccountEditor} />
    </Stack.Navigator>
    </>
  );
}

function CreditCardNavigator({navigation}) {
  const {chosenTheme} = useContext(ThemeContext);
  const screenOptions = makeScreenOptions(chosenTheme)
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        options={{
          headerTitle: 'Cartões de Crédito',
          headerLeft: () => <ButtonDrawler onPress={navigation.toggleDrawer} />,
        }}
        name="CartãoScreen"
        component={CreditCards}
      />
      <Stack.Screen name="Editor de Cartão" component={CardEditor} />
    </Stack.Navigator>
  );
}

function ConfigNavigator({navigation}) {
  const {chosenTheme} = useContext(ThemeContext);
  const screenOptions = makeScreenOptions(chosenTheme)
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        options={{
          headerTitle: 'Configurações',
          headerLeft: () => <ButtonDrawler onPress={navigation.toggleDrawer} />,
        }}
        name="Config"
        component={Config}
      />
    </Stack.Navigator>
  );
}

export {CreditCardNavigator, AccountNavigator, HomeNavigator, ConfigNavigator};
