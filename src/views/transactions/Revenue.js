import React, { useContext, useEffect, useState } from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import DatePicker from 'react-native-neat-date-picker';
import I18n from "i18n-js";

import { ThemeContext } from '../../contexts/ThemeContext';
import CheckBox from '../../components/shared/CheckBox';
import CategoryPicker from './Components/CategoryPicker';
import AccountPicker from './Components/AccountPicker';
import RadioButton from '../../components/shared/RadioButton';
import { addRevenue } from '../../services/Transactions';
import { GlobalContext } from '../../contexts/GlobalContext';
import { accountTypes } from '../../util/types';
import { editVoucher, getVoucher } from '../../services/Vouchers';
import { editAccount, getAccount } from '../../services/Accounts';

const radioTypes = {
  fixedValue: "Valor Fixo",
  splitValue: "Parcelar Valor",
}

export default function Revenue({navigation}) {
  const {chosenTheme} = useContext(ThemeContext);
  const {save, setSave} = useContext(GlobalContext);
  const [transactionTo, setTransactionTo] = useState('');
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [transactionValue, setTransactionValue] = useState(0);
  const [typeTo, setTypeTo] = useState();
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
      saveRevenue();
    }
  },[save]);

  async function saveRevenue() {
    const oneTransfer = {
      transaction_value: transactionValue,
      transaction_to: transactionTo,
      type_to: typeTo,
      transaction_date: transactionDate.toString(),
      transaction_type: 'revenue',
      observation,
      finished, 
      repeat,
      created: (new Date()).toString(),
      updated: (new Date()).toString(),
    }
    console.log(oneTransfer);
    await addRevenue(oneTransfer);

    if (Object.keys(accountTypes).includes(typeTo)) { //se o meio de pagamento 
      const to = await getAccount({id: transactionTo});
      to.balance = parseFloat(to.balance) + transactionValue;
      try {
        await editAccount(to) 
      } catch (error) {
        console.log(error);
      }
    } else {
      const to = await getVoucher({id: transactionTo});
      to.balance = parseFloat(to.balance) + transactionValue;
      try {
        await editVoucher(to) 
      } catch (error) {
        console.log(error);
      }
    }
    navigation.goBack();
  }


  async function onDateConfirm({date}) {
    setTransactionDate(date);
    setShowDatePicker(false);
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
        <CategoryPicker category={category} setCategory={setCategory} type={'revenue'} />
        <AccountPicker account={transactionTo} setAccount={setTransactionTo} type={typeTo} setType={setTypeTo}/>
        <View style={estilo.inputContainer}>
          <TextInput placeholder="Observação" value={observation} onChangeText={setObservation}/>
        </View>
        <CheckBox color={chosenTheme.checkboxColor} check={finished} setCheck={setFinished} label="Recebido"/>
        <CheckBox color={chosenTheme.checkboxColor} check={repeatCheck} setCheck={setRepeatCheck} label="Repetir ou Parcelar"/>
        {repeatCheck && <RadioButton color={chosenTheme.checkboxColor} optionList={radioTypes} radioOn={repeat} setRadioOn={setRepeat}/>}
        
    </View>
  );
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
