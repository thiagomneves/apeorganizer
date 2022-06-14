import React, { useContext, useEffect, useState } from 'react';
import {SafeAreaView, StatusBar, Text} from 'react-native';

import { ThemeContext, ThemeProvider } from './src/contexts/ThemeContext';

import AppRoutes from './src/routes/AppRoutes';
import { createTable } from './src/services/Cards';

function App() {
  const {chosenTheme} = useContext(ThemeContext);
console.log(chosenTheme)
  useEffect(() => {
    createTable()
  }, [])

  return (
    <SafeAreaView style={{flex: 1}}>
      <ThemeProvider>
        <StatusBar backgroundColor={typeof chosenTheme == 'undefined' ? 'orange' : chosenTheme.red} />
        <AppRoutes />
      </ThemeProvider>
    </SafeAreaView>
  );
}

export default App;
