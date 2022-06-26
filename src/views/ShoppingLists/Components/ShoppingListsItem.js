import React, { useContext, useEffect } from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {ThemeContext} from '../../../contexts/ThemeContext';
import { formatCurrency } from '../../../util/functions';

export default function ShoppingListItem({item, selectedShoppingList, setSelectedShoppingList, editorNavigate}) {
  const {chosenTheme} = useContext(ThemeContext);
  const {title, amount, estimated, totaldone} = item;
  const estilo = estilos(chosenTheme)
  useEffect(() => {
    if (!!selectedShoppingList && Object.keys(selectedShoppingList).length > 0) {
      editorNavigate()
    }
  }, [selectedShoppingList])

  return (
    <TouchableOpacity 
      onPress={() => {
        setSelectedShoppingList(item);
      }}
      style={estilo.container} >
      <View style={estilo.list}>
        <Text style={estilo.title}>{title}</Text>
        <Text style={estilo.title}>{formatCurrency(estimated)}</Text>
      </View>
      <View style={estilo.list}>
        <Text style={estilo.details}>{totaldone}/{amount} Itens</Text>
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
