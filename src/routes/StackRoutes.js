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
import Transactions from '../views/Transactions';
import Transfer from '../views/Transactions/Transfer';
import Revenue from '../views/Transactions/Revenue';
import Expense from '../views/Transactions/Expense';
import CardExpense from '../views/Transactions/CardExpense';
import CategorieEditor from '../views/Categories/CategoryEditor';
import Categories from '../views/Categories';
import BudgetEditor from '../views/Budgets/BudgetEditor';
import ArchiveBtn from '../shared/ArchiveBtn';
import ArchivedBtn from '../components/shared/ArchivedBtn';
import AccountsArchived from '../views/Accounts/AccountsArchived';
import SaveBtn from '../components/shared/SaveBtn';
import DeleteBtn from '../components/shared/DeleteBtn';

const Stack = createNativeStackNavigator();

function makeScreenOptions(theme) {
  return {
    headerStyle: {
      backgroundColor: theme.headerBackground,
    },
    headerTintColor: theme.headerTitle,
  };
}

export function HomeNavigator({navigation}) {
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
        <Stack.Screen
          options={{headerTitle: 'Resumo Diário'}}
          name="BudgetHomeScreen"
          component={DailySummary} />
        <Stack.Screen 
          options={{headerTitle: 'Transações'}}
          name="TransactionsHomeScreen" 
          component={Transactions} />
      </Stack.Navigator>
    </>
  );
}

export function AccountNavigator({navigation}) {
  const {chosenTheme} = useContext(ThemeContext);
  const screenOptions = makeScreenOptions(chosenTheme)
  return (
    <>
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        options={{
          headerTitle: 'Contas',
          headerLeft: () => <ButtonDrawler onPress={navigation.toggleDrawer} />,
          headerRight: () => <ArchivedBtn onPress={() => navigation.navigate('AccountsArchived')}/>,
        }}
        name="Accounts"
        component={Accounts}
      />
      <Stack.Screen 
      options={{headerTitle: "Contas Arquivadas"}}
      name="AccountsArchived"
      component={AccountsArchived}
      />
      <Stack.Screen 
        options={{
          headerRight: () => <ArchiveBtn />,
        }}
        name="Editor de Contas" 
        component={AccountEditor} />
    </Stack.Navigator>
    </>
  );
}

export function CreditCardNavigator({navigation}) {
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
      <Stack.Screen 
        options={{
          headerRight: () => <><SaveBtn /><DeleteBtn/></>,
        }}
        name="Editar Cartão" component={CardEditor} />
      <Stack.Screen 
        options={{
          headerRight: () => <SaveBtn />,
        }}
        name="Novo Cartão" component={CardEditor} />
    </Stack.Navigator>
  );
}
export function TransactionsNavigator({navigation}) {
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
      <Stack.Screen name="Transferência" component={Transfer} />
      <Stack.Screen name="Receita" component={Revenue} />
      <Stack.Screen name="Despesa" component={Expense} />
      <Stack.Screen name="Despesa no Crédito" component={CardExpense} />
    </Stack.Navigator>
  );
}
export function BudgetNavigator({navigation}) {
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
      <Stack.Screen name="Editor de Orçamentos" component={BudgetEditor} />
    </Stack.Navigator>
  );
}

export function DailySummaryNavigator({navigation}) {
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
    </Stack.Navigator>
  );
}

export function CategoriesNavigator({navigation}) {
  const {chosenTheme} = useContext(ThemeContext);
  const screenOptions = makeScreenOptions(chosenTheme)
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        options={{
          headerTitle: 'Categorias',
          headerLeft: () => <ButtonDrawler onPress={navigation.toggleDrawer} />,
        }}
        name="CategoriesTab"
        component={Categories}
      />
      <Stack.Screen name="Editor de Categorias" component={CategorieEditor} />
    </Stack.Navigator>
  );
}

export function ConfigNavigator({navigation}) {
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

