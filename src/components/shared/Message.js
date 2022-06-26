import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

import {ThemeContext} from '../../contexts/ThemeContext';

export default function Message({message}) {
  const {chosenTheme} = useContext(ThemeContext);
  const estilo = estilos(chosenTheme);
  return (
    <View style={estilo.empty}>
      <Text style={estilo.emptyText}>{message}</Text>
    </View>
  );
}

const estilos = theme => {
  return StyleSheet.create({
    empty: {
      backgroundColor: theme.backgroundContent,
      flex: 1,
      padding: 20,
    },
    emptyText: {
      fontSize: 20,
      color: theme.text,
      textAlign: 'center',
    },
  });
};
