import React, { useContext, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from '../contexts/ThemeContext';
import { getAccount, getAccounts, setArchiveAccount } from '../services/Accounts';

export default function ArchiveBtn(props) {
  const {chosenTheme} = useContext(ThemeContext);
  const route = useRoute()
  const selectedAccount = route.params.selectedAccount;
  const accountToArchive = !!Object.keys(selectedAccount).length
  const [archive, setArchive] = useState(selectedAccount.archive)

  useEffect(() => {
    archiveAccount()
  },[archive])

  function archiveAccount() {
    const account = {
      id: selectedAccount.id,
      archive: archive
    }
    setArchiveAccount(account)
  }
  const estilo = estilos(chosenTheme)
  return (
    <View style={{display: accountToArchive ? 'flex' : 'none'}}>
      <MaterialIcon onPress={() => setArchive(!archive)} style={estilo.icon} {...props} name="archive"/>
    </View>
  );
}

const estilos = theme => {
  return StyleSheet.create({
    icon: {
      color: theme.headerTitle,
      fontSize: 24,
    }
  })
}
