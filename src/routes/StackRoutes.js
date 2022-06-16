import React, { useContext } from 'react';
import {StatusBar} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { ThemeContext } from '../contexts/ThemeContext';
import ButtonDrawler from '../shared/ButtonDrawler';

import Home from '../views/Home';
import Accounts from '../views/Accounts';
import CreditCards from '../views/CreditCards';
import CardEditor from '../views/CreditCards/CardEditor';
import AccountEditor from '../views/Accounts/AccountEditor';
import Budgets from '../views/Budgets';
import DailySummary from '../views/DailySummary';
import Config from '../views/Config/index';
import Transactions from '../views/transactions';

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
      <StatusBar backgroundColor={chosenTheme.statusBar} />
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
function TransactionsNavigator({navigation}) {
  const {chosenTheme} = useContext(ThemeContext);
  const screenOptions = makeScreenOptions(chosenTheme)
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        options={{
          headerTitle: 'Transações',
          headerLeft: () => <ButtonDrawler onPress={navigation.toggleDrawer} />,
        }}
        name="TransaçõesScreen"
        component={Transactions}
      />
    </Stack.Navigator>
  );
}
function BudgetNavigator({navigation}) {
  const {chosenTheme} = useContext(ThemeContext);
  const screenOptions = makeScreenOptions(chosenTheme)
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        options={{
          headerTitle: 'Orçamentos',
          headerLeft: () => <ButtonDrawler onPress={navigation.toggleDrawer} />,
        }}
        name="BudgetScreen"
        component={Budgets}
      />
      <Stack.Screen name="Editor de Cartão" component={CardEditor} />
    </Stack.Navigator>
  );
}

function DailySummaryNavigator({navigation}) {
  const {chosenTheme} = useContext(ThemeContext);
  const screenOptions = makeScreenOptions(chosenTheme)
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        options={{
          headerTitle: 'Resumo Diário',
          headerLeft: () => <ButtonDrawler onPress={navigation.toggleDrawer} />,
        }}
        name="BudgetScreen"
        component={DailySummary}
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

export {CreditCardNavigator, AccountNavigator, HomeNavigator, BudgetNavigator, DailySummaryNavigator, ConfigNavigator, TransactionsNavigator};
