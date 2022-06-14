import React, { useContext } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { ThemeContext } from '../../contexts/ThemeContext';

export default function DailyCard({title, value, color, borderColor}) {
  const {chosenTheme} = useContext(ThemeContext);
  const newColor = !!color ? color : '#003'
  const estilo = estilos({theme: chosenTheme, color: newColor, borderColor})

  return (
    <View style={estilo.card}>
      <Text style={estilo.title}>{title}</Text>
      <Text style={estilo.value}>{value}</Text>
    </View>
  );
}

const estilos = ({theme, color, borderColor}) => {

  return StyleSheet.create({
    card: {
      backgroundColor: theme.backgroundContent,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 14,
      borderRadius: 5,
      borderTopWidth: !!borderColor ? 5 : 0,
      borderColor: !!borderColor ? theme[borderColor] : 'black',
      marginVertical: 5,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    value: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme[color],
    },
    border: {
      borderTopWidth: 1,
    }
  })
}
