import React, { useContext } from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from '../../contexts/ThemeContext';
import { GlobalContext } from '../../contexts/GlobalContext';

export default function SaveBtn(props) {
  const {chosenTheme} = useContext(ThemeContext);
  const {save, setSave} = useContext(GlobalContext);
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
      paddingLeft: 5,
    }
  })
}
