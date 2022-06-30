import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from "../../contexts/ThemeContext";

export default function RadioButton(props) {
  const {optionList, radioOn, setRadioOn} = props;
  const {chosenTheme} = useContext(ThemeContext);

  const color = typeof props.color != 'undefined' ? props.color : chosenTheme.blue;
  const estilo = estilos({theme: chosenTheme, color});

  function renderItem(item) {
    return (
      <TouchableOpacity style={estilo.content} onPress={() => setRadioOn(item)} key={item}>
        <MaterialIcons style={estilo.icon} name={item === radioOn ? "radio-button-checked" : "radio-button-off"}/>
        <Text style={estilo.label}>{optionList[item]}</Text>
      </TouchableOpacity>
    )
  }
  return (
    <View style={estilo.container}>
      {!!optionList &&
        Object.keys(optionList).length &&
        Object.keys(optionList).map(item => renderItem(item))}
    </View>
  );
}

const estilos = ({theme, color}) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
    content: {
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
