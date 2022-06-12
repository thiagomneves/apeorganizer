import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

import Home from './src/views/Home';

function App() {
  return (
    <SafeAreaView style={estilos.body}>
      <Home/>
    </SafeAreaView>
  );
}

export default App;

const estilos = StyleSheet.create({
  body: {
    backgroundColor: '#aaa',
    height: '100%',
    padding: 10,
  }
})
