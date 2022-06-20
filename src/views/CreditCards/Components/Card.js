import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CardFlag from './CardFlag';

export default function Card(props) {
  const {color, flag} = props;
  const name = "Thiago M Neves"

  const estilo = estilos(color)
  return (
    <View style={estilo.cardContainer}>
      <View style={estilo.cardContent}>
        <MaterialCommunityIcons style={estilo.chip} name="integrated-circuit-chip"/>
        <View style={estilo.flagContainer}><CardFlag flag={flag} width={70} noBg={true}/></View>
        <Text style={estilo.client}>{name.toUpperCase()}</Text>
      </View>
    </View>
  );
}

const estilos = color => {
  return StyleSheet.create({
    cardContainer: {
      padding: 20,
    },
    cardContent: {
      backgroundColor: color,
      height: 200,
      borderRadius: 10,
    },
    flagContainer: {
      position: 'absolute',
      right: 10,
      bottom: 10,
    },
    client: {
      fontSize: 18,
      color: '#fff',
      fontWeight: '500',
      position: 'absolute',
      bottom: 10,
      left: 30,
    },
    chip: {
      color: '#ffb',
      fontSize: 50,
      position: 'absolute',
      top: 50,
      left: 30,
    }
  });
};
