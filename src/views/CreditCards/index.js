import React from 'react';
import { Text, View } from 'react-native';
import CreditCard from './CreditCard';

export default function CreditCards() {
  return (
    <View>
      <Text>Credit Cards</Text>
      <CreditCard flag="visa" bank="Nubank" color="#90f" limit="5100" spent="50"/>
      <CreditCard flag="visa" bank="Inter" color="#f90" limit="500" />
      <CreditCard flag="visa" bank="BTG" color="#00c" limit="2500" spent="2450"/>
    </View>
  );
}
