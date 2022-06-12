import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

import { convertPriceForReal } from '../../util/functions'

export default function Account({title, value, color}) {
  const newColor = !!color ? color : '#0b8';
  const windowWidth = Dimensions.get('window').width;

  const estilo = estilos(newColor, windowWidth, value);
console.log(value.toLocaleString('pt-br', {minimumFractionDigits: 2}))
  return (
    <View style={estilo.container}>
      <Text style={estilo.icon}></Text>
      <View style={estilo.content}>
        <Text style={estilo.title}>{title}</Text>
        <Text style={estilo.value}>{convertPriceForReal(value)}</Text>
      </View>
    </View>
  );
}

const estilos = (color, windowWidth, value) => {
  const iconSize = 36;
  const containerPadding = 8;

  return StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      padding: containerPadding,
      borderBottomWidth: 1,
      borderColor: '#ccc',
      flexDirection: 'row',
    },
    icon: {
      backgroundColor: color,
      width: iconSize,
      height: iconSize,
      borderRadius: 50,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      width: windowWidth  -iconSize -containerPadding,
    },
    title: {
      fontSize: 16,
      fontWeight: '500',
    },
    value: {
      fontSize: 16,
      fontWeight: '500',
      color: value >= 0 ? '#0c0' : '#f00'
    },
  });
};
