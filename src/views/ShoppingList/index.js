import React, { useContext, useEffect, useState } from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {ThemeContext} from '../../contexts/ThemeContext';
import { getShoppingLists } from '../../services/ShoppingLists';
import ShoppingList from './Components/ShoppingList';
import Message from '../../components/shared/Message';

export default function ShoppingLists() {
  const {chosenTheme} = useContext(ThemeContext);
  const navigation = useNavigation();
  const [lists, setLists] = useState([]);
  const [selectedShoppingList, setSelectedShoppingList] = useState({});
  const isFocused = useIsFocused();
  const estilo = estilos(chosenTheme)

  useEffect(() => {
    if (isFocused) showLists();
  },[isFocused]);

  async function showLists() {
    const newLists = await getShoppingLists();
    setLists(newLists)
  }

  const editorNavigate = () => {
    if (!!Object.keys(selectedShoppingList).length) {
      navigation.navigate('Editar Lista de Compras', {selectedShoppingList});
    } else {
      navigation.navigate('Nova Lista de Compras', {selectedShoppingList});
    }
  }

  function renderItem({item}) {
    return <ShoppingList item={item}/>;
  }

  return (
    <View style={estilo.container}>
      {!!lists.length ? (
      <FlatList style={{flex: 1, marginBottom: 42}}
      data={lists}
      renderItem={ renderItem }
      keyExtractor={item => item.id} />
      ) : <Message message="Nenhuma lista encontrada. Crie agora uma lista"/>}
      <TouchableOpacity
        style={estilo.addBtn}
        onPress={() => editorNavigate()}>
        <MaterialIcons style={estilo.addBtnText} name="playlist-add"/>
      </TouchableOpacity>
    </View>
  );
}

const estilos = theme => {
  const btnSize = 50;
  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundContainer,
      flex: 1,
    },
    addBtn: {
      position: 'absolute',
      bottom: 10,
      right: 10,
      backgroundColor: theme.green,
      width: btnSize,
      height: btnSize,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    addBtnText: {
      color: theme.white,
      fontSize: 22,
    },
  })
}
