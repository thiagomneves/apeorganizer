import { useIsFocused } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import CurrencyInput from 'react-native-currency-input';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {ThemeContext} from '../../contexts/ThemeContext';
import { addShoppingListItem, getShoppingListItems } from "../../services/ShoppingListItems";
import ShoppingListItem from "./Components/ShoppingListItem";

export default function ShoppingList({navigation, route}) {
  const {chosenTheme} = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState("");
  const [shoppingList, setShoppingList] = useState([]);
  const [anyChecked, setAnychecked] = useState(false);
  const [updateList, setUpdateList] = useState(false);
  const estilo = estilos(chosenTheme);
  navigation.setOptions({headerTitle: route.params.selectedShoppingList.title,})
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getShoppingList();
      setUpdateList(false);
    }
  }, [isFocused, updateList])

  function updateCheck(list) {
    setAnychecked(false);
    list.map(item => {
      if (item.done) {
        setAnychecked(true);
      }
    });
  }

  async function getShoppingList() {
    const listItems = await getShoppingListItems(route.params.selectedShoppingList.id)
    setShoppingList(listItems);
    updateCheck(listItems);
  }

  async function addItem() {
    if (!title.length) {
      setTitleError(true);
    } else {
      const oneItem = {
        title,
        list_id: route.params.selectedShoppingList.id,
        estimatedprice: estimatedPrice,
        paidprice: false,
        done: false,
      }
      await addShoppingListItem(oneItem);
      getShoppingList();
      closeModal();
    }
  }

  function onUpdateTitle(t) {
    if (!!title.length) setTitleError(false);
    setTitle(t)
  }

  function closeModal() {
    setModalVisible(false)
    setTitle('');
    setEstimatedPrice('');
  }

  function renderItem({item}) {
    return <ShoppingListItem item={item} setUpdateList={setUpdateList}/>
  }

  function Header() {
    return anyChecked && <View><Text>Registrar?</Text></View>
  }

  return (
    <View style={estilo.container}>
      <FlatList style={{flex: 1}}
        data={shoppingList}
        renderItem={ renderItem }
        ListHeaderComponent={Header}
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
            <View style={estilo.titleContainer}>
              <TextInput
                style={[estilo.input, {flex: 1, }, titleError && {borderBottomWidth: 0, marginVertical: 0,}]}
                onChangeText={onUpdateTitle}
                value={title}
                placeholder="Nome do Item"
                placeholderTextColor={chosenTheme.weakText}
                onSubmitEditing={addItem}
                autoFocus={true}
                />
              {titleError &&
                <Text style={estilo.error}>Obrigatório</Text>
              }
            </View>
            <CurrencyInput
                style={estilo.inputValue}
                value={estimatedPrice}
                onChangeValue={setEstimatedPrice}
                prefix="R$"
                delimiter="."
                separator=","
                precision={2}
                placeholder="Preço estimado"
                placeholderTextColor={chosenTheme.weakText}
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
    titleContainer: {
      flexDirection: 'column',
    },
    input: {
      color: theme.text,
      borderBottomWidth: 1,
      borderColor: theme.border,
      marginHorizontal: 10,
      marginVertical: 10,
    },
    inputValue: {
      color: theme.text,
      borderBottomWidth: 1,
      borderColor: theme.border,
      marginHorizontal: 10,
      marginVertical: 10,
      paddingVertical: 10,
    },
    error: {
      borderTopWidth: 2,
      borderColor: theme.red,
      padding: 5, 
      fontSize: 10, 
      lineHeight: 10,
      color: theme.red,
    }
  })
}
