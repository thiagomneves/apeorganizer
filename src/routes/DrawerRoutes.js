import React, { useContext } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import { AccountNavigator, ConfigNavigator, CreditCardNavigator, HomeNavigator, BudgetNavigator, DailySummaryNavigator, TransactionsNavigator, CategoriesNavigator } from './StackRoutes';
import CustomDrawer from '../shared/CustomDrawer';
import { GlobalContext } from '../contexts/GlobalContext';
import Styles from '../styles/Styles';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  const {theme} = useContext(GlobalContext).Theme;
  const styles = Styles();
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: false,
          drawerLabelStyle: {marginLeft: -25, fontSize: 16},
          drawerActiveBackgroundColor: theme.activeBackgroundColor,
          drawerActiveTintColor: theme.activeColor,
          drawerInactiveTintColor: theme.text,
        }}
        initialRouteName="Visão Geral">
        <Drawer.Screen
          options={{
            drawerIcon: ({color}) => (
              <MaterialIcons style={styles.drawerIcon} name="dashboard" color={color}/>
            ),
          }}
          name="Visão Geral"
          component={HomeNavigator}
        />
        <Drawer.Screen
          options={{
            drawerIcon: ({color}) => (
              <MaterialCommunityIcons style={styles.drawerIcon} name="bank" color={color}/>
            ),
          }}
          name="Contas"
          component={AccountNavigator}
        />
        <Drawer.Screen
          options={{
            drawerIcon: ({color}) => (
              <MaterialCommunityIcons style={styles.drawerIcon} name="cards" color={color}/>
            ),
          }}
          name="Cartões de Crédito"
          component={CreditCardNavigator}
        />
        <Drawer.Screen
          options={{
            drawerIcon: ({color}) => (
              <SimpleLineIcons style={styles.drawerIcon} name="graph" color={color}/>
            ),
          }}
          name="Transações"
          component={TransactionsNavigator}
        />

        <Drawer.Screen
          options={{
            drawerIcon: ({color}) => (
              <MaterialCommunityIcons style={styles.drawerIcon} name="clipboard-list-outline" color={color}/>
            ),
          }}
          name="Orçamentos"
          component={BudgetNavigator}
          />

        <Drawer.Screen
          options={{
            drawerIcon: ({color}) => (
              <MaterialCommunityIcons style={styles.drawerIcon} name="clipboard-list-outline" color={color}/>
            ),
          }}
          name="Resumo Diário"
          component={DailySummaryNavigator}
          />

        <Drawer.Screen
          options={{
            drawerIcon: ({color}) => (
              <MaterialIcons style={styles.drawerIcon} name="category" color={color}/>
            ),
          }}
          name="Categorias"
          component={CategoriesNavigator}
          />


        <Drawer.Screen
          options={{
            drawerIcon: ({color}) => (
              <Ionicons style={styles.drawerIcon} name="settings-outline" color={color}/>
            ),
          }}
          name="Preferências"
          component={ConfigNavigator}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
