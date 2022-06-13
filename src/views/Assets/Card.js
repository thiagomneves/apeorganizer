import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Card({title, children}) {
  return <View style={estilo.card}>
    {!!title ? <Text style={estilo.title}>{title}</Text> : false}
    {children}
    </View>;
}

const estilo = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  }
});
