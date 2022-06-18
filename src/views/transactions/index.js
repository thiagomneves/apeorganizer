import React, { useContext, useEffect, useState } from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';

import { ThemeContext } from '../../contexts/ThemeContext';
import BtnContainer from './BtnContainer';
import { getTransactions } from '../../services/Transactions';
import Transaction from './Transaction';


export default function Transactions() {
  const {chosenTheme} = useContext(ThemeContext);
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [showMinorBtn, setShowMinorBtn] = useState(false);
  const route = useRoute();
  const isFocused = useIsFocused();
  const estilo = estilos({theme: chosenTheme});
  useEffect(() => {
    if (isFocused) {
      showTransactions();
    }
  }, [isFocused]);

  async function showTransactions() {
    const allTransactions = await getTransactions();
    setSelectedTransaction({})
    setTransactions(allTransactions);
  }

  const renderItem = ({item}) => (
    <Transaction 
    item={item}
    selectedTransaction={selectedTransaction}
    setSelectedTransaction={setSelectedTransaction}
    editorTransferNavigate={editorTransferNavigate}
    />
  );
  const editorTransferNavigate = () => {
    setShowMinorBtn(false)
    navigation.navigate(selectedTransaction.type, {selectedTransaction});
  };
  return (
    <View style={estilo.container}>
      <Text onPress={() => console.log('clicou no teste')}>teste</Text>

      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <BtnContainer editorTransferNavigate={editorTransferNavigate} showMinorBtn={showMinorBtn} setShowMinorBtn={setShowMinorBtn}/>
    </View>
  );
}
const estilos = ({theme}) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundContainer,
      flex: 1,
    },
  })
}
