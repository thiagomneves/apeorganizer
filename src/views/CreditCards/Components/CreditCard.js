import React, {useContext, useEffect} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ThemeContext} from '../../../contexts/ThemeContext';

import {formatCurrency} from '../../../util/functions';
import CardFlag from '../../../components/shared/CardFlag';

export default function CreditCard({item, selectedCard, setSelectedCard, editorNavigate}) {
  const {flag, title, cardlimit, spent, color, id} = {...item};
  const {chosenTheme} = useContext(ThemeContext);
  const newSpent = !!spent ? spent : 0;
  const avaliable = cardlimit - newSpent;
  const spentPercent = newSpent / cardlimit;
  const windowWidth = Dimensions.get('window').width;
  const estilo = estilos({theme: chosenTheme, windowWidth, spentPercent});
  useEffect(() => {
    if (Object.keys(selectedCard).length > 0) {
      editorNavigate()
    }
  }, [selectedCard])

  return (
    <TouchableOpacity
      onPress={() => {
        setSelectedCard(item);
      }}
      style={estilo.card}>
      <View style={estilo.header}>
        <View style={estilo.flag}>
          <CardFlag flag={flag} />
        </View>
        <View style={estilo.title}>
          <Text style={estilo.bank}>{title}</Text>
          <View>
            <Text style={estilo.value}>{formatCurrency(avaliable)}</Text>
            <Text style={estilo.avaliable}>disponível</Text>
          </View>
        </View>
      </View>
      <View style={estilo.bar}>
        <View style={estilo.barAmount}></View>
      </View>
      <View style={estilo.limitLine}>
        <Text style={estilo.cardlimit}>{formatCurrency(newSpent)}</Text>
        <Text style={estilo.cardlimit}>{formatCurrency(cardlimit)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const estilos = ({theme, windowWidth, spentPercent}) => {
  const flagWidth = 60;
  const cardPadding = 10;
  const cardSize = windowWidth - 2 * cardPadding;
  const percent = (!isNaN(spentPercent) && spentPercent != Infinity) ? spentPercent : 0;
  const barAmountWidth = cardSize * percent;
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
