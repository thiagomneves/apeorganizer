import React, { useEffect, useState } from 'react';
import {SafeAreaView, StatusBar, Text} from 'react-native';

import { ThemeProvider } from './src/contexts/ThemeContext';

import AppRoutes from './src/routes/AppRoutes';
import { createTable } from './src/services/Cards';

function App() {

  useEffect(() => {
    createTable()
  }, [])

  return (
    <SafeAreaView style={{flex: 1}}>
      <ThemeProvider>
        <StatusBar backgroundColor="orange" />
        <AppRoutes />
      </ThemeProvider>
    </SafeAreaView>
  );
}

export default App;
