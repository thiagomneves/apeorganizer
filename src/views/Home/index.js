import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

import CardHeader from './Components/CardHeader';
import Line from './Components/Line';
import BorderedLine from './Components/BorderedLine';
import BorderedText from './Components/BorderedText';

export default function Home() {
  return (
    <ScrollView>
    <View style={estilos.container}>
      <View style={estilos.card}>
        <Text style={estilos.cardTitle}>Saldo de Contas</Text>
        <BorderedText text="R$ 0,00" color="green"/>
      </View>
      
      <View style={estilos.card}>
        <Line title="Gastos de hoje" value="R$ 0,00" color="#f00"/>
      </View>
      <View style={estilos.card}>
        <CardHeader title="Visão geral do mês" date="Jun, 22"/>
        <BorderedLine title="Receitas" value="R$ 0,00" color="green"/>
        <BorderedLine title="Despesas" value="R$ 0,00" color="red"/>
        <BorderedLine title="Despesas no crédito" value="R$ 0,00" color="orange"/>
      </View>
      <View style={estilos.card}>
        <CardHeader title="Pendências e alertas" date="Jun, 22"/>
        <BorderedLine title="Receitas pendentes" value="R$ 0,00" color="#00f" description="Total desse mês e dos anteriores"/>
        <BorderedLine title="Despesas pendentes" value="R$ 0,00" color="#fa0" description="Total desse mês e dos anteriores"/>
        <BorderedLine title="Faturas do cartão" value="R$ 0,00" color="#90d" description="Faturas abertas que vencem esse mês"/>
        <BorderedLine title="Saldo seguro" value="R$ 0,00" color="#333" description="Total de contas menos despesas pendentes"/>
      </View>

      {/* <Text style={estilos.card}>
        Botão adicionar (transferência, receita, despesa, despesa no crédito)
      </Text> */}
    </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    paddingHorizontal: 10
  },
  card: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginTop: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  borderTop: {
    borderTopWidth: 1,
    borderColor: '#ccc',
  },


});
