import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import { useRoute } from '@react-navigation/native';

import { SaveContext } from '../../contexts/SaveContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import { addCard, editCard } from '../../services/Cards';
import FlagPicker from './Components/FlagPicker';
import ColorSelector from '../../shared/ColorSelector';
import Flip from './Components/Flip';
import Card from './Components/Card';
import DayPicker from './Components/DayPicker';

export default function CardEditor({navigation }) {
  const {save, setSave} = useContext(SaveContext);
  const {chosenTheme} = useContext(ThemeContext);
  const route = useRoute()
  const selectedCard = route.params.selectedCard
  const cardToUpdate = Object.keys(selectedCard).length > 0
  
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#070');
  const [cardLimit, setCardLimit] = useState(0);
  const [flag, setFlag] = useState('Selecione a Bandeira');
  const [closureDate, setClosureDate] = useState(1);
  const [dueDate, setDueDate] = useState(1);
  
  const [isFlipped, setIsFlipped] = useState(false);
  const [holdername, setHoldername] = useState('');
  const [cardNumber, setCardNumber] = useState('0000 0000 0000 0000');
  const [expirationDate, setExpirationdate] = useState(0);
  const [cvv, setCvv] = useState('');

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

  function fillEditor() {
    if (cardToUpdate) {
      setTitle(selectedCard.title)
      setColor(selectedCard.color)
      setCardLimit(selectedCard.cardlimit)
      setFlag(selectedCard.flag)
    }
  }

  function updateClosure({date}) {
    setClosureDate(date);
    setShowClosureDatePicker(false);
  }

  function updateDue({date}) {
    setDueDate(date);
    setShowDueDatePicker(false);
  }

  return (
    <>
    <ScrollView style={estilo.container}>
      <Flip isFlipped={isFlipped} setIsFlipped={setIsFlipped} cardNumber={cardNumber} cvv={cvv} expirationDate={expirationDate}>
        <Card title={title} color={color} flag={flag}/>
      </Flip>
      {!isFlipped ? <>
      <View style={estilo.limit}>
        <Text style={estilo.labelLimit}>Limite do Cartão</Text>
        <CurrencyInput
          style={estilo.inputLimit}
          value={cardLimit}
          onChangeValue={setCardLimit}
          prefix="R$"
          delimiter="."
          separator=","
          precision={2}
        />
      </View>
      <TextInput style={estilo.input}
        onChangeText={title => setTitle(title)}
        placeholder="Nome do cartão"
        value={title}
      />
      <View style={estilo.flagColor}>
        <FlagPicker flag={flag} setFlag={setFlag}/>
        <ColorSelector size={40} color={color} setColor={setColor} />
      </View>
      <View style={estilo.dayContainer}>
        <DayPicker icon={'calendar-end'} title={"Fecha dia:"} day={closureDate} setDay={setClosureDate}/>
        <DayPicker icon={'calendar-cursor'} title={"Vence dia:"} day={dueDate} setDay={setDueDate}/>
      </View>
      </> : 
      <View>
        <TextInput style={estilo.input}
          onChangeText={cardNumber => setCardNumber(cardNumber)}
          placeholder="Número do Cartão"
          value={cardNumber}
        />
        <Text>Virou</Text>
      </View>}
    </ScrollView>
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
    flagColor: {
      flexDirection: 'row',
      paddingHorizontal: 10,
      backgroundColor: theme.backgroundContent,
    },
    dayContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: theme.backgroundContent,
    }
  })
}
