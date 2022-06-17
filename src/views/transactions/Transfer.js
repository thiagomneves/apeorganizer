import React, { useContext, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { TextInput } from "react-native-gesture-handler";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { ThemeContext } from "../../contexts/ThemeContext";
import {getAccounts} from '../../services/Accounts';
import { addTransaction, editTransaction, removeTransaction } from "../../services/Transactions";

export default function Transfer({navigation }) {
  const {chosenTheme} = useContext(ThemeContext);
  const [value, setValue] = useState("0,00")
  const [obs, setObs] = useState("")
  const [accounts, setAccounts] = useState([]);
  const [accountFrom, setAccountFrom] = useState("");
  const [date, setDate] = useState("2022-06-17");
  const [accountTo, setAccountTo] = useState("");
  const route = useRoute()
  const selectedTransaction = route.params?.selectedTransaction
  const transactionToUpdate = (typeof selectedTransaction !== 'undefined' ? Object.keys(selectedTransaction).length > 0 : false);
  
  useEffect(() => {
    showAccounts()
    fillEditor()
  }, [selectedTransaction]);

  const estilo = estilos(chosenTheme)

  function fillEditor() {
    if (transactionToUpdate) {
      setAccountFrom(selectedTransaction.accountfrom)
      setAccountTo(selectedTransaction.accountto)
      setDate(selectedTransaction.date)
      setValue(selectedTransaction.value.toString())
      setObs(selectedTransaction.obs)
    }
  }
  async function showAccounts() {
    const allAccounts = await getAccounts();
    setAccounts(allAccounts);
  }

  async function saveTransfer() {
    if (accountFrom === accountTo) {
      Alert.alert('As contas precisam ser diferentes');
      return;
    }
    const oneTransfer = {
      value,
      accountFrom,
      accountTo,
      date,
      obs,
      type: 'Transferência',
    }
    await addTransaction(oneTransfer)
    navigation.goBack()
  }

  async function updateTransfer() {
    if (accountFrom === accountTo) {
      Alert.alert('As contas precisam ser diferentes');
      return;
    }
    const oneTransfer = {
      value,
      accountFrom,
      accountTo,
      date,
      obs,
      type: 'Transferência',
      id: selectedTransaction.id,
    }
    await editTransaction(oneTransfer)
    navigation.goBack()    
  }
  async function deleteTransfer() {
    const oneTransfer = {
      id: selectedTransaction.id,
    }
    await removeTransaction(oneTransfer)
    navigation.goBack()
  }

  return <View style={estilo.container}>
    <View style={estilo.inputContainer}>
      <TextInput style={estilo.input}
          onChangeText={value => setValue(value)}
          placeholder="R$ 0,00"
          value={value}
        />
    </View>
    <View style={estilo.inputContainer}>
      <TextInput style={estilo.input}
          onChangeText={date => setDate(date)}
          placeholder="Dom, 12 jun 2022"
          value={date}
        />
    </View>
    <View style={estilo.inputContainer}>
      <Picker style={estilo.input}
      selectedValue={accountFrom}
      onValueChange={accountFrom => setAccountFrom(accountFrom)}>
        {accounts.map((item) => <Picker.Item label={item.title} value={item.id} key={item.id}/>)}
      </Picker>
    </View>
    <MaterialIcons style={estilo.icon} name="arrow-downward"/>
    <View style={estilo.inputContainer}>
      <Picker style={estilo.input}
      selectedValue={accountTo}
      onValueChange={accountTo => setAccountTo(accountTo)}>
        {accounts.map((item) => <Picker.Item label={item.title} value={item.id} key={item.id}/>)}
      </Picker>
    </View>
    <View style={estilo.inputContainer}>
      <TextInput style={estilo.input}
          onChangeText={obs => setObs(obs)}
          placeholder="Observações"
          value={obs}
        />
    </View>
    <TouchableOpacity onPress={transactionToUpdate ? updateTransfer : saveTransfer} style={estilo.saveBtn}>
      <Text style={estilo.btnText}>Salvar</Text>
    </TouchableOpacity>
    { transactionToUpdate && <TouchableOpacity onPress={deleteTransfer} style={estilo.delBtn}>
        <Text style={estilo.btnText}>Apagar Transferência</Text>
      </TouchableOpacity>}
  </View>
}
const estilos = theme => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundContainer,
      flex: 1,
    },
    inputContainer: {
      borderBottomWidth: 1,
      borderColor: theme.border,
    },
    input: {
      backgroundColor: theme.backgroundContent,
      padding: 18,
    },
    icon: {
      color: theme.text,
      fontSize: 22,
      padding: 10,
      borderBottomWidth: 1,
      borderColor: theme.border,
    },
    saveBtn: {
      marginTop: 30,
      backgroundColor: theme.green,
      padding: 10,
    },
    btnText: {
      fontSize: 18,
      color: theme.white,
      textAlign: "center",
    },
    delBtn: {
      marginTop: 10,
      backgroundColor: theme.red,
      padding: 10,
    },
  })
}
