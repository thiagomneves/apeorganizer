import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function BorderedText({text, color}) {
  const estilo = estilos(color);

  return (
    <View style={estilo.border}>
      <Text style={estilo.text}>{text}</Text>
    </View>
  );
}

const estilos = color => {
  return StyleSheet.create({
    border: {
      borderLeftWidth: 3,
      borderColor: color,
      paddingHorizontal: 10
    },
    text: {
      fontSize: 30,
      fontWeight: 'bold',
    },
  });
};
