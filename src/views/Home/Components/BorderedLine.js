import React, { useContext } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { ThemeContext } from '../../../contexts/ThemeContext';

export default function BorderedLine({title, value, color, description}) {
  const {chosenTheme} = useContext(ThemeContext);
  const estilo = estilos({theme: chosenTheme, color});

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

const estilos = ({theme, color}) => {
  return StyleSheet.create({
    cardText: {
      fontSize: 16,
      marginTop: 5,
      fontWeight: '500',
      color: theme.text,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 5,
      paddingRight: 0,
    },
    border: {
      borderLeftWidth: 3,
      paddingHorizontal: 16,
      borderColor: color,
    },
    value: {
      color: color,
    },
    description: {
      borderLeftWidth: 3,
      paddingHorizontal: 19,
      borderColor: color,
      color: theme.weakText,
      fontSize: 12,
    }
  });
};
