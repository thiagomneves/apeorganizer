import React, { useContext } from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import { ThemeContext } from '../../contexts/ThemeContext';

import {convertPriceForReal} from '../../util/functions';
import CardFlag from './CardFlag';

export default function CreditCard({flag, title, cardlimit, spent, color}) {
  const {chosenTheme} = useContext(ThemeContext);
  const newSpent = !!spent ? spent : 0;
  const avaliable = cardlimit - newSpent;
  const spentPercent = newSpent / cardlimit;
  const windowWidth = Dimensions.get('window').width;
  const estilo = estilos({theme: chosenTheme, windowWidth, spentPercent});

  return (
    <View style={estilo.card}>
      
      <View style={estilo.header}>
        <View style={estilo.flag}>
          <CardFlag flag={flag}/>
        </View>
        <View style={estilo.title}>
          <Text style={estilo.bank}>{title}</Text>
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
        <Text style={estilo.cardlimit}>{convertPriceForReal(newSpent)}</Text>
        <Text style={estilo.cardlimit}>{convertPriceForReal(cardlimit)}</Text>
      </View>
    </View>
  );
}

const estilos = ({theme, windowWidth, spentPercent}) => {
  const flagWidth = 60;
  const cardPadding = 10;
  const cardSize = windowWidth - 2 * cardPadding;
  const barAmountWidth = cardSize * spentPercent;
  const barHeight = 7;

  return StyleSheet.create({
    card: {
      backgroundColor: theme.backgroundContent,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
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
      color: theme.text,
    },
    value: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.text,
    },
    avaliable: {
      alignSelf: 'flex-end',
      fontSize: 12,
      color: theme.weakText,
    },
    flag: {
      width: flagWidth,
      height: 40,
      borderRadius: 5,
    },
    bar: {
      marginTop: 12,
      backgroundColor: theme.green,
      width: cardSize,
      height: barHeight,
    },
    barAmount: {
      backgroundColor: theme.red,
      width: barAmountWidth,
      height: barHeight,
    },
    limitLine: {
      width: cardSize,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    cardlimit: {
      fontSize: 12,
      color: theme.weakText,
    },
    tinyLogo: {
      width: '90%',
      height: '80%',
    },
  });
};
