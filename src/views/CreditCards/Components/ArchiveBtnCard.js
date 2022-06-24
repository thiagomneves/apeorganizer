import React, { useContext, useEffect, useState } from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { setArchiveCard } from '../../../services/Cards';

export default function ArchiveBtnCard(props) {
  const {chosenTheme} = useContext(ThemeContext);
  const navigation = useNavigation();
  const route = useRoute();
  const selectedCard = route.params.selectedCard;
  const cardToArchive = !!Object.keys(selectedCard).length;
  const [archive, setArchive] = useState(!!selectedCard.archive);
  const estilo = estilos(chosenTheme);
  
  useEffect(() => {
    if (archive) {
      archiveCard();
    }
  },[archive])

  function archiveConfirm() {
    Alert.alert(
      "Arquivar cartão?",
      `Tem certeza que deseja arquivar o cartão? ${selectedCard.title}?`,
      [
        {
          text: "Yes",
          onPress: () => {
            setArchive(true)
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

  return (
    <View style={{display: cardToArchive ? 'flex' : 'none'}}>
      <MaterialIcon onPress={archiveConfirm} style={estilo.icon} {...props} name="archive"/>
    </View>
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
