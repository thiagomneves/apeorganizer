import React, { useContext } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { ThemeContext } from '../../contexts/ThemeContext';
import DailyCard from './DailyCard';

export default function DailySummary() {
  const {chosenTheme} = useContext(ThemeContext);

  const estilo = estilos(chosenTheme)

  return (
    <View style={estilo.container}>
      <DailyCard title="Saldo do dia" value="R$ 0,00" borderColor="green"/>
      <DailyCard title="Despesas" value="R$ 0,00" color="red"/>
      <DailyCard title="Despesas no crédito" value="R$ 0,00" color="orange"/>
      <DailyCard title="Receitas" value="R$ 0,00" color="green"/>
    </View>
  );
}

const estilos = theme => {
  return StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: theme.backgroundContainer,
      flex: 1,
    }
  })
}
