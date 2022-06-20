import React, { useContext } from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from '../../contexts/ThemeContext';

export default function ArchivedBtn(props) {
  const {chosenTheme} = useContext(ThemeContext);
  const estilo = estilos(chosenTheme)
  return (
    <TouchableOpacity {...props}>
      <MaterialIcon style={estilo.icon} name="archive"/>
    </TouchableOpacity>
  );
}

const estilos = theme => {
  return StyleSheet.create({
    icon: {
      color: theme.headerTitle,
      fontSize: 24,
    }
  })
}
