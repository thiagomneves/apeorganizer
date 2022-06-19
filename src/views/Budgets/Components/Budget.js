import React, { useContext, useEffect } from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { ThemeContext } from '../../../contexts/ThemeContext';

import {convertPriceForReal} from '../../../util/functions';

export default function Budget({item, selectedBudget, setSelectedBudget, editorNavigate}) {
  const {title, color} = item;
  const budget = item.value;
  const {chosenTheme} = useContext(ThemeContext);
  const windowWidth = Dimensions.get('window').width;
  const spent = !!item.spent ? item.spent : 0;
  const spentPercent = Math.round((spent / budget) * 100);
  const spentDecimal = spent / budget;
  const estilo = estilos({theme: chosenTheme, color, windowWidth, spentDecimal});
  useEffect(() => {
    if (Object.keys(selectedBudget).length > 0) {
      editorNavigate()
    }
  }, [selectedBudget])
  return (
    <TouchableOpacity onPress={() => setSelectedBudget(item)} style={estilo.container}>
      <View style={estilo.content}>
        <View style={estilo.line}>
          <Text style={estilo.title}>{title}</Text>
          <Text style={estilo.percent}>{spentPercent}%</Text>
        </View>
        <View style={estilo.bar}>
          <View style={estilo.barAmount}></View>
        </View>
        <View style={estilo.line}>
          <Text style={estilo.small}>Restante</Text>
          <Text style={estilo.small}>{convertPriceForReal(budget - spent)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const estilos = ({theme, color, windowWidth, spentDecimal}) => {
  const padding = 13;
  const barHeight = 5;
  const barWidth = windowWidth - 3 * padding - 2*10;

  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundContent,
      padding: padding,
      marginVertical: 5,
      borderRadius: 5,
    },
    content: {
      paddingLeft: padding,
      borderLeftWidth: 3,
      borderColor: color,
    },
    line: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    border: {
      borderColor: color,
    },
    title: {
      fontWeight: 'bold',
      marginBottom: 3,
      color: theme.text,
    },
    percent: {
      marginBottom: 3,
      color: theme.text,
    },
    bar: {
      backgroundColor: theme.weakInverse,
      height: barHeight,
      width: barWidth,
    },
    barAmount: {
      backgroundColor: theme.blue,
      width: barWidth * spentDecimal,
      height: barHeight,
    },
    small: {
      fontSize: 12,
      marginTop: 3,
      color: theme.weakText,
    }
  });
};
