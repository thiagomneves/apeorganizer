import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from '../../../contexts/ThemeContext';

export default function AddCategoryBtn(props) {
  const {chosenTheme} = useContext(ThemeContext);
  const estilo = estilos(chosenTheme);

  return (
    <TouchableOpacity
      {...props}
      style={estilo.addBtn}>
      <MaterialIcons style={estilo.addBtnIcon} name="add" />
    </TouchableOpacity>
  );
}
const estilos = theme => {
  return StyleSheet.create({
    addBtn: {
      position: 'absolute',
      bottom: 10,
      right: 10,
      backgroundColor: 'blue',
      width: 50,
      height: 50,
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: "center",
    },
    addBtnIcon: {
      color: theme.white,
      fontSize: 22,
    }
  })
}
