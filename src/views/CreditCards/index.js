import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useFocusEffect, useIsFocused, useNavigation} from '@react-navigation/native';

import {ThemeContext} from '../../contexts/ThemeContext';
import {getCards} from '../../services/Cards';
import CardEditor from './CardEditor';
import CreditCard from './CreditCard';

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
    const allCards = await getCards();
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
    navigation.navigate('Editor de Cartão', {selectedCard});
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
