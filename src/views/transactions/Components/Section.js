import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

import { ThemeContext } from "../../../contexts/ThemeContext";

export default function Section({date}) {
  const {chosenTheme} = useContext(ThemeContext);
  const estilo = estilos({theme: chosenTheme});

  return (
    <View style={estilo.sectionContainer}>
      <View style={estilo.dot}></View>
      <Text style={estilo.sectionTitle}>{date}</Text>
    </View>
  )
}

const estilos = ({theme}) => {
  return StyleSheet.create({
    sectionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 8,
    },
    sectionTitle: {
      color: theme.lightBlue,
    },
    dot: {
      backgroundColor: theme.lightBlue,
      width: 12,
      height: 12,
      borderRadius: 10,
      marginRight: 16,
    },
  })
}
