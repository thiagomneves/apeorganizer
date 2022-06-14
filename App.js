import React, { useEffect, useState } from 'react';
import {SafeAreaView, StatusBar, Text} from 'react-native';
import AppRoutes from './src/routes/AppRoutes';

import { createTable } from './src/services/Cards';

function App() {

  useEffect(() => {
    createTable()
  }, [])

  const [cards, setCards] = useState([])

  async function showCards() {
    console.log('show cards aqui')
    // setNotas(todasNotas)
    // console.log(todasNotas)
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor="orange" />
      <AppRoutes />
    </SafeAreaView>
  );
}

export default App;
