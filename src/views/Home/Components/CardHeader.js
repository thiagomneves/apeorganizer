import React, { useContext } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { ThemeContext } from '../../../contexts/ThemeContext';

export default function CardHeader({title, date}) {
  const {chosenTheme} = useContext(ThemeContext);

  const estilo = estilos(chosenTheme);
  return (
    <View style={estilo.row}>
      <Text style={estilo.title}>{title}</Text>
      <Text style={estilo.date}>{date}</Text>
    </View>
  );
}

const estilos = function (theme) {
  return StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.text,
    },
    date: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
    },
  });
};
