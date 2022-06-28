import React, { useContext, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { TextInput } from "react-native-gesture-handler";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { ThemeContext } from "../../contexts/ThemeContext";
import {getAccountsByArchive} from '../../services/Accounts';
import {getVouchersByArchive} from '../../services/Vouchers';
import { addTransaction, editTransaction, removeTransaction } from "../../services/Transactions";
import PaymentMeanPicker from "./Components/PaymentMeanPicker";
import { voucherTypes } from "../../util/types";

export default function Transfer({navigation }) {
  const {chosenTheme} = useContext(ThemeContext);
  const [value, setValue] = useState("0,00")
  const [obs, setObs] = useState("")
  const [accounts, setAccounts] = useState([]);
  const [vouchers, setVouchers] = useState([]);
  const [accountFrom, setAccountFrom] = useState("");
  const [typeFrom, setTypeFrom] = useState("");
  const [colorFrom, setColorFrom] = useState("#AAAAAA");
  const [paymentMeansFrom, setPaymentMeansFrom] = useState([]);
  const [transactionFrom, setTransactionFrom] = useState();
  const [date, setDate] = useState("2022-06-17");
  const [typeTo, setTypeTo] = useState("");
  const [colorTo, setColorTo] = useState("#AAAAAA");
  const [paymentMeansTo, setPaymentMeansTo] = useState([]);
  const [transactionTo, setTransactionTo] = useState()
  const [accountTo, setAccountTo] = useState("");
  const route = useRoute()
  const selectedTransaction = route.params.selectedTransaction
  const transactionToUpdate = Object.keys(selectedTransaction).length > 0;
  
  useEffect(() => {
    getData()
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

  async function getData() {
    const allAccounts = await getAccountsByArchive(false);
    setAccounts(allAccounts);
    const allVouchers = await getVouchersByArchive(false);
    setVouchers(allVouchers);
    let vouchersFrom = allVouchers.filter(item => {
      if (item.type == 'prepaid') return item;
    })
    setPaymentMeansFrom(allAccounts.concat(vouchersFrom))
    setPaymentMeansTo(allAccounts.concat(allVouchers))
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
    <View style={estilo.picker}>
    <PaymentMeanPicker
          color={colorFrom}
          paymentMeans={paymentMeansFrom}
          transaction={transactionFrom}
          setTransaction={setTransactionFrom}
          type={typeFrom}
          setType={setTypeFrom}
        />
    </View>
    <MaterialIcons style={estilo.icon} name="arrow-downward"/>
    <View style={estilo.picker}>
      <PaymentMeanPicker
          color={colorTo}
          paymentMeans={paymentMeansTo}
          transaction={transactionTo}
          setTransaction={setTransactionTo}
          type={typeTo}
          setType={setTypeTo}
        />
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
    picker: {
      backgroundColor: theme.backgroundContent,
    },
  })
}
