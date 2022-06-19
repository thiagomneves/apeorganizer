import React, { useContext, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert, StyleSheet, View } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from '../contexts/ThemeContext';
import { setArchiveAccount } from '../services/Accounts';

export default function ArchiveBtn(props) {
  const {chosenTheme} = useContext(ThemeContext);
  const navigation = useNavigation();
  const route = useRoute()
  const selectedAccount = route.params.selectedAccount;
  const accountToArchive = !!Object.keys(selectedAccount).length
  const [archive, setArchive] = useState(!!selectedAccount.archive)

  useEffect(() => {
    if (archive) {
      archiveAccount();
    }
  },[archive])

  function archiveConfirm() {
    Alert.alert(
      "Arquivar conta?",
      `Tem certeza que deseja arquivar a conta ${selectedAccount.title}?`,
      [
        {
          text: "Yes",
          onPress: () => {
            setArchive(true)
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  function archiveAccount() {
    const account = {
      id: selectedAccount.id,
      archive: archive
    }
    setArchiveAccount(account);
    navigation.goBack();
  }
  const estilo = estilos(chosenTheme)
  return (
    <View style={{display: accountToArchive ? 'flex' : 'none'}}>
      <MaterialIcon onPress={archiveConfirm} style={estilo.icon} {...props} name="archive"/>
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
