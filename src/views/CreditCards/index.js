import React, { useContext, useEffect, useState } from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import { ThemeContext } from '../../contexts/ThemeContext';
import {getCards} from '../../services/Cards';
import CardEditor from './CardEditor';
import CreditCard from './CreditCard';

export default function CreditCards() {
  const {chosenTheme} = useContext(ThemeContext);
  const [cards, setCards] = useState([]);
  const estilo = estilos(chosenTheme)

  useEffect(() => {
    showCards()
  }, [])

  async function showCards() {
    const allCards = await getCards();
    setCards(allCards)
  }

  const renderItem = ({item}) => (
    <CreditCard
      flag={item.flag}
      title={item.title}
      color={item.color}
      cardlimit={item.cardlimit}
      spent={item.spent}
    />
  );

  return (
    <View style={estilo.container}>
      <CardEditor showCards={showCards} />
      <FlatList
        data={cards}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const estilos = theme => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundContainer,
    }
  })
}
