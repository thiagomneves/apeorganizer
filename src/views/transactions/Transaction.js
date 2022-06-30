import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";

export default function Transaction({item, selectedTransaction, setSelectedTransaction, editorTransferNavigate}) {
  // const {item, selectedTransaction, setSelectedTransaction, editorTransferNavigate, setShowMinorBtn} = {...props}
  const {chosenTheme} = useContext(ThemeContext);
  const estilo = estilos({theme: chosenTheme});

  useEffect(() => {
    if (Object.keys(selectedTransaction).length > 0) {
      editorTransferNavigate()
    }
    // console.log(item);
  }, [selectedTransaction])
// console.log(props);
  return (
    <TouchableOpacity onLongPress={() => console.log('longpress')}>
     {/* <TouchableOpacity onPress={() => setSelectedTransaction(item)} style={estilo.transactionContainer}> */}
      <Text>hueheuehu</Text>
       <Text>From: {item.transaction_from}</Text>
       <Text>To: {item.transaction_to}</Text>
       <Text>{item.transaction_date}</Text>
       <Text>{item.date}</Text>
       <Text>{item.transaction_value}</Text>
       <Text>{item.observation}</Text>
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
