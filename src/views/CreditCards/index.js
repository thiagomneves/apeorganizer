import React, { useEffect, useState } from 'react';
import {FlatList, Text, View} from 'react-native';
import {getCards} from '../../services/Cards';
import Account from '../Accounts/Account';
import CardEditor from './CardEditor';
import CreditCard from './CreditCard';

export default function CreditCards() {
  const [cards, setCards] = useState([]);

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
    <View>
      <CardEditor showCards={showCards} />
      <FlatList
        data={cards}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
