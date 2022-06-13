import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {convertPriceForReal} from '../../util/functions'

const types = {
  "BTC": {
    price: 139425.34,
  }
}

export default function Asset({title, balance, unity, color, type}) {
  const estilo = estilos(color);
  const newBalance = !!balance ? balance : (!!type ? types[type].price*unity : '')

  return (
    <View style={estilo.border}>
      <View style={estilo.row}>
        <Text style={estilo.title}>{title}</Text>
        <Text style={estilo.balance}>{convertPriceForReal(newBalance)}</Text>
      </View>
      { !!unity ? <Text style={estilo.unity}>{unity}</Text> : false}
    </View>
  );
}

const estilos = color => {
  return StyleSheet.create({
    border: {
      borderLeftWidth: 3,
      borderColor: color,
      paddingLeft: 10,
      marginVertical: 4,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 16,
      fontWeight: '500',
    },
    balance: {
      fontWeight: '500'
    },
    unity: {
      alignSelf: 'flex-end',
    },
  });
};
