import React, { useEffect, useState } from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import {getTotalBalance, getAccountsByArchive} from '../../services/Accounts';
import Account from './Components/Account';
import Styles from '../../styles/Styles';

export default function Accounts() {
  const navigation = useNavigation();
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState({});
  const [total, setTotal] = useState(0);
  const styles = Styles();
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
  return (
    <View style={styles.container}>
      <FlatList style={{marginBottom: 42}}
      data={accounts}
      renderItem={ renderItem }
      keyExtractor={item => item.id} />
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Saldo total</Text>
        <Text style={[styles.footerText, total >= 0 ? styles.colorGreen : styles.colorRed]}>{total}</Text>
      </View>
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => editorNavigate()}>
        <Text style={styles.addBtnText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

