import React, { useState } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CardFlag from './CardFlag';

export default function Card(props) {
  const {expirationDate, cardNumber, cvv} = props
  const {color, flag, isFlipped, setIsFlipped} = props;
  const title = props.title ? props.title : '';
  const holdername = props.holdername ? props.holdername : "John Doe";

  const estilo = estilos(color)
  return (
    <View style={estilo.cardContainer}>
      <View style={estilo.cardContent}>
        {!isFlipped ? <>
        <Text style={estilo.title}>{title}</Text>
        <MaterialCommunityIcons style={estilo.chip} name="integrated-circuit-chip"/>
        <View style={estilo.flagContainer}><CardFlag flag={flag} width={70} noBg={true}/></View>
        <Text style={estilo.holdername}>{holdername.toUpperCase()}</Text></>
        :<View style={estilo.cardBack}>
          <Text style={estilo.cardNumber}>{cardNumber}</Text>
          <Text style={estilo.expiration}>07/27</Text>
          <Text style={estilo.cvv}>123</Text>
        </View>}
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
    title: {
      fontSize: 28,
      color: '#fff',
      fontWeight: '700',
      position: 'absolute',
      top: 10,
      left: 30,
    },
    flagContainer: {
      position: 'absolute',
      right: 10,
      bottom: 10,
    },
    holdername: {
      fontSize: 18,
      color: '#fff',
      fontWeight: '500',
      position: 'absolute',
      bottom: 12,
      left: 30,
    },
    chip: {
      color: '#ffb',
      fontSize: 50,
      position: 'absolute',
      top: 60,
      left: 30,
    },
    cardBack: {
      transform: [
        { rotateY: "180deg" },
      ]
    },
    cardNumber: {
      fontSize: 24,
      color: '#fff',
      fontWeight: '500',
      position: 'absolute',
      top: 12,
      left: 12,
    },
    expiration: {
      fontSize: 20,
      color: '#fff',
      fontWeight: '500',
      position: 'absolute',
      top: 150,
      left: 30,
    },
    cvv: {
      fontSize: 18,
      color: '#fff',
      fontWeight: '500',
      position: 'absolute',
      top: 150,
      right: 30,
    },
  });
};
