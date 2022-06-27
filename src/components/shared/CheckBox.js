import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from "../../contexts/ThemeContext";

export default function CheckBox(props) {
  const {label, check, setCheck} = props;
  const {chosenTheme} = useContext(ThemeContext);

  const color = typeof props.color != 'undefined' ? props.color : chosenTheme.blue;
  const estilo = estilos({theme: chosenTheme, color});

  return <TouchableOpacity style={estilo.container} onPress={() => setCheck(!check)}>
    <MaterialIcons style={estilo.icon} name={check ? "check-box" : "check-box-outline-blank"}/>
    <Text style={estilo.label}>{label}</Text>
  </TouchableOpacity>
}

const estilos = ({theme, color}) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    icon: {
      fontSize: 26,
      marginRight: 5,
      color: color,
    },
    label: {
      fontSize: 16,
      color: theme.text,
    }
  })
}
