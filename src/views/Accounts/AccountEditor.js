import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';
import { useRoute } from '@react-navigation/native';
import CurrencyInput from 'react-native-currency-input';
import ColorPicker from 'react-native-wheel-color-picker';

import {ThemeContext} from '../../contexts/ThemeContext';
import { addAccount, editAccount, removeAccount } from '../../services/Accounts';
import CheckBox from './Components/CheckBox';
import TypePicker from './Components/TypePicker';

export default function AccountEditor({navigation }) {
  const {chosenTheme} = useContext(ThemeContext);
  const estilo = estilos(chosenTheme);
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#070');
  const [balance, setBalance] = useState(0);
  const [sumTotal, setSumTotal] = useState(true);
  const [type, setType] = useState('checkingaccount')
  const route = useRoute();
  const selectedAccount = route.params.selectedAccount;
  const accountToUpdate = Object.keys(selectedAccount).length > 0;

  useEffect(() => {
    fillEditor();
  }, [selectedAccount])

  async function saveAccount() {
    const oneAccount = {
      title: title,
      color: color, 
      balance: balance,
      sumtotal: sumTotal,
      type: type,
      archive: false,
    }
    await addAccount(oneAccount);
    navigation.goBack();
  }

  async function updateAccount() {
    const oneAccount = {
      title: title,
      color: color, 
      balance: balance,
      sumtotal: sumTotal,
      type: type,
      id: selectedAccount.id,
    }
    await editAccount(oneAccount);
    navigation.goBack();

  }

  async function deleteAccount() {
    const oneAccount = {
      title: title,
      color: color, 
      balance: balance,
      id: selectedAccount.id,
    }
    await removeAccount(oneAccount);
    navigation.goBack();

  }

  function fillEditor() {
    if (accountToUpdate) {
      setTitle(selectedAccount.title);
      setColor(selectedAccount.color);
      setBalance(selectedAccount.balance);
      setSumTotal(!!selectedAccount.sumtotal);
    }
  }

  return (
    <ScrollView style={estilo.container}>
      <View style={estilo.balance}>
        <Text style={estilo.labelBalance}>Saldo da Conta</Text>
        <CurrencyInput
          style={estilo.inputBalance}
          value={balance}
          onChangeValue={setBalance}
          prefix="R$"
          delimiter="."
          separator=","
          precision={2}
        />
      </View>
      <TextInput style={estilo.input}
        onChangeText={title => setTitle(title)}
        placeholder="Nome"
        value={title}
      />
      <View style={estilo.picker}>
        <TypePicker color={color} type={type} setType={setType}/>
      </View>
      <View style={estilo.colorContainer}>
        <ColorPicker
          color={color}
          swatches={false}
          onColorChange={selectedColor => setColor(selectedColor)}
        />
      </View>
      <CheckBox label="Somar ao total da tela inicial" sumTotal={sumTotal} setSumTotal={setSumTotal}/>
      <TouchableOpacity onPress={() => accountToUpdate ? updateAccount() : saveAccount()}>
        <Text style={estilo.btnSalvar}>Salvar</Text>
      </TouchableOpacity>
      { accountToUpdate && <TouchableOpacity onPress={() => deleteAccount()}>
        <Text style={estilo.btnApagar}>Apagar Cartão</Text>
      </TouchableOpacity>}
    </ScrollView>
  );
}

const estilos = theme => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundContainer,
      flex: 1,
    },
    balance: {
      backgroundColor: theme.backgroundContent,
      padding: 10,
    },
    labelBalance: {
      fontSize: 16,
      padding: 5,
      color: theme.strong,
      fontSize: 20,
    },
    inputBalance: {
      color: theme.text,
      fontSize: 28,
      fontWeight: '600',
    },
    input: {
      backgroundColor: theme.backgroundContent,
      borderWidth: 1,
      borderColor: theme.border,
      color: theme.text,
      fontSize: 18,
      paddingHorizontal: 10,
    },
    picker: {
      backgroundColor: theme.backgroundContent,
    },
    label: {
      fontSize: 16,
      padding: 5,
      color: theme.text,
    },
    btnSalvar: {
      backgroundColor: theme.green,
      padding: 10,
      fontSize: 16,
      fontWeight: 'bold',
      lineHeight: 26,
      color: theme.btnText,
      textAlign: 'center',
      marginTop: 30,
    },
    btnApagar: {
      marginTop: 10,
      backgroundColor: theme.red,
      padding: 10,
      fontSize: 16,
      fontWeight: 'bold',
      lineHeight: 26,
      color: theme.btnText,
      textAlign: 'center',
    },
    colorContainer: {
      height: 250,
    },
    colorPicker: {
    }
  });
};
