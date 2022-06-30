import React, { useContext, useEffect, useState } from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';

import { ThemeContext } from '../../contexts/ThemeContext';
import BtnContainer from './Components/BtnContainer';
import { getTransactions } from '../../services/Transactions';
import Transaction from './Transaction';


export default function Transactions() {
  const {chosenTheme} = useContext(ThemeContext);
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [showMinorBtn, setShowMinorBtn] = useState(false);
  // const route = useRoute();
  const isFocused = useIsFocused();
  const estilo = estilos({theme: chosenTheme});
  useEffect(() => {
    if (isFocused) {
      showTransactions();
      // console.log(transactions);
    }
  }, [isFocused]);

  async function showTransactions() {
    const allTransactions = await getTransactions();
    setSelectedTransaction({})
    setTransactions(allTransactions);
  }
  const renderItem = ({item}) => {
    // console.log('-------------------------------------');
    // console.log(item)
    return (
      <>
        {/* <Text>{item.toString()}</Text> */}
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
  // console.log(transactions);
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
