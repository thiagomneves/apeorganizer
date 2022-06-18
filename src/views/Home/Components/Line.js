import React, { useContext } from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../../contexts/ThemeContext';

export default function Line({title, value, color, navigate}) {
  const {chosenTheme} = useContext(ThemeContext);
  const navigation = useNavigation();
  const estilo = estilos({theme: chosenTheme, color});

  function onPress() {
    if (navigate) {
      navigation.navigate("BudgetHomeScreen");
    }
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1} style={estilo.row}>
      <Text style={estilo.cardText}>{title}</Text>
      <Text style={[estilo.cardText, estilo.value]}>{value}</Text>
    </TouchableOpacity>
  );
}
const estilos = ({theme, color}) => {
  return StyleSheet.create({
    cardText: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.text,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    value: {
      fontSize: 16,
      fontWeight: '500',
      color: color,
    }
  });
};
