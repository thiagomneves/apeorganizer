import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {ThemeContext} from '../../contexts/ThemeContext';
import {getCards} from '../../services/Cards';
import CardEditor from './CardEditor';
import CreditCard from './CreditCard';

export default function CreditCards() {
  const {chosenTheme} = useContext(ThemeContext);
  const navigation = useNavigation();
  const [cards, setCards] = useState([]);
  const [updateCardList, setUpdateCardList] = useState(true);
  const estilo = estilos(chosenTheme);

  useEffect(() => {
    showCards();
  }, [updateCardList]);

  async function showCards() {
    const allCards = await getCards();
    setCards(allCards);
    setUpdateCardList(!updateCardList);
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
      <FlatList
        data={cards}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity
        style={estilo.addBtn}
        onPress={() => {
          setUpdateCardList(!updateCardList);
          navigation.navigate('Editor de Cartão', {});
        }}>
        <Text style={estilo.addBtnText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = theme => {
  const btnSize = 50;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundContainer,
    },
    addBtn: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: theme.green,
      width: btnSize,
      height: btnSize,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
      marginBottom: 10,
    },
    addBtnText: {
      color: theme.white,
      fontSize: 30,
    },
  });
};
