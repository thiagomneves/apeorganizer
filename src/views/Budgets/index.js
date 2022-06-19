import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeContext } from '../../contexts/ThemeContext';
import Header from './Components/Header';

import Budget from './Components/Budget';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AddBudgetBtn from './Components/AddBudgetBtn';
import { getBudgets } from '../../services/Budgets';

export default function Budgets() {
  const {chosenTheme} = useContext(ThemeContext);
  const navigation = useNavigation();
  const [budgets, setBudgets] = useState([]);
  const isFocused = useIsFocused();
  const [selectedBudget, setSelectedBudget] = useState({});
  const estilo = estilos(chosenTheme)
  useEffect(() => {
    if (isFocused) {
      showBudgets()
    }
  },[isFocused])


  async function showBudgets() {
    const budgetList = await getBudgets()
    setSelectedBudget({})
    setBudgets(budgetList)
  }
  const editorNavigate = () => {
    navigation.navigate('Editor de Orçamentos', {selectedBudget});
  }
  const renderItem = (item) => (
    <Budget key={item.id} item={item} selectedBudget={selectedBudget} setSelectedBudget={setSelectedBudget} editorNavigate={editorNavigate}/>
  )
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
        {!!budgets && budgets.map(item => renderItem(item))}
      </View>
      <AddBudgetBtn onPress={editorNavigate}/>
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
