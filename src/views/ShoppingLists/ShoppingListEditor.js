import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import {ThemeContext} from '../../contexts/ThemeContext';
import {GlobalContext} from '../../contexts/GlobalContext';
import { addShoppingList } from '../../services/ShoppingLists';

export default function ShoppingListEditor({navigation}) {
  const {chosenTheme} = useContext(ThemeContext);
  const {save, setSave} = useContext(GlobalContext);
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#ffffff')
  const created = new Date();
  const isFocused = useIsFocused();
  const estilo = estilos(chosenTheme);

  useEffect(() => {
    if (save) saveShoppingList();
  }, [isFocused, save]);

  async function saveShoppingList() {
    const newList = {
      title,
      color,
      created: created.toISOString(),
      archive: false,
    }
    await addShoppingList(newList);
    setSave(false);
    navigation.goBack();
  }

  return (
    <View style={estilo.container}>
      <Text style={estilo.label}>Qual o nome da sua lista?</Text>
      <TextInput
        style={estilo.input}
        onChangeText={setTitle}
        value={title}
        autoFocus={true}
        onSubmitEditing={() => setSave(true)}
      />
    </View>
  );
}

const estilos = theme => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundContainer,
      padding: 30,
      flex: 1,
    },
    label: {
      color: theme.text,
      fontSize: 16,
    },
    input: {
      padding: 10,
      borderBottomWidth: 1,
      borderColor: theme.border,
      fontSize: 20,
      color: theme.strong,
    },
  });
};
