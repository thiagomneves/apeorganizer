import React from 'react';
import { SafeAreaView, Text} from 'react-native';
import AppRoutes from './src/routes/AppRoutes';

function App() {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppRoutes />
    </SafeAreaView>
  );
}

export default App;
