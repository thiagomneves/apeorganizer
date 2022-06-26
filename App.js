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

LogBox.ignoreLogs(["EventEmitter.removeListener"]);

function App() {
  useEffect(() => {
    createTableAccounts()
    createTableCards()
    createTableCategories()
    createTableTransactions()
    createTableBudgets()
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
