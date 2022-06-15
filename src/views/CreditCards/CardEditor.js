import React, {useContext, useState} from 'react';
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Picker } from '@react-native-picker/picker';
import { addCard } from '../../services/Cards';
import { useRoute } from '@react-navigation/native';


export default function CardEditor({navigation }) {
  const {chosenTheme} = useContext(ThemeContext);
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#ff0');
  const [cardLimit, setCardLimit] = useState('');
  const [flag, setFlag] = useState('');

  const estilo = estilos(chosenTheme)

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

  return (
    <View style={estilo.container}>
      <TextInput style={estilo.input}
        onChangeText={title => setTitle(title)}
        placeholder="Nome do cartão"
        value={title}
      />
      <TextInput style={estilo.input}
        onChangeText={color => setColor(color)}
        placeholder="Cor do cartão"
        value={color}
      />
      <TextInput style={estilo.input}
        onChangeText={cardLimit => setCardLimit(cardLimit)}
        placeholder="Limite do cartão"
        value={cardLimit}
      />
      <View>
        <Text style={estilo.label}>Bandeira do cartão</Text>
        <Picker style={estilo.input}
        selectedValue={flag}
        onValueChange={flag => setFlag(flag)}>
          <Picker.Item label="Nenhuma" value="CreditCard" />
          <Picker.Item label="MasterCard" value="MasterCard" />
          <Picker.Item label="Visa" value="Visa" />
          <Picker.Item label="American Express" value="AmericanExpress" />
          <Picker.Item label="Elo" value="Elo" />
        </Picker>
      </View>
      <TouchableOpacity style={estilo.btnSalvar} onPress={() => saveCard()}>
        <Text style={estilo.btnSalvarTexto}>Salvar</Text>
      </TouchableOpacity>
    </View>
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
    },
    label: {
      fontSize: 16,
      padding: 5,
      color: theme.text,
    },
    btnSalvar: {
    },
    btnSalvarTexto: {
      backgroundColor: theme.green,
      padding: 10,
      fontSize: 16,
      fontWeight: 'bold',
      lineHeight: 26,
      color: theme.btnText,
      textAlign: 'center',
    },
  })
}
