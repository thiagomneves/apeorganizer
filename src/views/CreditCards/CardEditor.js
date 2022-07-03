import React, { useContext, useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import { useRoute } from '@react-navigation/native';

import { ThemeContext } from '../../contexts/ThemeContext';
import { GlobalContext } from '../../contexts/GlobalContext';
import { addCard, editCard, removeCard, setArchiveCard } from '../../services/Cards';
import FlagPicker from './Components/FlagPicker';
import ColorSelector from '../../shared/ColorSelector';
import Flip from './Components/Flip';
import Card from './Components/Card';
import DayPicker from './Components/DayPicker';
import MonthYearPicker from './Components/MonthYearPicker';
import { calcColorText } from '../../util/functions';

export default function CardEditor({navigation }) {
  const [filled, setFilled] = useState(false);
  const {save, setSave, destroy, setDestroy, archive, setArchive} = useContext(GlobalContext);
  const {chosenTheme} = useContext(ThemeContext);
  const route = useRoute()
  const selectedCard = route.params.selectedCard
  const cardToUpdate = Object.keys(selectedCard).length > 0
  
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#007700');
  const [cardLimit, setCardLimit] = useState(0);
  const [flag, setFlag] = useState('Selecione a Bandeira');
  const [closureDay, setClosureDay] = useState(1);
  const [dueDay, setDueDay] = useState(1);
  const [cardTextColor, setCardTextColor] = useState('#ffffff');
  
  const [isFlipped, setIsFlipped] = useState(false);
  const [holdername, setHoldername] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');

  useEffect(() => {
    if (!filled) {
      fillEditor();
    } 
    setCardTextColor(calcColorText(color));
    if (save) savePressed();
    if (destroy) {
      deleteConfirm();
      setDestroy(false);
    }
    if (archive) {
      archiveConfirm();
      setArchive(false);
    }
  }, [selectedCard, save, color, destroy, archive])

  const estilo = estilos(chosenTheme)

  function savePressed() {
    cardToUpdate ? updateCard() : saveCard()
    setSave(false);
  }

  function deleteConfirm() {
    Alert.alert(
      "Apagar cartão?",
      `Tem certeza que deseja apagar o cartão ${selectedCard.title}?`,
      [
        {
          text: "Yes",
          onPress: () => {
            deleteCard();
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  function archiveConfirm() {
    Alert.alert(
      "Arquivar cartão?",
      `Tem certeza que deseja arquivar o cartão? ${selectedCard.title}?`,
      [
        {
          text: "Yes",
          onPress: () => {
            archiveCard()
          },
        },
        {
          text: "No",
        },
      ]
    );
  }

  function archiveCard() {
    const card = {
      id: selectedCard.id,
      archive: archive
    }
    setArchiveCard(card);
    navigation.goBack();
  }

  function deleteCard() {
    const card = {
      id: selectedCard.id,
    }
    removeCard(card);
    navigation.goBack();
  }

  async function saveCard() {
    const oneCard = {
      title: title,
      color: color, 
      cardLimit: cardLimit,
      flag: flag,
      closureDay: closureDay,
      dueDay: dueDay,
      holdername: holdername,
      cardNumber: cardNumber,
      expirationDate: expirationDate,
      cvv: cvv,
      archive: false,
      type: 'credit-card',
    }
    if (cardLimit <= 0) {
      Alert.alert('O limite é obrigatório');
      return;
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
      closureDay: closureDay,
      dueDay: dueDay,
      holdername: holdername,
      cardNumber: cardNumber,
      expirationDate: expirationDate,
      cvv: cvv,
      id: selectedCard.id,
    }
    if (cardLimit <= 0) {
      Alert.alert('O limite é obrigatório');
      return;
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
      setClosureDay(selectedCard.closureday ? selectedCard.closureday : 1)
      setDueDay(selectedCard.dueday ? selectedCard.dueday : 1)
      setHoldername(selectedCard.holdername)
      setCardNumber(selectedCard.cardnumber)
      setExpirationDate(selectedCard.expirationdate)
      setCvv(selectedCard.cvv)
      setFilled(true)
    }
  }

  return (
    <>
    <ScrollView style={estilo.container}>
      <Flip isFlipped={isFlipped} setIsFlipped={setIsFlipped} cardNumber={cardNumber} cvv={cvv} expirationDate={expirationDate}>
        <Card holdername={holdername} cardTextColor={cardTextColor} title={title} color={color} flag={flag}/>
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
        <ColorSelector calcColorText={calcColorText} cardTextColor={cardTextColor} setCardTextColor={setCardTextColor}  size={40} color={color} setColor={setColor} />
      </View>
      <View style={estilo.dayContainer}>
        <DayPicker icon={'calendar-end'} title={"Fecha dia:"} day={closureDay} setDay={setClosureDay}/>
        <DayPicker icon={'calendar-cursor'} title={"Vence dia:"} day={dueDay} setDay={setDueDay}/>
      </View>
      <TextInput style={estilo.input}
        onChangeText={holdername => setHoldername(holdername)}
        placeholder="Nome no Cartão"
        value={holdername}
      />
      </> : 
      <View>
        <TextInput style={estilo.input}
          onChangeText={cardNumber => setCardNumber(cardNumber)}
          placeholder="Número do Cartão"
          value={cardNumber.replace(/\D/g,"").replace(/(\d{4})(?!$)/g,'$1 ')}
          maxLength={19}
          keyboardType="numeric"
        />
        <View style={[estilo.dayContainer, {justifyContent: 'flex-start'}]}>
          <MonthYearPicker icon={'calendar'} title={"Data de expiração"} expirationDate={expirationDate} setExpirationDate={setExpirationDate}/>
        </View>
        <TextInput style={estilo.input}
          onChangeText={cvv => setCvv(cvv)}
          placeholder="CVV"
          maxLength={3}
          value={cvv}
          keyboardType="numeric"
        />
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
