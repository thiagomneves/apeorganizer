import React, { useContext } from 'react';
import {StyleSheet, Text, View} from 'react-native';

import { ThemeContext } from '../../contexts/ThemeContext';
import BtnContainer from './BtnContainer';


export default function Transactions() {
  const {chosenTheme} = useContext(ThemeContext);

  const estilo = estilos({theme: chosenTheme});
  return (
    <View style={estilo.container}>
      <Text onPress={() => console.log('clicou no teste')}>teste</Text>


      <BtnContainer/>
    </View>
  );
}
const estilos = ({theme, showMinorBtn, windowHeight, windowWidth}) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundContainer,
      flex: 1,
    },
  })
}
