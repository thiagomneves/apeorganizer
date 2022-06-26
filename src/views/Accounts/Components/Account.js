import React, { useContext, useEffect } from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { ThemeContext } from '../../../contexts/ThemeContext';

import { formatCurrency } from '../../../util/functions'

export default function Account({item, selectedAccount, setSelectedAccount, editorNavigate}) {
  const {title, balance, color} = {...item}
  const {chosenTheme} = useContext(ThemeContext);
  const newColor = !!color ? color : '#0b8';
  const windowWidth = Dimensions.get('window').width;
  const estilo = estilos({theme: chosenTheme, color: newColor, windowWidth, balance});
  useEffect(() => {
    if (!!selectedAccount && Object.keys(selectedAccount).length > 0) {
      editorNavigate()
    }
  }, [selectedAccount])

  return (
    <TouchableOpacity 
      onPress={() => {
        setSelectedAccount(item);
      }}
      style={estilo.container}>
      <Text style={estilo.icon}></Text>
      <View style={estilo.content}>
        <Text style={estilo.title}>{title}</Text>
        <Text style={estilo.balance}>{formatCurrency(balance)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const estilos = ({theme, color, windowWidth, balance}) => {
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
    balance: {
      fontSize: 16,
      fontWeight: '500',
      color: balance >= 0 ? theme.green : theme.red
    },
  });
};
