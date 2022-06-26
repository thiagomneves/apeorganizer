import React, { useContext } from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {ThemeContext} from '../../../contexts/ThemeContext';

export default function ShoppingList({item}) {
  const {chosenTheme} = useContext(ThemeContext);
  const {title} = item;
  const estilo = estilos(chosenTheme)

  return (
    <TouchableOpacity style={estilo.container}>
      <View style={estilo.list}>
        <Text style={estilo.title}>{title}</Text>
        <Text style={estilo.title}>R$ 10,00</Text>
      </View>
      <View style={estilo.list}>
        <Text style={estilo.details}>2/2 Itens</Text>
        <Text style={estilo.details}>Estimativa</Text>
      </View>
    </TouchableOpacity>
  );
}

const estilos = theme => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundContent,
      flexDirection: 'column',
      marginHorizontal: 10,
      marginTop: 10,
      borderRadius: 8,
      padding: 12,
    },
    list: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 3,
    },
    title: {
      color: theme.strong,
      fontSize: 18,
    },
    details: {
      color: theme.weakText,
    }
  })
}
