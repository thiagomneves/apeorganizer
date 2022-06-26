import { useIsFocused } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, Modal, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {ThemeContext} from '../../contexts/ThemeContext';
import { addShoppingListItem, getShoppingListItems } from "../../services/ShoppingListItems";
import ShoppingListItemItem from "./Components/ShoppingListItemItem";

export default function ShoppingList({navigation, route}) {
  const {chosenTheme} = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState("");
  const [shoppingList, setShoppingList] = useState([]);
  const estilo = estilos(chosenTheme)
  navigation.setOptions({headerTitle: route.params.selectedShoppingList.title,})
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) getShoppingList();
  }, [isFocused])

  async function getShoppingList() {
    const listItems = await getShoppingListItems(route.params.selectedShoppingList.id)
    setShoppingList(listItems);
  }

  async function addItem() {
    const oneItem = {
      title,
      list_id: route.params.selectedShoppingList.id,
      estimatedprice: estimatedPrice,
      paidprice: false,
      done: false,
    }
    await addShoppingListItem(oneItem);
    setModalVisible(false);
  }

  function closeModal() {
    setModalVisible(false)
    setTitle('');
    setEstimatedPrice('');
  }

  function renderItem({item}) {
    return <ShoppingListItemItem item={item}/>
  }

  return (
    <View style={estilo.container}>
      <FlatList style={{flex: 1, marginBottom: 42}}
        data={shoppingList}
        renderItem={ renderItem }
        keyExtractor={item => item.id} />
      <TouchableOpacity
        style={estilo.addBtn}
        onPress={() => setModalVisible(true)}>
        <MaterialIcons style={estilo.addBtnText} name="playlist-add"/>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
        >
        <TouchableOpacity activeOpacity={1} style={estilo.modalContainer} onPress={closeModal}>
          <View style={estilo.modalContent}>
            <TextInput
              style={[estilo.input, {flex: 1}]}
              onChangeText={setTitle}
              value={title}
              placeholder="Nome do Item"
              onSubmitEditing={addItem}
              autoFocus={true}
              />
            <TextInput
              style={estilo.input}
              onChangeText={setEstimatedPrice}
              value={estimatedPrice}
              placeholder="Preço estimado"
              keyboardType="numeric"
              onSubmitEditing={addItem}
              />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

const estilos = theme => {
  const btnSize = 50;
  return StyleSheet.create({
    container: {
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
    modalContainer: {
      backgroundColor: 'rgba(0,0,0,0.3)',
      flex: 1,
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: theme.backgroundContent,
      flexDirection: 'row',
      justifyContent: "space-around",
      paddingHorizontal: 10,
    },
    input: {
      borderBottomWidth: 1,
      borderColor: theme.border,
      marginBottom: 15,
      marginHorizontal: 10
    }
  })
}
