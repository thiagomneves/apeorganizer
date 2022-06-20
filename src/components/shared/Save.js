import React, { useContext } from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { SaveContext } from '../../contexts/SaveContext';
import { ThemeContext } from '../../contexts/ThemeContext';

export default function Save(props) {
  const {chosenTheme} = useContext(ThemeContext);
  const {save, setSave} = useContext(SaveContext);
  const estilo = estilos(chosenTheme)

  return (
    <TouchableOpacity onPress={() => setSave(true)} {...props}>
      <MaterialIcon style={estilo.icon} name="save"/>
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
