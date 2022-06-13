import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DailyCard from './DailyCard';

export default function DailySummary() {
  return (
    <View style={estilos.container}>
      <DailyCard title="Saldo do dia" value="R$ 0,00" borderColor="green"/>
      <DailyCard title="Despesas" value="R$ 0,00" color="#f00"/>
      <DailyCard title="Despesas no crédito" value="R$ 0,00" color="#f90"/>
      <DailyCard title="Receitas" value="R$ 0,00" color="#0b8"/>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  }
})
