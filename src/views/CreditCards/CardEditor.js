import React, {useContext, useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Picker } from '@react-native-picker/picker';
import { addCard, editCard, removeCard } from '../../services/Cards';
import { useRoute } from '@react-navigation/native';
import ColorPicker from 'react-native-wheel-color-picker'


export default function CardEditor({navigation }) {
  const {chosenTheme} = useContext(ThemeContext);
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#070');
  const [cardLimit, setCardLimit] = useState(0);
  const [flag, setFlag] = useState('');
  const route = useRoute()
  const selectedCard = route.params.selectedCard
  const cardToUpdate = Object.keys(selectedCard).length > 0

  useEffect(() => {
    fillEditor()
  }, [selectedCard])

  const estilo = estilos(chosenTheme)

  async function saveCard() {
    const oneCard = {
      title: title,
      color: color, 
      cardLimit: cardLimit,
      flag: flag,
    }
    await addCard(oneCard)
    navigation.goBack()
  }

  async function updateCard() {
    const oneCard = {
      title: title,
      color: color, 
      cardLimit: cardLimit,
      flag: flag,
      id: selectedCard.id,
    }
    await editCard(oneCard)
    navigation.goBack()
  }

  async function deleteCard() {
    const oneCard = {
      title: title,
      color: color, 
      cardLimit: cardLimit,
      flag: flag,
      id: selectedCard.id,
    }
    await removeCard(oneCard)
    navigation.goBack()
  }

  function fillEditor() {
    if (cardToUpdate) {
      setTitle(selectedCard.title)
      setColor(selectedCard.color)
      setCardLimit(selectedCard.cardlimit)
      setFlag(selectedCard.flag)
    }
  }

  return (
    <ScrollView style={estilo.container}>
      <TextInput style={estilo.input}
        onChangeText={title => setTitle(title)}
        placeholder="Nome do cartão"
        value={title}
      />
      <View style={estilo.colorContainer}>
        <ColorPicker
          color={color}
          swatches={false}
          onColorChange={(selectedColor) => setColor(selectedColor)}
        />
      </View>
      <TextInput style={estilo.input}
        onChangeText={cardLimit => setCardLimit(cardLimit)}
        placeholder="Limite do cartão"
        value={cardLimit.toString()}
      />
      <View>
        <Text style={estilo.label}>Bandeira do cartão</Text>
        <Picker style={estilo.input}
        selectedValue={flag}
        onValueChange={flag => setFlag(flag)}>
          <Picker.Item label="Nenhuma" value="CreditCard" />
          <Picker.Item label="MasterCard" value="MasterCard" />
          <Picker.Item label="Visa" value="Visa" />
          <Picker.Item label="American Express" value="AmericanExpress" />
          <Picker.Item label="Elo" value="Elo" />
        </Picker>
      </View>
      <TouchableOpacity onPress={() => cardToUpdate ? updateCard() : saveCard()}>
        <Text style={estilo.btnSalvar}>Salvar</Text>
      </TouchableOpacity>
      { cardToUpdate && <TouchableOpacity onPress={() => deleteCard()}>
        <Text style={estilo.btnApagar}>Apagar Cartão</Text>
      </TouchableOpacity>}
    </ScrollView>
  );
}

const estilos = theme => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundContainer,
    },
    input: {
      backgroundColor: theme.backgroundContent,
      borderWidth: 1,
      borderColor: theme.border,
      color: theme.text,
    },
    label: {
      fontSize: 16,
      padding: 5,
      color: theme.text,
    },
    btnSalvar: {
      backgroundColor: theme.green,
      padding: 10,
      fontSize: 16,
      fontWeight: 'bold',
      lineHeight: 26,
      color: theme.btnText,
      textAlign: 'center',
    },
    btnApagar: {
      marginTop: 10,
      backgroundColor: theme.red,
      padding: 10,
      fontSize: 16,
      fontWeight: 'bold',
      lineHeight: 26,
      color: theme.btnText,
      textAlign: 'center',
    },
    colorContainer: {
      height: 250,
    },
    colorPicker: {
    }
  })
}
