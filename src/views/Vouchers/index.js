import React, { useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { ThemeContext } from "../../contexts/ThemeContext";

export default function Vouchers({navigation}) {
  const {chosenTheme} = useContext(ThemeContext);
  const estilo = estilos(chosenTheme);

  function editorNavigate() {
    navigation.navigate("Novo Voucher")
  }
  return (
    <View style={estilo.container}>
      <Text>Vouchers</Text>
      <TouchableOpacity
        style={estilo.addBtn}
        onPress={() => editorNavigate()}>
        <MaterialCommunityIcons style={estilo.addBtnText} name="card-plus-outline"/>
      </TouchableOpacity>
    </View>
  );
}

const estilos = theme => {
  const btnSize = 50;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundContainer,
    },
    addBtn: {
      position: 'absolute',
      bottom: 10,
      right: 10,
      backgroundColor: theme.green,
      width: btnSize,
      height: btnSize,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    addBtnText: {
      color: theme.white,
      fontSize: 22,
    },
  });
};
