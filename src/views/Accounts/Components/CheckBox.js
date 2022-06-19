import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from "../../../contexts/ThemeContext";

export default function CheckBox(props) {
  const {label, sumTotal, setSumTotal} = props;
  const {chosenTheme} = useContext(ThemeContext);
  const estilo = estilos(chosenTheme);

  return <TouchableOpacity style={estilo.container} onPress={() => setSumTotal(!sumTotal)}>
    <MaterialIcons style={estilo.icon} name={sumTotal ? "check-box" : "check-box-outline-blank"}/>
    <Text style={estilo.label}>{label}</Text>
  </TouchableOpacity>
}

const estilos = theme => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    icon: {
      fontSize: 26,
      marginRight: 5,
      color: theme.blue,
    },
    label: {
      fontSize: 16,
      color: theme.text,
    }
  })
}