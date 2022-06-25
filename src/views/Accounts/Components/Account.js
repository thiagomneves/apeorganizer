import React, { useEffect } from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Styles from '../../../styles/Styles';
import { convertPriceForReal } from '../../../util/functions'

export default function Account({item, selectedAccount, setSelectedAccount, editorNavigate}) {
  const {title, balance, color} = {...item}
  const styles = Styles();
  useEffect(() => {
    if (!!selectedAccount && Object.keys(selectedAccount).length > 0) {
      editorNavigate()
    }
  }, [selectedAccount])

  return (
    <TouchableOpacity 
      onPress={() => {
        setSelectedAccount(item);
      }}
      style={styles.accountContainer}>
      <Text style={[styles.accountIcon, {backgroundColor: color}]}></Text>
      <View style={styles.accountContent}>
        <Text style={styles.accountTitle}>{title}</Text>
        <Text style={[styles.accountBalance, balance >= 0 ? styles.colorGreen : styles.colorRed]}>{convertPriceForReal(balance)}</Text>
      </View>
    </TouchableOpacity>
  );
}
