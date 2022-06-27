import React, {useContext} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

import {ThemeContext} from '../../contexts/ThemeContext';

export default function RegisterChecked({navigation, route}) {
  const {chosenTheme} = useContext(ThemeContext);
  const estilo = estilos(chosenTheme);
  const shoppingList = route.params.shoppingList;

  function renderItem({item}) {
    if (item.done) {
      return (
        <View>
          <Text>{item.title}</Text>
          <Text>{item.estimatedprice}</Text>
        </View>
      );
    }
  }
  function Header() {
    return (
      <View>
        <Text>Criar registro</Text>
        <Text>Pagar com (conta/cartão/voucher)</Text>
        <Text>Picker para a opção escolhida</Text>
        <Text>Picker para categoria</Text>
        <Text>Valor total pago (opção para detalhar)</Text>
      </View>
    );
  }
  return (
    <View style={estilo.container}>
      <FlatList
        data={shoppingList}
        renderItem={renderItem}
        ListHeaderComponent={Header}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const estilos = theme => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundContainer,
      flex: 1,
    },
  });
};
