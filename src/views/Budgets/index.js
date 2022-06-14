import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemeContext } from '../../contexts/ThemeContext';

import Budget from './Components/Budget';

export default function Budgets() {
  const {chosenTheme} = useContext(ThemeContext);
  const estilo = estilos(chosenTheme)
  return (
    <View style={estilo.container}>
      <Budget title="Alimentação" budget="700" spent="250" color="red"/>
      <Budget title="Transporte" budget="300" spent="250" color="orange"/>
    </View>
  );
}

const estilos = theme => {
 return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundContainer,
      flex: 1,
      padding: 10
    }
  })
}
