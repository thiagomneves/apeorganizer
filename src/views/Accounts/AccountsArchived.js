import React, { useContext, useEffect, useState } from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
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

  function EmptyMessage() {
    return (
      <View style={estilo.empty}>
        <Text style={estilo.emptyText}>Nenhuma conta arquivada</Text>
      </View>
    )
  }
  return (
    <View style={estilo.container}>
    {accounts.length ?
      (<FlatList style={{flex: 1,}}
        data={accounts}
        renderItem={ renderItem }
        keyExtractor={item => item.id} />
      ) : <EmptyMessage/>}
    </View>
  );
}

const estilos = theme => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundContainer,
      flex: 1,
    },
    empty: {
      backgroundColor: theme.backgroundContent,
      flex: 1,
      padding: 20,
    },
    emptyText: {
      fontSize: 20,
      color: theme.text,
      textAlign: 'center',
    }    
  })
}
