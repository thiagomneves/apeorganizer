import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import CurrencyInput from 'react-native-currency-input';

import {ThemeContext} from '../../../contexts/ThemeContext';
import { checkShoppingListItem, editShoppingListItem } from "../../../services/ShoppingListItems";
import CheckBox from '../../../components/shared/CheckBox'


export default function ShoppingListItemItem({item}) {
  const {chosenTheme} = useContext(ThemeContext);
  const estilo = estilos(chosenTheme);
  const [title, setTitle] = useState(item.title);
  const [estimatedPrice, setEstimatedPrice] = useState(item.estimatedPrice);
  const [editing, setEditing] = useState(false);
  const [focusingTitle, setFocusingTitle] = useState(true);
  const [focusingPrice, setFocusingPrice] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [done, setDone] = useState(item.done)

  useEffect(() => {
    checkItem()
    if (!focusingTitle && !focusingPrice) {
      setEditing(false);
    }
  }, [done, focusingTitle, focusingPrice])


  async function checkItem () {
    const newCheck = {
      id: item.id,
      done
    }
    await checkShoppingListItem(newCheck)
  }
  function onUpdateTitle(t) {
    if (!!t.length) {
      setTitleError(false);
    } else {
      setTitleError(true);
    }
    setTitle(t)
  }
  console.log(titleError)
  async function updateItem() {
    if (!title.length) {
      setTitleError(true);
    } else {
      const oneItem = {
        title,
        estimatedprice: estimatedPrice,
        id: item.id
      }
      await editShoppingListItem(oneItem);
      setEditing(false);
    }
  }

  function setEdit() {
    setEditing(true);
  }

  return (
    <View style={estilo.itemContainer}>
      <CheckBox check={done} setCheck={setDone}/>
      {!editing ? 
      <View style={estilo.itemContent}>
        <Text onPress={setEdit}>{title}</Text>
        <Text onPress={setEdit}>{estimatedPrice}</Text>
      </View>
      :
      <View style={estilo.itemContent}>
        <View style={estilo.titleContainer}>
          <TextInput
            style={[estilo.input, {flex: 1, }, titleError && {borderBottomWidth: 0, marginVertical: 0,}]}
            onChangeText={onUpdateTitle}
            value={title}
            placeholder="Nome do Item"
            placeholderTextColor={chosenTheme.weakText}
            onSubmitEditing={updateItem}
            autoFocus={editing}
            onFocus={() => setFocusingTitle(true)}
            onBlur={() => setTimeout(() => {
              setFocusingTitle(false)
            }, 2)}
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
          onSubmitEditing={updateItem}
          onFocus={() => setFocusingPrice(true)}
          onBlur={() => setTimeout(() => {
            setFocusingPrice(false)
          }, 2)}
        />
      </View>
      }
    </View>
  )
}

const estilos = theme => {
  return StyleSheet.create({
    itemContainer: {
      marginTop: 5,
      marginHorizontal: 5,
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemContent: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: "space-between",
      paddingRight: 5,
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
