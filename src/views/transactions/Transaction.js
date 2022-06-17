import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";

export default function Transaction(props) {
  const {item, selectedTransaction, setSelectedTransaction, editorTransferNavigate, setShowMinorBtn} = {...props}
  const {chosenTheme} = useContext(ThemeContext);
  const estilo = estilos({theme: chosenTheme});

  useEffect(() => {
    if (Object.keys(selectedTransaction).length > 0) {
      editorTransferNavigate()
    }
  }, [selectedTransaction])

  return (
    <TouchableOpacity onPress={() => setSelectedTransaction(item)} style={estilo.transactionContainer}>
      <Text>{item.type}</Text>
      <Text>{item.accountfromtitle}</Text>
      <Text>{item.accounttotitle}</Text>
      <Text>{item.date}</Text>
      <Text>{item.value}</Text>
      <Text>{item.obs}</Text>
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
