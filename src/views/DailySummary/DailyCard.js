import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function DailyCard({title, value, color, borderColor}) {

  const newColor = !!color ? color : '#003'
  const estilo = estilos(newColor, borderColor)

  return (
    <View style={estilo.card}>
      <Text style={estilo.title}>{title}</Text>
      <Text style={estilo.value}>{value}</Text>
    </View>
  );
}

const estilos = (color, borderColor) => {
  return StyleSheet.create({
    card: {
      backgroundColor: '#fff',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 14,
      borderRadius: 5,
      borderTopWidth: !!borderColor ? 5 : 0,
      borderColor: !!borderColor ? borderColor : 'black',
      marginVertical: 5,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    value: {
      fontSize: 16,
      fontWeight: 'bold',
      color: color,
    },
    border: {
      borderTopWidth: 1,
    }
  })
}
