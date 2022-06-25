import React, { useEffect, useState } from 'react';
import {FlatList, Text, View} from 'react-native';
import { getAccountsByArchive } from '../../services/Accounts';
import Styles from '../../styles/Styles';
import AccountArchived from './Components/AccountArchived';

export default function AccountsArchived() {
  const [accounts, setAccounts] = useState([]);
  const [unarchive, setunarchive] = useState({});
  const styles = Styles();

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
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Nenhuma conta arquivada</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
    {accounts.length ?
      (<FlatList style={{flex: 1,}}
        data={accounts}
        renderItem={ renderItem }
        keyExtractor={item => item.id} />
      ) : <EmptyMessage/>}
    </View>
  );
}
