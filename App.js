import React, { useContext, useEffect, useState } from 'react';
import {SafeAreaView, Text} from 'react-native';
import 'react-native-gesture-handler';

import { ThemeProvider } from './src/contexts/ThemeContext';

import DrawerRoutes from './src/routes/DrawerRoutes';
import { createTableAccounts } from './src/services/Accounts';
import { createTableCards } from './src/services/Cards';

function App() {
  useEffect(() => {
    createTableAccounts()
    createTableCards()
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
