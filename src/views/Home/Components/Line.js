import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Line({title, value, color}) {
  const estilo = estilos(color);

  return (
    <View style={estilo.row}>
      <Text style={estilo.cardText}>{title}</Text>
      <Text style={[estilo.cardText, estilo.value]}>{value}</Text>
    </View>
  );
}
const estilos = color => {
  return StyleSheet.create({
    cardText: {
      fontSize: 16,
      fontWeight: '500',
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
