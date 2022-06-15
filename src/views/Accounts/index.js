import React, { useContext, useEffect, useState } from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { ThemeContext } from '../../contexts/ThemeContext';
import {getAccounts} from '../../services/Accounts';
import Account from './Account';

export default function Accounts() {
  const {chosenTheme} = useContext(ThemeContext);
  const navigation = useNavigation();
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState({});

  const estilo = estilos(chosenTheme)
  const isFocused = useIsFocused()
  
  useEffect(() => {
    showAccounts();
  }, [isFocused]);

  const editorNavigate = () => {
    navigation.navigate('Editor de Contas', {selectedAccount});
  }

  async function showAccounts() {
    const allAccounts = await getAccounts();
    setSelectedAccount({})
    setAccounts(allAccounts);
  }


  const renderItem = ({ item }) => (
    <Account item={item}
    selectedAccount={selectedAccount}
      setSelectedAccount={setSelectedAccount}
      editorNavigate={editorNavigate}
      />
  );
  return (
    <View style={estilo.container}>
      <FlatList 
      data={accounts}
      renderItem={ renderItem }
      keyExtractor={item => item.id} />
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
      bottom: 0,
      right: 0,
      backgroundColor: theme.green,
      width: btnSize,
      height: btnSize,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
      marginBottom: 10,
    },
    addBtnText: {
      color: theme.white,
      fontSize: 30,
    },
  })
}

