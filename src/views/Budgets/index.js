import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeContext } from '../../contexts/ThemeContext';
import Header from './Components/Header';

import Budget from './Components/Budget';

export default function Budgets() {
  const {chosenTheme} = useContext(ThemeContext);
  const estilo = estilos(chosenTheme)
  return (
    <>
      <Header/>
      <View style={estilo.container}>
        <View>
          <Text>Orçamento geral > 100%</Text>
          <Text>Meta R$2.000,00</Text>
          <Text>Gasto R$2.140,00</Text>
          <Text>Previsto R$2.140,00</Text>
          <Text>Excedeu R$140,00</Text>
        </View>
        <Budget title="Alimentação" budget="700" spent="250" color="red"/>
        <Budget title="Transporte" budget="300" spent="250" color="orange"/>
      </View>
    </>
  );
}

const estilos = theme => {
 return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundContainer,
      flex: 1,
      padding: 10,
    },
  })
}
