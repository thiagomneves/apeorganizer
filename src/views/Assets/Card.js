import React, { useContext } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { ThemeContext } from '../../contexts/ThemeContext';

export default function Card({title, children}) {
  const {chosenTheme} = useContext(ThemeContext);
  const estilo = estilos(chosenTheme)

  return <View style={estilo.card}>
    {!!title ? <Text style={estilo.title}>{title}</Text> : false}
    {children}
    </View>;
}

const estilos = theme => {
  return StyleSheet.create({
    card: {
      backgroundColor: theme.backgroundContent,
      borderRadius: 5,
      padding: 10,
      marginVertical: 5,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
    }
  });
}
