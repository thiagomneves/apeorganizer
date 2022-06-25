import React from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import { setArchiveAccount } from '../../../services/Accounts';
import Styles from '../../../styles/Styles';
import { convertPriceForReal } from '../../../util/functions';

export default function AccountArchived({item, unarchive, setunarchive}) {
  const {title, balance, color} = {...item}
  const styles = Styles();

  const showConfirmDialog = () => {
    return Alert.alert(
      "Desarquivar?",
      `Tem certeza que deseja desarquivar a conta ${title}?`,
      [
        {
          text: "Sim",
          onPress: () => {
            unarchiveAccount();
          },
        },
        {
          text: "Não",
        },
      ]
    );
  };

  function unarchiveAccount() {
    const account = {
      id: item.id,
      archive: false
    }
    setArchiveAccount(account);
    setunarchive(item);
  }
  return (
    <TouchableOpacity onPress={showConfirmDialog} style={styles.accountContainer}>
      <Text style={[styles.accountIcon, {backgroundColor: color}]}></Text>
      <View style={styles.accountContent}>
        <Text style={styles.accountTitle}>{title}</Text>
        <Text style={[styles.accountBalance, balance >= 0 ? styles.colorGreen : styles.colorRed]}>{convertPriceForReal(balance)}</Text>
      </View>
    </TouchableOpacity>
  );
}
