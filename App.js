import React, { useEffect } from 'react';
import {LogBox, SafeAreaView} from 'react-native';
import 'react-native-gesture-handler';

import { ThemeProvider } from './src/contexts/ThemeContext';
import { GlobalProvider  } from './src/contexts/GlobalContext';

import DrawerRoutes from './src/routes/DrawerRoutes';

LogBox.ignoreLogs(["EventEmitter.removeListener"]);
LogBox.ignoreLogs(["Cannot update a component (`NativeStackNavigator`)"]);

function App() {

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
