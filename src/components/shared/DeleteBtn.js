import React, { useContext } from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from '../../contexts/ThemeContext';
import { GlobalContext } from '../../contexts/GlobalContext';

export default function DeleteBtn(props) {
  const {chosenTheme} = useContext(ThemeContext);
  const {destroy, setDestroy} = useContext(GlobalContext);
  const estilo = estilos(chosenTheme)

  return (
    <TouchableOpacity onPress={() => setDestroy(true)} {...props}>
      <MaterialIcon style={estilo.icon} name="delete"/>
    </TouchableOpacity>
  );
}

const estilos = theme => {
  return StyleSheet.create({
    icon: {
      color: theme.headerTitle,
      fontSize: 24,
      paddingLeft: 2,
      marginHorizontal: 2,
    }
  })
}
