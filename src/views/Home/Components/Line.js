import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Styles from '../../../styles/Styles';

export default function Line({title, value, color, navigate}) {
  const navigation = useNavigation();
  const styles = Styles();

  function onPress() {
    if (navigate) {
      navigation.navigate("BudgetHomeScreen");
    }
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1} style={styles.row}>
      <Text style={styles.panelText}>{title}</Text>
      <Text style={[styles.panelText, {fontSize: 16,fontWeight: '500',color: color,}]}>{value}</Text>
    </TouchableOpacity>
  );
}
