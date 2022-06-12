import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function CardHeader({ title, date }) {
  return (
    <View style={estilos.row}>
      <Text style={estilos.title}>{title}</Text>
      <Text style={estilos.date}>{date}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  date: {
    fontSize: 16,
    fontWeight: '600',
  },
});
