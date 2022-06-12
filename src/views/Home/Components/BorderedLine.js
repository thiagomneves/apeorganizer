import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function BorderedLine({title, value, color, description}) {
  const estilo = estilos(color);

  return (
    <>
      <View style={[estilo.row, estilo.border]}>
        <Text style={estilo.cardText}>{title}</Text>
        <Text style={[estilo.cardText, estilo.value]}>{value}</Text>
      </View>
      {!!description ? <Text style={estilo.description}>{description}</Text> : false}
    </>
  );
}

const estilos = color => {
  return StyleSheet.create({
    cardText: {
      fontSize: 16,
      marginTop: 5,
      fontWeight: '500',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 5,
      paddingRight: 0,
    },
    border: {
      borderLeftWidth: 3,
      paddingHorizontal: 10,
      borderColor: color,
    },
    value: {
      color: color,
    },
    description: {
      borderLeftWidth: 3,
      paddingHorizontal: 10,
      borderColor: color,
      color: '#aaa',
      fontSize: 12,
    }
  });
};
