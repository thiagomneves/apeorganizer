import React, {useState} from 'react';
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { addCard } from '../../services/Cards';

export default function CardEditor({showCards}) {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#ff0');
  const [cardLimit, setCardLimit] = useState('');
  const [flag, setFlag] = useState('');

  async function saveCard() {
    const oneCard = {
      title: title,
      color: color, 
      cardLimit: cardLimit,
      flag: flag,
    }
    await addCard(oneCard)
    await showCards();
  }

  return (
    <View>
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

const estilo = StyleSheet.create({
  btnSalvar: {
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee'
  },
  label: {
    fontSize: 16,
    padding: 5,
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
