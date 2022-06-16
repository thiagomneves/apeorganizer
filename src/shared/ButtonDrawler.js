import React, { useContext } from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from '../contexts/ThemeContext';

export default function ButtonDrawler({onPress}) {
  const {chosenTheme} = useContext(ThemeContext);
  const estilo = estilos(chosenTheme)
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <MaterialIcon style={estilo.icon} name="menu"/>
    </TouchableOpacity>
  );
}

const estilos = theme => {
  return StyleSheet.create({
    icon: {
      marginRight: 33,
      color: theme.headerTitle,
      fontSize: 24,
    }
  })
}
