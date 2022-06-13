import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Budget from './Components/Budget';

export default function Budgets() {
  return (
    <View style={estilos.container}>
      <Budget title="Alimentação" budget="700" spent="250" color="#f00"/>
      <Budget title="Transporte" budget="300" spent="250" color="#f90"/>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    padding: 10
  }
})
