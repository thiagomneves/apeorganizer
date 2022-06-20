import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import { useRoute } from '@react-navigation/native';
import ColorPicker from 'react-native-wheel-color-picker'

import { ThemeContext } from '../../contexts/ThemeContext';
import { addCard, editCard, removeCard } from '../../services/Cards';
import FlagPicker, { FlagModal } from './Components/FlagPicker';
import { SaveContext } from '../../contexts/SaveContext';

export default function CardEditor({navigation }) {
  const {save, setSave} = useContext(SaveContext);
  const {chosenTheme, currentTheme} = useContext(ThemeContext);
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#070');
  const [cardLimit, setCardLimit] = useState(0);
  const [flag, setFlag] = useState('Selecione a Bandeira');
  const route = useRoute()
  const selectedCard = route.params.selectedCard
  const cardToUpdate = Object.keys(selectedCard).length > 0
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fillEditor()
    if (save) savePressed()
  }, [selectedCard, save])

  const estilo = estilos(chosenTheme)

  function savePressed() {
    cardToUpdate ? updateCard() : saveCard()
    setSave(false);
  }

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
    <>
    <ScrollView style={estilo.container}>
      <View style={estilo.limit}>
        <Text style={estilo.labelLimit}>Limite do Cartão</Text>
        <CurrencyInput
          style={estilo.inputLimit}
          value={cardLimit}
          onChangeValue={setCardLimit}
          prefix="R$"
          delimiter=","
          separator="."
          precision={2}
        />
      </View>
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
      <FlagPicker flag={flag} setModalVisible={setModalVisible} />
    </ScrollView>
    <FlagModal setFlag={setFlag} modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </>
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
      fontSize: 18,
      paddingHorizontal: 10,
    },
    label: {
      fontSize: 16,
      padding: 5,
      color: theme.text,
    },
    limit: {
      backgroundColor: theme.backgroundContent,
      padding: 10,
    },
    labelLimit: {
      fontSize: 16,
      padding: 5,
      color: theme.strong,
      fontSize: 20,
    },
    inputLimit: {
      color: theme.text,
      fontSize: 28,
      fontWeight: '600',
    },
    colorContainer: {
      height: 250,
    },
    colorPicker: {
    }
  })
}
