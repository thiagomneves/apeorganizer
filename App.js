import React, { useContext, useEffect, useState } from 'react';
import {SafeAreaView, StatusBar, Text} from 'react-native';

import { ThemeContext, ThemeProvider } from './src/contexts/ThemeContext';

import AppRoutes from './src/routes/AppRoutes';
import CreditCardRoutes from './src/routes/CreditCardRoutes';
import { createTable } from './src/services/Cards';

function App() {
  const {chosenTheme} = useContext(ThemeContext);
console.log(chosenTheme, 'chosenTheme - App.js')
  useEffect(() => {
    createTable()
  }, [])

  return (
    <SafeAreaView style={{flex: 1}}>
      <ThemeProvider>
        <StatusBar backgroundColor={typeof chosenTheme == 'undefined' ? 'orange' : chosenTheme.red} />
        {/* <AppRoutes /> */}
        <CreditCardRoutes/>
      </ThemeProvider>
    </SafeAreaView>
  );
}

export default App;
