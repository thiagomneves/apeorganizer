import React, { useContext, useEffect, useState } from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { ThemeContext } from '../../contexts/ThemeContext';
import { formatCurrency } from '../../util/functions';
import {getTotalBalance, getAccountsByArchive} from '../../services/Accounts';
import Account from './Components/Account';

export default function Accounts() {
  const {chosenTheme} = useContext(ThemeContext);
  const navigation = useNavigation();
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState({});
  const [total, setTotal] = useState(0);

  const estilo = estilos(chosenTheme)
  const isFocused = useIsFocused()
  
  useEffect(() => {
    if (isFocused) {
      showAccounts();
      getTotal();
    }
  }, [isFocused]);

  const editorNavigate = () => {
    navigation.navigate('Editor de Contas', {selectedAccount});
  }
  
  async function getTotal() {
    const newTotal = await getTotalBalance();
    if (newTotal[0].balance) setTotal(newTotal[0].balance);
  }

  async function showAccounts() {
    const allAccounts = await getAccountsByArchive(false);
    setSelectedAccount({});
    setAccounts(allAccounts);
  }


  const renderItem = ({ item }) => (
    <Account item={item}
    selectedAccount={selectedAccount}
      setSelectedAccount={setSelectedAccount}
      editorNavigate={editorNavigate}
      />
  );
  function FooterBar() {
    return (
      <View style={estilo.footerContainer}>
        <Text style={estilo.footerText}>Saldo total</Text>
        <Text style={[estilo.footerText, {color: total >= 0 ? chosenTheme.green : chosenTheme.red}]}>
          {formatCurrency(total)}
        </Text>
      </View>
    )
  }
  return (
    <View style={estilo.container}>
      <FlatList style={{flex: 1, marginBottom: 42}}
      data={accounts}
      renderItem={ renderItem }
      keyExtractor={item => item.id} />
      <FooterBar />
      <TouchableOpacity
        style={estilo.addBtn}
        onPress={() => editorNavigate()}>
        <Text style={estilo.addBtnText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = theme => {
  const btnSize = 50;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundContainer,
    },
    addBtn: {
      position: 'absolute',
      bottom: 50,
      right: 10,
      backgroundColor: theme.green,
      width: btnSize,
      height: btnSize,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    addBtnText: {
      color: theme.white,
      fontSize: 30,
    },
    footerContainer: {
      backgroundColor: theme.backgroundContent,
      height: 42,
      borderTopWidth: 2,
      borderColor: theme.border,
      padding: 10,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    footerText: {
      color: theme.text,
      fontWeight: 'bold',
    }
  })
}

