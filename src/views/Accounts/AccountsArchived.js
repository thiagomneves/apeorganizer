import React, { useContext, useEffect, useState } from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Message from '../../components/shared/Message';
import { ThemeContext } from '../../contexts/ThemeContext';
import { getAccountsByArchive } from '../../services/Accounts';
import AccountArchived from './Components/AccountArchived';

export default function AccountsArchived() {
  const {chosenTheme} = useContext(ThemeContext);
  const [accounts, setAccounts] = useState([]);
  const [unarchive, setunarchive] = useState({});
  const estilo = estilos(chosenTheme);

  useEffect(() => {
    getAccounts();
  },[unarchive]);

  async function getAccounts() {
    const allAccounts = await getAccountsByArchive(true);
    setAccounts(allAccounts);
  }

  const renderItem = ({ item }) => (
    <AccountArchived item={item} unarchive={unarchive} setunarchive={setunarchive}/>
  )

  return (
    <View style={estilo.container}>
    {accounts.length ?
      (<FlatList style={{flex: 1,}}
        data={accounts}
        renderItem={ renderItem }
        keyExtractor={item => item.id} />
      ) : <Message message="Nenhuma conta arquivada"/>}
    </View>
  );
}

const estilos = theme => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundContainer,
      flex: 1,
    },
  })
}
