import React, { useEffect } from 'react';
import {LogBox, SafeAreaView} from 'react-native';
import 'react-native-gesture-handler';

import { ThemeProvider } from './src/contexts/ThemeContext';
import { GlobalProvider  } from './src/contexts/GlobalContext';

import DrawerRoutes from './src/routes/DrawerRoutes';
import { createTableAccounts } from './src/services/Accounts';
import { createTableBudgets } from './src/services/Budgets';
import { createTableCards } from './src/services/Cards';
import { createTableCategories } from './src/services/Categories';
import { createTableTransactions } from './src/services/Transactions';
import { createTableVouchers } from './src/services/Vouchers';
import { createTableShoppingLists } from './src/services/ShoppingLists';
import { createTableShoppingListItem } from './src/services/ShoppingListItems';
import { createTableConfigs } from './src/services/Config';

LogBox.ignoreLogs(["EventEmitter.removeListener"]);
LogBox.ignoreLogs(["Cannot update a component (`NativeStackNavigator`)"]);

function App() {
  useEffect(() => {
    createTableAccounts()
    createTableCards()
    createTableCategories()
    createTableTransactions()
    createTableBudgets()
    createTableVouchers()
    createTableShoppingLists()
    createTableShoppingListItem()
    createTableConfigs()
  }, [])

  return (
    <SafeAreaView style={{flex: 1}}>
      <ThemeProvider>
        <GlobalProvider>
          <DrawerRoutes/>
        </GlobalProvider>
      </ThemeProvider>
    </SafeAreaView>
  );
}

export default App;
