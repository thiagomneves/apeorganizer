import React, { useContext, useEffect, useState } from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { ThemeContext } from '../../contexts/ThemeContext';
import BtnContainer from './Components/BtnContainer';
import { getTransactionsWithNames } from '../../services/Transactions';
import Transaction from './Transaction';


export default function Transactions() {
  const {chosenTheme} = useContext(ThemeContext);
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [showMinorBtn, setShowMinorBtn] = useState(false);
  const isFocused = useIsFocused();
  const estilo = estilos({theme: chosenTheme});
  useEffect(() => {
    if (isFocused) {
      showTransactions();
    }
  }, [isFocused]);

  async function showTransactions() {
    const allTransactions = await getTransactionsWithNames();
    setSelectedTransaction({})
    setTransactions(allTransactions);
  }

  const renderItem = ({item}) => {
    return (
      <>
        <Transaction 
        item={item}
        selectedTransaction={selectedTransaction}
        setSelectedTransaction={setSelectedTransaction}
        editorTransferNavigate={editorTransferNavigate}
        />
      </>
    )
  }
  const editorTransferNavigate = () => {
    // console.log(selectedTransaction.type);
    // setShowMinorBtn(false)
    // navigation.navigate(selectedTransaction.type, {selectedTransaction});
  };

  return (
    <View style={estilo.container}>
      
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
