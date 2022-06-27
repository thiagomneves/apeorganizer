import React, { useContext } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { AccountNavigator, ConfigNavigator, CreditCardNavigator, HomeNavigator, BudgetNavigator, DailySummaryNavigator, TransactionsNavigator, CategoriesNavigator, VoucherNavigator, ShoppingListNavigator } from './StackRoutes';
import CustomDrawer from '../shared/CustomDrawer';
import {StyleSheet} from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  const {chosenTheme} = useContext(ThemeContext);
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: false,
          drawerLabelStyle: {marginLeft: -25, fontSize: 16},
          drawerActiveBackgroundColor: chosenTheme.activeBackgroundColor,
          drawerActiveTintColor: chosenTheme.activeColor,
          drawerInactiveTintColor: chosenTheme.text,
        }}
        initialRouteName="Visão Geral">
        <Drawer.Screen
          options={{
            drawerIcon: ({color}) => (
              <MaterialIcons style={estilo.icon} name="dashboard" color={color}/>
            ),
          }}
          name="Visão Geral"
          component={HomeNavigator}
        />
        <Drawer.Screen
          options={{
            drawerIcon: ({color}) => (
              <MaterialCommunityIcons style={estilo.icon} name="bank" color={color}/>
            ),
          }}
          name="Contas"
          component={AccountNavigator}
        />
        <Drawer.Screen
          options={{
            drawerIcon: ({color}) => (
              <MaterialCommunityIcons style={estilo.icon} name="cards" color={color}/>
            ),
          }}
          name="Cartões de Crédito"
          component={CreditCardNavigator}
        />
        <Drawer.Screen
          options={{
            drawerIcon: ({color}) => (
              <MaterialCommunityIcons style={estilo.icon} name="cards-outline" color={color}/>
            ),
          }}
          name="Vouchers"
          component={VoucherNavigator}
        />
        <Drawer.Screen
          options={{
            drawerIcon: ({color}) => (
              <MaterialIcons style={estilo.icon} name="insights" color={color}/>
            ),
          }}
          name="Transações"
          component={TransactionsNavigator}
        />

        <Drawer.Screen
          options={{
            drawerIcon: ({color}) => (
              <MaterialCommunityIcons style={estilo.icon} name="clipboard-list-outline" color={color}/>
            ),
          }}
          name="Orçamentos"
          component={BudgetNavigator}
          />

        <Drawer.Screen
          options={{
            drawerIcon: ({color}) => (
              <MaterialCommunityIcons style={estilo.icon} name="clipboard-list-outline" color={color}/>
            ),
          }}
          name="Resumo Diário"
          component={DailySummaryNavigator}
          />

        <Drawer.Screen
          options={{
            drawerIcon: ({color}) => (
              <MaterialCommunityIcons style={estilo.icon} name="format-list-checks" color={color}/>
            ),
          }}
          name="Lista de Compras"
          component={ShoppingListNavigator}
          />

        <Drawer.Screen
          options={{
            drawerIcon: ({color}) => (
              <MaterialIcons style={estilo.icon} name="category" color={color}/>
            ),
          }}
          name="Categorias"
          component={CategoriesNavigator}
          />


        <Drawer.Screen
          options={{
            drawerIcon: ({color}) => (
              <Ionicons style={estilo.icon} name="settings-outline" color={color}/>
            ),
          }}
          name="Preferências"
          component={ConfigNavigator}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const estilo = StyleSheet.create({
  icon: {
    fontSize: 22,
    margin: 0,
  },
});
