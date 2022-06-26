import React from 'react';
import {Text, View} from 'react-native';

import {ThemeContext} from '../../../contexts/ThemeContext';

export default function ShoppingListItem() {
  const {chosenTheme} = useContext(ThemeContext);

  const estilo = estilos(chosenTheme)
  
  return (
    <View>
      <Text>Teste</Text>
    </View>
  );
}

const estilos = theme => {
  return StyleSheet.create({

  })
}

