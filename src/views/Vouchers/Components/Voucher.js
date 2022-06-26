import React, { useContext, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ThemeContext } from '../../../contexts/ThemeContext';
import { calcColorText, formatCurrency } from '../../../util/functions'

export default function Voucher({item, selectedVoucher, setSelectedVoucher, editorNavigate}) {
  const {title, balance, color, type} = {...item}
  const {chosenTheme} = useContext(ThemeContext);
  const newColor = !!color ? color : '#0b8';
  const windowWidth = Dimensions.get('window').width;
  const estilo = estilos({theme: chosenTheme, color: newColor, windowWidth, balance});

  useEffect(() => {
    if (!!selectedVoucher && Object.keys(selectedVoucher).length > 0) {
      editorNavigate()
    }
  }, [selectedVoucher])

  return (
    <TouchableOpacity 
      onPress={() => {
        setSelectedVoucher(item);
      }}
      style={estilo.container}>
      <View style={estilo.icon}></View>
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
    typeIcon: {
      color: theme.text,
      fontSize: 20,
    },
    icon: {
      backgroundColor: color,
      width: iconSize,
      height: iconSize,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
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
