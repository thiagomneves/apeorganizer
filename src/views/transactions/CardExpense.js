import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import CurrencyInput from 'react-native-currency-input';
import DatePicker from "react-native-neat-date-picker";
import I18n from "i18n-js";

import { GlobalContext } from "../../contexts/GlobalContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import CategoryPicker from "./Components/CategoryPicker";
import CheckBox from "../../components/shared/CheckBox";
import RadioButton from "../../components/shared/RadioButton";
import { addExpense } from "../../services/Transactions";
import ExpensePicker from "./Components/ExpensePicker";
import { editAccount, getAccount } from "../../services/Accounts";
import { editCard, editCardSpent, getCard, getCards } from "../../services/Cards";

const radioTypes = {
  fixedValue: "Valor Fixo",
  splitValue: "Parcelar Valor",
}

export default function CardExpense({navigation}) {
  const {chosenTheme} = useContext(ThemeContext);
  const {save, setSave} = useContext(GlobalContext);
  const [transactionValue, setTransactionValue] = useState(0);
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [transactionFrom, setTransactionFrom] = useState('');
  const [typeFrom, setTypeFrom] = useState('creditcard');
  const [description, setDescription] = useState('');
  const [observation, setObservation] = useState('');
  const [finished, setFinished] = useState(false);
  const [repeatCheck, setRepeatCheck] = useState(false);
  const [repeat, setRepeat] = useState(Object.keys(radioTypes)[0]);
  const [repetitions, setRepetitions] = useState();
  const [frequency, setFrequency] = useState();
  const [category, setCategory] = useState();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const estilo = estilos(chosenTheme);

  useEffect(() => {
    if (save) {
      setSave(false);
      saveExpense();
    }
  },[save]);

  async function onDateConfirm({date}) {
    setTransactionDate(date);
    setShowDatePicker(false);
  }

  async function saveExpense() {
    const oneTransfer = {
      transaction_value: transactionValue,
      transaction_from: transactionFrom,
      type_from: typeFrom,
      transaction_date: transactionDate.toString(),
      transaction_type: 'revenue',
      observation,
      finished, 
      category,
      repeat,
      created: (new Date()).toString(),
      updated: (new Date()).toString(),
    }
    await addExpense(oneTransfer);
    
    const from = await getCard({id: transactionFrom});
    from.spent = parseFloat(from.spent) + transactionValue;
    try {
      await editCardSpent(from) 
    } catch (error) {
      console.log(error);
    }
    navigation.goBack();
  }
  
  return (
    <View>
      <View style={estilo.value}>
        <CurrencyInput
          style={estilo.inputValue}
          value={transactionValue}
          onChangeValue={setTransactionValue}
          prefix="R$"
          delimiter="."
          separator=","
          precision={2}
        />
      </View>
      <View style={estilo.inputContainer}>
        <TextInput placeholder="Descrição" value={description} onChangeText={setDescription}/>
      </View>
      <Text onPress={() => setShowDatePicker(true)} style={estilo.input}>{I18n.strftime(transactionDate, "%d/%m/%Y")}</Text>
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
      <CategoryPicker category={category} setCategory={setCategory} type={'expense'} />
      <ExpensePicker paymentMean={transactionFrom} setPaymentMean={setTransactionFrom} type={typeFrom}/>
      <View style={estilo.inputContainer}>
        <TextInput placeholder="Observação" value={observation} onChangeText={setObservation}/>
      </View>
      <CheckBox color={chosenTheme.checkboxColor} check={finished} setCheck={setFinished} label="Pago"/>
      <CheckBox color={chosenTheme.checkboxColor} check={repeatCheck} setCheck={setRepeatCheck} label="Repetir ou Parcelar"/>
      {repeatCheck && <RadioButton color={chosenTheme.checkboxColor} optionList={radioTypes} radioOn={repeat} setRadioOn={setRepeat}/>}
    </View>
  )
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

