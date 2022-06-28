import React, { useContext } from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from '../../contexts/ThemeContext';
import { GlobalContext } from '../../contexts/GlobalContext';

export default function EyeBtn(props) {
  const {chosenTheme} = useContext(ThemeContext);
  const {eye, setEye} = useContext(GlobalContext);
  const estilo = estilos(chosenTheme)

  return (
    <TouchableOpacity onPress={() => setEye(!eye)} {...props}>
      <MaterialCommunityIcons style={estilo.icon} name={eye ? 'eye-outline' : 'eye-off-outline'}/>
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
