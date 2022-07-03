import React, { useContext, useEffect, useState } from "react";
import { TextInput, Alert, StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import CurrencyInput from 'react-native-currency-input';
import DatePicker from 'react-native-neat-date-picker'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import I18n from "i18n-js";

import { ThemeContext } from "../../contexts/ThemeContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import {editAccount, getAccount, getAccountsByArchive} from '../../services/Accounts';
import {editVoucher, getVoucher, getVouchersByArchive} from '../../services/Vouchers';
import { addTransaction, editTransaction, removeTransaction } from "../../services/Transactions";
import PaymentMeanPicker from "./Components/PaymentMeanPicker";

export default function Transfer({navigation }) {
  const {chosenTheme} = useContext(ThemeContext);
  const {save, setSave} = useContext(GlobalContext);
  const [value, setValue] = useState(0)
  const [observation, setObservation] = useState("")
  const [accounts, setAccounts] = useState([]);
  const [vouchers, setVouchers] = useState([]);
  const [typeFrom, setTypeFrom] = useState("");
  const [colorFrom, setColorFrom] = useState("#AAAAAA");
  const [paymentMeansFrom, setPaymentMeansFrom] = useState([]);
  const [transactionFrom, setTransactionFrom] = useState();
  const [date, setDate] = useState(new Date());
  const [typeTo, setTypeTo] = useState("");
  const [colorTo, setColorTo] = useState("#AAAAAA");
  const [paymentMeansTo, setPaymentMeansTo] = useState([]);
  const [transactionTo, setTransactionTo] = useState()
  const [showDatePicker, setShowDatePicker] = useState(false);
  const route = useRoute()
  const selectedTransaction = route.params.selectedTransaction
  const transactionToUpdate = Object.keys(selectedTransaction).length > 0;
  
  useEffect(() => {
    if (save) {
      setSave(false);
      saveTransfer();
    }
    getData()
    fillEditor()
  }, [save]);

  const estilo = estilos(chosenTheme)

  function fillEditor() {
    if (transactionToUpdate) {
      // setAccountFrom(selectedTransaction.accountfrom)
      // setAccountTo(selectedTransaction.accountto)
      // setDate(selectedTransaction.date)
      // setValue(selectedTransaction.value.toISOString())
      // setObservation(selectedTransaction.observation)
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
    if (!transactionFrom) {
      Alert.alert('O meio de pagamento "de" é obrigatório');
      return
    }
    if (!transactionTo) {
      Alert.alert('O meio de pagamento "para" é obrigatório');
      return
    }
    if (!value) {
      Alert.alert('O valor é obrigatório');
      return
    }
    if (transactionFrom === transactionTo && typeFrom === typeTo) {
      Alert.alert('Os meios de pagamento precisam ser diferentes');
      return;
    }
    const oneTransfer = {
      transaction_value: value,
      transaction_from: transactionFrom,
      type_from: typeFrom,
      transaction_to: transactionTo,
      type_to: typeTo,
      transaction_date: date.toISOString(),
      transaction_type: 'transfer',
      observation,
      created: (new Date()).toISOString(),
      updated: (new Date()).toISOString(),
    }
    await addTransaction(oneTransfer);
    if (typeFrom === 'account') { //se o meio de pagamento "from" é conta
      const from = await getAccount({id: transactionFrom});
      from.balance = parseFloat(from.balance) - value;
      try {
        await editAccount(from) 
      } catch (error) {
        console.log(error);
      }
    } else {
      const from = await getVoucher({id: transactionFrom});
      from.balance = parseFloat(from.balance) - value;
      try {
        await editVoucher(from) 
      } catch (error) {
        console.log(error);
      }
    }

    if (typeTo === 'account') { //se o meio de pagamento "to" é conta
      const to = await getAccount({id: transactionTo});
      to.balance = parseFloat(to.balance) + value;
      try {
        await editAccount(to) 
      } catch (error) {
        console.log(error);
      }
    } else {
      const to = await getVoucher({id: transactionTo});
      to.balance = parseFloat(to.balance) + value;
      try {
        await editVoucher(to) 
      } catch (error) {
        console.log(error);
      }
    }
    navigation.goBack()
  }

  async function updateTransfer() {

  }
  async function deleteTransfer() {
    const oneTransfer = {
      id: selectedTransaction.id,
    }
    await removeTransaction(oneTransfer)
    navigation.goBack()
  }
  
  async function onDateConfirm(props) {
    setDate(props.date);
    setShowDatePicker(false);
  }

  return <View style={estilo.container}>
    <View style={estilo.value}>
      <CurrencyInput
        style={estilo.inputValue}
        value={value}
        onChangeValue={setValue}
        prefix="R$"
        delimiter="."
        separator=","
        precision={2}
      />
    </View>
    <Text style={estilo.input} onPress={() => setShowDatePicker(true)} style={estilo.input}>{I18n.strftime(date, "%d/%m/%Y")}</Text>
    <DatePicker
        isVisible={showDatePicker}
        mode={'single'}
        onCancel={() => setShowDatePicker(false)}
        onConfirm={onDateConfirm}
        language="pt"
        colorOptions={{
          headerColor: chosenTheme.headerBackground,
          headerTextColor: chosenTheme.headerTitle,
          backgroundColor: chosenTheme.backgroundContent,
          weekDaysColor: chosenTheme.weekDate,
          dateTextColor: chosenTheme.text,
          selectedDateBackgroundColor: chosenTheme.activeBackgroundColor,
          confirmButtonColor: chosenTheme.confirmDate,
        }}
      />
    <View style={estilo.picker}>
    <PaymentMeanPicker
          color={colorFrom}
          setColor={setColorFrom}
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
          setColor={setColorTo}
          paymentMeans={paymentMeansTo}
          transaction={transactionTo}
          setTransaction={setTransactionTo}
          type={typeTo}
          setType={setTypeTo}
        />
    </View>
    <View style={estilo.inputContainer}>
      <TextInput style={estilo.input}
          onChangeText={setObservation}
          placeholder="Observações"
          placeholderTextColor={chosenTheme.weakText}
          value={observation}
        />
    </View>
  </View>
}
const estilos = theme => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundContainer,
      flex: 1,
    },
    value: {
      backgroundColor: theme.backgroundContent,
      padding: 10,
    },
    inputValue: {
      color: theme.text,
      fontSize: 28,
      fontWeight: '600',
    },
    inputContainer: {
      borderBottomWidth: 1,
      borderColor: theme.border,
    },
    input: {
      backgroundColor: theme.backgroundContent,
      padding: 18,
      color: theme.text,
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
