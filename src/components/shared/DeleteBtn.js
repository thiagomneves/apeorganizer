import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import {Alert, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from '../../contexts/ThemeContext';
import { removeCard } from '../../services/Cards';

export default function DeleteBtn(props) {
  const {chosenTheme} = useContext(ThemeContext);
  const estilo = estilos(chosenTheme)

  const navigation = useNavigation();
  const route = useRoute();
  const selectedCard = route.params.selectedCard;
  const cardToDelete = !!Object.keys(selectedCard).length

  function deleteConfirm() {
    Alert.alert(
      "Arquivar conta?",
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

  function deleteCard() {
    const card = {
      id: selectedCard.id,
    }
    removeCard(card);
    navigation.goBack();
  }
  return (
    <TouchableOpacity onPress={() => deleteConfirm()} {...props}>
      <MaterialIcon style={estilo.icon} name="delete"/>
    </TouchableOpacity>
  );
}

const estilos = theme => {
  return StyleSheet.create({
    icon: {
      color: theme.headerTitle,
      fontSize: 24,
      paddingLeft: 5,
    }
  })
}
