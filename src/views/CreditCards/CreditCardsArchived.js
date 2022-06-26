import {useIsFocused} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Message from '../../components/shared/Message';

import {ThemeContext} from '../../contexts/ThemeContext';
import {getCardsByArchive} from '../../services/Cards';

import CreditCardArchived from './Components/CreditCardArchived';

export default function CreditCardsArchived() {
  const {chosenTheme} = useContext(ThemeContext);
  const [cards, setCards] = useState([]);
  const [unarchive, setunarchive] = useState({});

  const estilo = estilos(chosenTheme);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) showCards();
  }, [isFocused, unarchive]);

  async function showCards() {
    const cardList = await getCardsByArchive(true);
    setCards(cardList);
  }

  const renderItem = ({item}) => <CreditCardArchived item={item} setunarchive={setunarchive}/>;

  return (
    <View style={estilo.container}>
      {cards.length ? (
        <FlatList
          style={{flex: 1}}
          data={cards}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      ) : (
        <Message message="Nenhum cartão arquivado"/>
      )}
    </View>
  );
}

const estilos = theme => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundContainer,
      flex: 1,
    },
  });
};
