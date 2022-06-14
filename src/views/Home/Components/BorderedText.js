import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ThemeContext} from '../../../contexts/ThemeContext';

export default function BorderedText({text, color}) {
  const {chosenTheme} = useContext(ThemeContext);
  const estilo = estilos({theme: chosenTheme, color});

  return (
    <View style={estilo.border}>
      <Text style={estilo.text}>{text}</Text>
    </View>
  );
}

const estilos = ({theme, color}) => {

  return StyleSheet.create({
    border: {
      borderLeftWidth: 3,
      borderColor: color,
      paddingHorizontal: 10,
    },
    text: {
      color: theme.text,
      fontSize: 30,
      fontWeight: 'bold',
    },
  });
};
