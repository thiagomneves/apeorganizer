import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {ThemeContext} from '../../contexts/ThemeContext';
import {getCards, getCardsByArchive} from '../../services/Cards';
import CreditCard from './Components/CreditCard';

export default function CreditCards() {
  const {chosenTheme} = useContext(ThemeContext);
  const navigation = useNavigation();
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const estilo = estilos(chosenTheme);
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      showCards();
    }
  }, [isFocused]);

  async function showCards() {
    const allCards = await getCardsByArchive(false);
    setSelectedCard({})
    setCards(allCards);
  }

  const renderItem = ({item}) => (
    <CreditCard
      item={item}
      selectedCard={selectedCard}
      setSelectedCard={setSelectedCard}
      editorNavigate={editorNavigate}
    />
  );

  const editorNavigate = () => {
    if (!!Object.keys(selectedCard).length) {
      navigation.navigate('Editar Cartão', {selectedCard});
    } else {
      navigation.navigate('Novo Cartão', {selectedCard});
    }
  }

  return (
    <View style={estilo.container}>
      <FlatList
        data={cards}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity
        style={estilo.addBtn}
        onPress={() => editorNavigate()}>
        <MaterialCommunityIcons style={estilo.addBtnText} name="credit-card-plus-outline"/>
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
  });
};
