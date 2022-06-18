import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from "../../../contexts/ThemeContext";

export default function Header() {
  const {chosenTheme} = useContext(ThemeContext);
  const estilo = estilos(chosenTheme)
  return (
    <View style={estilo.header}>
      <TouchableOpacity>
        <MaterialIcons style={estilo.headerIcon} name="keyboard-arrow-left"/>
      </TouchableOpacity>
      <Text style={estilo.headerTitle} >Junho, 2022</Text>
      <TouchableOpacity>
        <MaterialIcons style={estilo.headerIcon} name="keyboard-arrow-right"/>
      </TouchableOpacity>
    </View>
  )
}

const estilos = theme => {
  return StyleSheet.create({
    header: {
      backgroundColor: theme.headerBackground,
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 11,
    },
    headerTitle: {
      color: theme.headerTitle,
      fontSize: 20,
      fontWeight: '500',
    },
    headerIcon: {
      color: theme.headerTitle,
      fontSize: 28,
      fontWeight: 'bold',
      shadowColor: "#fff",

    },
  })
}
