import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TextInput, View, TouchableOpacity} from 'react-native';
import { useRoute } from '@react-navigation/native';
import ColorPicker from 'react-native-wheel-color-picker';

import { addAccount, editAccount, removeAccount } from '../../services/Accounts';
import CheckBox from './Components/CheckBox';
import Styles from '../../styles/Styles';

export default function AccountEditor({navigation }) {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#070');
  const [balance, setBalance] = useState(0);
  const [sumTotal, setSumTotal] = useState(true);
  const route = useRoute();
  const selectedAccount = route.params.selectedAccount;
  const accountToUpdate = Object.keys(selectedAccount).length > 0;
  const styles = Styles();

  useEffect(() => {
    fillEditor();
  }, [selectedAccount])

  async function saveAccount() {
    const oneAccount = {
      title: title,
      color: color, 
      balance: balance,
      sumtotal: sumTotal,
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
    <ScrollView style={styles.container}>
      <TextInput style={styles.input}
        onChangeText={title => setTitle(title)}
        placeholder="Nome"
        value={title}
      />
      <View style={styles.colorContainer}>
        <ColorPicker
          color={color}
          swatches={false}
          onColorChange={selectedColor => setColor(selectedColor)}
        />
      </View>
      <TextInput style={styles.input}
        onChangeText={balance => setBalance(balance)}
        placeholder="Saldo"
        value={balance.toString()}
        keyboardType="numeric"
      />
      <CheckBox label="Somar ao total da tela inicial" sumTotal={sumTotal} setSumTotal={setSumTotal}/>
      <TouchableOpacity onPress={() => accountToUpdate ? updateAccount() : saveAccount()}>
        <Text style={styles.btnSalvar}>Salvar</Text>
      </TouchableOpacity>
      { accountToUpdate && <TouchableOpacity onPress={() => deleteAccount()}>
        <Text style={styles.btnApagar}>Apagar Cartão</Text>
      </TouchableOpacity>}
    </ScrollView>
  );
}
