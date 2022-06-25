import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Styles from '../../../styles/Styles';

export default function BorderedLine({title, value, color, description, navigate}) {
  const navigation = useNavigation();
  const styles = Styles();

  function onPress() {
    if (navigate) {
      navigation.navigate('TransactionsHomeScreen', {filter: title})
    }
  }
  
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1}>
      <View style={[styles.row, {marginTop: 5,paddingRight: 0, borderColor: color,}, styles.border]}>
        <Text style={[styles.panelText,styles.borderedLineText]}>{title}</Text>
        <Text style={[styles.panelText,styles.borderedLineText, {color: color,}, styles.value]}>{value}</Text>
      </View>
      {!!description ? <Text style={[styles.borderedLineDescription, {borderColor: color,}]}>{description}</Text> : false}
    </TouchableOpacity>
  );
}
