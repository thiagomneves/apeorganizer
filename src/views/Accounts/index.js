import React from 'react';
import {FlatList, Text, View} from 'react-native';
import Account from './Account';

const contas = [
  {
    id: 1,
    title: 'Carteira',
    value: 20,
  },
  {
    id: 2,
    title: 'Nubank',
    value: 400,
    color: "#b0f",
  },
  {
    id: 3,
    title: 'Inter',
    value: -20,
    color: "#f80",
  },
  {
    id: 4,
    title: 'BTG',
    value: 0,
    color: "#008",
  },
  {
    id: 5,
    title: 'BMG',
    value: 0,
    color: "#f70",
  },
  {
    id: 6,
    title: 'Iti',
    value: 0,
    color: "#f88",
  },
  {
    id: 7,
    title: 'Pan',
    value: 0,
    color: "#0cf",
  },
  {
    id: 8,
    title: 'Caixa',
    value: 0,
    color: "#00d",
  },
  {
    id: 9,
    title: 'BB',
    value: 0,
    color: "#ff0",
  },
  {
    id: 10,
    title: 'Santander',
    value: 0,
    color: "#f00",
  },
  {
    id: 11,
    title: 'Bradesco',
    value: 0,
    color: "#f00",
  },
  {
    id: 12,
    title: 'Next',
    value: 0,
    color: "#6f8",
  },
  {
    id: 13,
    title: 'Itau',
    value: 0,
    color: "#f90",
  }
]

export default function Accounts() {
  const renderItem = ({ item }) => (
    <Account title={item.title} value={item.value} color={item.color}/>
  );
  return (
    <View>
      <FlatList 
      data={contas}
      renderItem={ renderItem }
      keyExtractor={item => item.id} />
    </View>
  );
}
