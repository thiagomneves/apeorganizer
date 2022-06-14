import React, { useContext } from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import { ThemeContext } from '../../contexts/ThemeContext';

import { convertPriceForReal } from '../../util/functions'

export default function Account({title, value, color}) {
  const {chosenTheme} = useContext(ThemeContext);
  const newColor = !!color ? color : '#0b8';
  const windowWidth = Dimensions.get('window').width;

  const estilo = estilos({theme: chosenTheme, color: newColor, windowWidth, value});

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

const estilos = ({theme, color, windowWidth, value}) => {
  const iconSize = 36;
  const containerPadding = 8;

  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundContent,
      padding: containerPadding,
      borderBottomWidth: 1,
      borderColor: theme.border,
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
      color: theme.text
    },
    value: {
      fontSize: 16,
      fontWeight: '500',
      color: value >= 0 ? theme.green : theme.red
    },
  });
};
