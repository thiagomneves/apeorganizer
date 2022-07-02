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
import VoucherExpense from '../views/Transactions/VoucherExpense';
import CategorieEditor from '../views/Categories/CategoryEditor';
import Categories from '../views/Categories';
import BudgetEditor from '../views/Budgets/BudgetEditor';
import ArchiveBtn from '../components/shared/ArchiveBtn';
import ArchivedBtn from '../components/shared/ArchivedBtn';
import AccountsArchived from '../views/Accounts/AccountsArchived';
import SaveBtn from '../components/shared/SaveBtn';
import DeleteBtn from '../components/shared/DeleteBtn';
import CreditCardsArchived from '../views/CreditCards/CreditCardsArchived';
import Vouchers from '../views/Vouchers';
import VoucherEditor from '../views/Vouchers/VoucherEditor';
import VouchersArchived from '../views/Vouchers/VouchersArchived';
import ShoppingLists from '../views/ShoppingLists';
import ShoppingListEditor from '../views/ShoppingLists/ShoppingListEditor';
import ShoppingList from '../views/ShoppingLists/ShoppingList';
import RegisterChecked from '../views/ShoppingLists/RegisterChecked';
import EyeBtn from '../components/shared/EyeBtn';

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
          headerRight: () => <>
              <EyeBtn />
              <ArchivedBtn onPress={() => navigation.navigate('AccountsArchived')}/>
            </>,
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
          headerRight: () => <><SaveBtn /><ArchiveBtn /><DeleteBtn/></>,
        }}
        name="Editar Conta" 
        component={AccountEditor} />
      <Stack.Screen 
        options={{
          headerRight: () => <><SaveBtn /></>,
        }}
        name="Nova Conta" 
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
          headerRight: () => <ArchivedBtn onPress={() => navigation.navigate('CreditCardsArchived')}/>,
        }}
        name="CartãoScreen"
        component={CreditCards}
      />
      <Stack.Screen 
      options={{headerTitle: "Cartões Arquivados"}}
      name="CreditCardsArchived"
      component={CreditCardsArchived}
      />
      <Stack.Screen 
        options={{
          headerRight: () => <><SaveBtn /><ArchiveBtn /><DeleteBtn/></>,
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

export function VoucherNavigator({navigation}) {
  const {chosenTheme} = useContext(ThemeContext);
  const screenOptions = makeScreenOptions(chosenTheme)
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        options={{
          headerTitle: 'Vouchers',
          headerLeft: () => <ButtonDrawler onPress={navigation.toggleDrawer} />,
          headerRight: () => <>
            <EyeBtn />
            <ArchivedBtn onPress={() => navigation.navigate('VouchersArchived')}/>
          </>,
        }}
        name="VoucherScreen" component={Vouchers}
      />
      <Stack.Screen 
        options={{
          headerRight: () => <><SaveBtn /><ArchiveBtn /><DeleteBtn/></>,
        }}
        name="Editar Voucher" component={VoucherEditor} />
      <Stack.Screen 
        options={{
          headerRight: () => <SaveBtn />,
        }}
        name="Novo Voucher" component={VoucherEditor} />
      <Stack.Screen
        options={{
          headerTitle: 'Vouchers Arquivados',
        }}
        name="VouchersArchived" component={VouchersArchived}
      />
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
      <Stack.Screen 
        options={{
          headerRight: () => <><SaveBtn /></>,
        }}
        name="Receita" component={Revenue} />
      <Stack.Screen name="Despesa" component={Expense} />
      <Stack.Screen name="Despesa no Crédito" component={CardExpense} />
      <Stack.Screen name="Despesa no Voucher" component={VoucherExpense} />
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

export function ShoppingListNavigator({navigation}) {
  const {chosenTheme} = useContext(ThemeContext);
  const screenOptions = makeScreenOptions(chosenTheme)
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        options={{
          headerTitle: 'Lista de Compras',
          headerLeft: () => <ButtonDrawler onPress={navigation.toggleDrawer} />,
        }}
        name="ShoppingLists"
        component={ShoppingLists}
      />
      <Stack.Screen 
        options={{
          headerRight: () => <><SaveBtn /></>,
        }}
        name="Nova Lista de Compras" 
        component={ShoppingListEditor} />
      <Stack.Screen 
        name="ShoppingList" 
        component={ShoppingList} />
      <Stack.Screen 
        options={{
          headerTitle: 'Registrar Itens'
        }}
        name="RegisterChecked" 
        component={RegisterChecked} />
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

