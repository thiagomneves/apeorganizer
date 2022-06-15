import React, { useContext, useEffect, useState } from 'react';
import {SafeAreaView, StatusBar, Text} from 'react-native';
import 'react-native-gesture-handler';

import { ThemeContext, ThemeProvider } from './src/contexts/ThemeContext';

import AppRoutes from './src/routes/AppRoutes';
import DrawerRoutes from './src/routes/DrawerRoutes';
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
        <DrawerRoutes>

        </DrawerRoutes>
      </ThemeProvider>
    </SafeAreaView>
  );
}

export default App;
