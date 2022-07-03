import React, { useContext, useEffect, useState } from 'react';
import {StyleSheet, View, SectionList, Text} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import I18n from "i18n-js";

import { ThemeContext } from '../../contexts/ThemeContext';
import BtnContainer from './Components/BtnContainer';
import { getTransactionsWithNames } from '../../services/Transactions';
import Transaction from './Transaction';

export default function Transactions() {
  const {chosenTheme} = useContext(ThemeContext);
  const [transactions, setTransactions] = useState([]);
  const [sectionedTransactions, setSectionedTransactions] = useState([]);
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
    console.log(allTransactions);
    setSelectedTransaction({})
    // setTransactions(allTransactions);
    let transactionsWithSections = allTransactions.reduce(makeSections, []);
    setSectionedTransactions(transactionsWithSections);
  }

  const makeSections = (accum, current)=> {
    let dateGroup = accum.find(x => x.date === I18n.strftime(new Date(current.transaction_date), "%d/%m/%Y"));
    if(!dateGroup) {
      dateGroup = { date: I18n.strftime(new Date(current.transaction_date), "%d/%m/%Y"), data: [] }
      accum.push(dateGroup);
    }
    dateGroup.data.push(current);
    return accum;
  }

  const renderSection = ({section: { date }}) => {
    return (
      <Text>{date}</Text>
    )
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
      <SectionList
        sections={sectionedTransactions}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderSection}
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
