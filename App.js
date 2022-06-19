import React, { useContext, useEffect, useState } from 'react';
import {SafeAreaView, Text} from 'react-native';
import 'react-native-gesture-handler';

import { ThemeProvider } from './src/contexts/ThemeContext';

import DrawerRoutes from './src/routes/DrawerRoutes';
import { createTableAccounts } from './src/services/Accounts';
import { createTableBudgets } from './src/services/Budgets';
import { createTableCards } from './src/services/Cards';
import { createTableCategories } from './src/services/Categories';
import { createTableTransactions } from './src/services/Transactions';

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
        <DrawerRoutes/>
      </ThemeProvider>
    </SafeAreaView>
  );
}

export default App;
