import React, { useContext } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { ThemeContext } from '../../../contexts/ThemeContext';

export default function Line({title, value, color}) {
  const {chosenTheme} = useContext(ThemeContext);
  const estilo = estilos({theme: chosenTheme, color});

  return (
    <View style={estilo.row}>
      <Text style={estilo.cardText}>{title}</Text>
      <Text style={[estilo.cardText, estilo.value]}>{value}</Text>
    </View>
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
