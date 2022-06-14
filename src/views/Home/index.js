import React, {useContext} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

import {ThemeContext} from '../../contexts/ThemeContext';

import CardHeader from './Components/CardHeader';
import Line from './Components/Line';
import BorderedLine from './Components/BorderedLine';
import BorderedText from './Components/BorderedText';

export default function Home() {
  const {chosenTheme} = useContext(ThemeContext);
  const estilo = estilos(chosenTheme);

  return (
    <ScrollView>
      <View style={estilo.container}>
        <View style={estilo.card}>
          <Text style={estilo.cardTitle}>Saldo de Contas</Text>
          <BorderedText text="R$ 0,00" color={chosenTheme.green} />
        </View>

        <View style={estilo.card}>
          <Line
            title="Gastos de hoje"
            value="R$ 0,00"
            color={chosenTheme.red}
          />
        </View>
        <View style={estilo.card}>
          <CardHeader title="Visão geral do mês" date="Jun, 22" />
          <BorderedLine
            title="Receitas"
            value="R$ 0,00"
            color={chosenTheme.green}
          />
          <BorderedLine
            title="Despesas"
            value="R$ 0,00"
            color={chosenTheme.red}
          />
          <BorderedLine
            title="Despesas no crédito"
            value="R$ 0,00"
            color={chosenTheme.orange}
          />
        </View>
        <View style={estilo.card}>
          <CardHeader title="Pendências e alertas" date="Jun, 22" />
          <BorderedLine
            title="Receitas pendentes"
            value="R$ 0,00"
            color={chosenTheme.blue}
            description="Total desse mês e dos anteriores"
          />
          <BorderedLine
            title="Despesas pendentes"
            value="R$ 0,00"
            color={chosenTheme.orange}
            description="Total desse mês e dos anteriores"
          />
          <BorderedLine
            title="Faturas do cartão"
            value="R$ 0,00"
            color={chosenTheme.purple}
            description="Faturas abertas que vencem esse mês"
          />
          <BorderedLine
            title="Saldo seguro"
            value="R$ 0,00"
            color={chosenTheme.gray}
            description="Total de contas menos despesas pendentes"
          />
        </View>

        {/* <Text>
        Botão adicionar (transferência, receita, despesa, despesa no crédito)
      </Text> */}
      </View>
    </ScrollView>
  );
}

const estilos = function (theme) {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundContainer,
      paddingHorizontal: 10,
    },
    card: {
      backgroundColor: theme.backgroundContent,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 5,
      marginTop: 8,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.text,
    },
  });
};
