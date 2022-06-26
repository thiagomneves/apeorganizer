import React, { useContext, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

import { ThemeContext } from "../../contexts/ThemeContext";
import VoucherTypePicker from "./Components/VoucherTypePicker";

export default function VoucherEditor({navigation}) {
  const {chosenTheme} = useContext(ThemeContext);
  const [type, setType] = useState();
  const estilo = estilos(chosenTheme);

  return <View>
    <Text>Novo voucher</Text>
    <VoucherTypePicker setType={setType}/>
  </View>
}

const estilos = theme => {
  return StyleSheet.create({

  })
}
