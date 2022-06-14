import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { addCard } from '../../services/Cards';

async function saveCard() {
  const oneCard = {
    title: "BB",
    color: "#ff0", 
    cardLimit: 300,
    flag: "MasterCard",
  }
  await addCard(oneCard)
  // console.log(oneCard)
}

export default function CardEditor() {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('');
  const [cardLimit, setCardLimit] = useState('');
  const [flag, setFlag] = useState('');

  // console.log(flag)
  return (
    <View>
      <TextInput
        onChangeText={title => setTitle(title)}
        placeholder="Nome do cartão"
      />
      <TextInput
        onChangeText={color => setColor(color)}
        placeholder="Cor do cartão"
      />
      <TextInput
        onChangeText={cardLimit => setCardLimit(cardLimit)}
        placeholder="Limite do cartão"
      />
      <View>
        <Text>Bandeira do cartão</Text>
        <Picker
        selectedValue=""
        onValueChange={flag => setFlag(flag)}>
          <Picker.Item label="Nenhuma" value="CreditCard" />
          <Picker.Item label="MasterCard" value="MasterCard" />
          <Picker.Item label="Visa" value="Visa" />
          <Picker.Item label="American Express" value="American Express" />
          <Picker.Item label="Elo" value="Elo" />
        </Picker>
      </View>
      <TextInput
        onChangeText={flag => setFlag(flag)}
        placeholder="Bandeira do cartão"
      />
      <TouchableOpacity style={estilo.btnSalvar} onPress={() => saveCard()}>
        <Text style={estilo.btnSalvarTexto}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilo = StyleSheet.create({
  btnSalvar: {
  },
  btnSalvarTexto: {
    backgroundColor: '#090',
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 26,
    color: '#fff',
    textAlign: 'center',
  },
})
