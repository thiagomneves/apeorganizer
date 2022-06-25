import React, {useContext, useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { GlobalContext } from '../../contexts/GlobalContext';
import { convertPriceForReal } from '../../util/functions';
import { getTotalBalance } from '../../services/Accounts';

import Styles from '../../styles/Styles';
import PanelHeader from './Components/PanelHeader';
import Line from './Components/Line';
import BorderedLine from './Components/BorderedLine';
import BorderedText from './Components/BorderedText';

export default function Home({ navigation }) {
  const {theme} = useContext(GlobalContext).Theme;
  const [balance, setBalance] = useState(0);
  const styles = Styles();
  const isFocused = useIsFocused();

  useEffect(() => {
    if(isFocused) {
      getData();
    }
  }, [isFocused]);

  async function getData() {
    const newBalance = await getTotalBalance();
    if (!!newBalance.length) {
      setBalance(newBalance[0].balance)
    }
  }

  return (
    <ScrollView style={styles.container}>
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Saldo de Contas</Text>
          <BorderedText text={convertPriceForReal(balance)} color={balance >= 0 ? theme.green : theme.red} />
        </View>

        <View style={styles.panel}>
          <Line
            title="Gastos de hoje"
            value="R$ 0,00"
            color={theme.red}
            navigate
          />
        </View>
        <View style={styles.panel}>
          <PanelHeader title="Visão geral do mês" date="Jun, 22" />
          <BorderedLine
            title="Receitas"
            value="R$ 0,00"
            color={theme.green}
            navigate
          />
          <BorderedLine
            title="Despesas"
            value="R$ 0,00"
            color={theme.red}
            navigate
          />
          <BorderedLine
            title="Despesas no crédito"
            value="R$ 0,00"
            color={theme.orange}
            navigate
          />
        </View>
        <View style={styles.panel}>
          <PanelHeader title="Pendências e alertas" date="Jun, 22" />
          <BorderedLine
            title="Receitas pendentes"
            value="R$ 0,00"
            color={theme.blue}
            description="Total desse mês e dos anteriores"
            navigate
          />
          <BorderedLine
            title="Despesas pendentes"
            value="R$ 0,00"
            color={theme.orange}
            description="Total desse mês e dos anteriores"
            navigate
          />
          <BorderedLine
            title="Faturas do cartão"
            value="R$ 0,00"
            color={theme.purple}
            description="Faturas abertas que vencem esse mês"
          />
          <BorderedLine
            title="Saldo seguro"
            value="R$ 0,00"
            color={theme.gray}
            description="Total de contas menos despesas pendentes"
          />
        </View>

        {/* <Text>
        Botão adicionar (transferência, receita, despesa, despesa no crédito)
      </Text> */}
    </ScrollView>
  );
}
