import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import I18n from "i18n-js";

import { ThemeContext } from "../../contexts/ThemeContext";
import { formatCurrency } from "../../util/functions";

export default function Transaction({item, selectedTransaction, setSelectedTransaction, editorTransferNavigate}) {
  const {chosenTheme} = useContext(ThemeContext);
  const estilo = estilos({theme: chosenTheme});

  useEffect(() => {
    if (Object.keys(selectedTransaction).length > 0) {
      editorTransferNavigate();
    }
  }, [selectedTransaction])

  return (
    <TouchableOpacity onLongPress={() => console.log('longpress')} style={estilo.transactionContainer}>
     {/* <TouchableOpacity onPress={() => setSelectedTransaction(item)} style={estilo.transactionContainer}> */}
       <Text>From: {!!item.titlefrom ? item.titlefrom : item.transaction_from}</Text>
       <Text>To: {!!item.titleto ? item.titleto : item.transaction_to}</Text>
       <Text>{item.transaction_date}</Text>
       <Text>{item.date}</Text>
       <Text>{formatCurrency(item.transaction_value)}</Text>
       <Text>{item.observation}</Text>
       <Text>{item.transaction_type}</Text>
       <Text>{item.categorycolor}</Text>
    </TouchableOpacity>
  )
}

const estilos = theme => {
  return StyleSheet.create({
    transactionContainer: {
      backgroundColor: theme.backgroundContent,
      borderBottomWidth: 1,
      borderColor: theme.border,
    }
  })
}
