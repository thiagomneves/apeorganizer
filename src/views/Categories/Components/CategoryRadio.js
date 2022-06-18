import React, { useContext } from "react"
import { StyleSheet, Text, TouchableOpacity } from "react-native"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from "../../../contexts/ThemeContext";

export default function CategoryRadio(props) {
  const {chosenTheme} = useContext(ThemeContext);
  const estilo = estilos(chosenTheme);
  const {type, setType, name, title} = props
  return (
      <TouchableOpacity style={estilo.radioContent} activeOpacity={1} onPress={() => setType(name)}>
        <MaterialIcons style={estilo.radioBtn} name={type == name ? 'radio-button-on' : 'radio-button-off'} />
        <Text style={estilo.radioLabel}>{title}</Text>
      </TouchableOpacity>
    )
}
const estilos = theme => {
  return StyleSheet.create({
    radioContent: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    radioBtn: {
      color: theme.text,
      fontSize: 18,
      paddingRight: 5,
    },
    radioLabel: {
      color: theme.text,
      fontSize: 18,
    },
  })
}
