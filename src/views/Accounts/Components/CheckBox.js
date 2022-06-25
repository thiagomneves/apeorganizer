import React, { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Styles from "../../../styles/Styles";

export default function CheckBox(props) {
  const {label, sumTotal, setSumTotal} = props;
  const styles = Styles();

  return <TouchableOpacity activeOpacity={1} style={styles.checkBoxContainer} onPress={() => setSumTotal(!sumTotal)}>
    <MaterialIcons style={styles.checkBoxIcon} name={sumTotal ? "check-box" : "check-box-outline-blank"}/>
    <Text style={styles.checkBoxLabel}>{label}</Text>
  </TouchableOpacity>
}
