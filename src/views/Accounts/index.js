import React from 'react';
import {Text, View} from 'react-native';
import Account from './Account';



export default function Accounts() {
  return (
    <View>
      <Text>Contas</Text>
      <Account title="Carteira" value="20"/>
      <Account title="Nubank" value="400" color="#b0f"/>
      <Account title="Inter" value="-20" color="#f90"/>
    </View>
  );
}
