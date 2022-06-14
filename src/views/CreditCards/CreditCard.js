import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';

import {convertPriceForReal} from '../../util/functions';
import CardFlag from './CardFlag';

export default function CreditCard({flag, bank, limit, spent, color}) {
  const newSpent = !!spent ? spent : 0;
  const avaliable = limit - newSpent;
  const spentPercent = newSpent / limit;
  const windowWidth = Dimensions.get('window').width;
  const estilo = estilos({windowWidth, spentPercent});

  return (
    <View style={estilo.card}>
      
      <View style={estilo.header}>
        <View style={estilo.flag}>
          <CardFlag flag={flag}/>
        </View>
        <View style={estilo.title}>
          <Text style={estilo.bank}>{bank}</Text>
          <View>
            <Text style={estilo.value}>{convertPriceForReal(avaliable)}</Text>
            <Text style={estilo.avaliable}>disponível</Text>
          </View>
        </View>
      </View>
      <View style={estilo.bar}>
        <View style={estilo.barAmount}></View>
      </View>
      <View style={estilo.limitLine}>
        <Text style={estilo.limit}>{convertPriceForReal(newSpent)}</Text>
        <Text style={estilo.limit}>{convertPriceForReal(limit)}</Text>
      </View>
    </View>
  );
}

const estilos = ({windowWidth, spentPercent}) => {
  const flagWidth = 60;
  const cardPadding = 10;
  const cardSize = windowWidth - 2 * cardPadding;
  const barAmountWidth = cardSize * spentPercent;
  const barHeight = 7;

  return StyleSheet.create({
    card: {
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      paddingLeft: cardPadding,
      paddingVertical: cardPadding,
    },
    header: {
      flexDirection: 'row',
    },
    title: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: cardSize - flagWidth + cardPadding,
      paddingHorizontal: 10,
    },
    bank: {
      fontSize: 16,
      fontWeight: '600',
      alignSelf: 'center',
    },
    value: {
      fontSize: 20,
      fontWeight: '600',
    },
    avaliable: {
      alignSelf: 'flex-end',
      fontSize: 12,
    },
    flag: {
      // backgroundColor: '#eee',
      width: flagWidth,
      height: 40,
      borderRadius: 5,
    },
    bar: {
      marginTop: 12,
      backgroundColor: '#0c0',
      width: cardSize,
      height: barHeight,
    },
    barAmount: {
      backgroundColor: '#e00',
      width: barAmountWidth,
      height: barHeight,
    },
    limitLine: {
      width: cardSize,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    limit: {
      fontSize: 12,
    },
    tinyLogo: {
      width: '90%',
      height: '80%',
    },
  });
};
