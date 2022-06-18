import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { useRoute } from '@react-navigation/native';
import ColorPicker from 'react-native-wheel-color-picker';

import {ThemeContext} from '../../contexts/ThemeContext';
import { addCategory, editCategory, removeCategory } from '../../services/Categories';
import CategoryRadio from './Components/CategoryRadio'

export default function CategoryEditor({navigation }) {
  const {chosenTheme} = useContext(ThemeContext);
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#fff');
  const route = useRoute()
  const [type, setType] = useState(route.params.tabType);
  const estilo = estilos(chosenTheme);
  const selectedCategory = route.params.selectedCategory
  const categoryToUpdate = Object.keys(selectedCategory).length > 0

  useEffect(() => {
    fillEditor();
  }, [selectedCategory]);

  async function saveCategory() {
    const oneCategory = {
      title,
      color,
      type,
    };
    await addCategory(oneCategory);
    navigation.goBack();
  }

  async function updateCategory() {
    const oneCategory = {
      title,
      color,
      type,
      id: selectedCategory.id,
    }
    await editCategory(oneCategory);
    navigation.goBack();
  }

  async function deleteCategory() {
    const oneCategory = {
      id: selectedCategory.id,
    }
    await removeCategory(oneCategory);
    navigation.goBack();
  }

  function fillEditor() {
    if (categoryToUpdate) {
      setTitle(selectedCategory.title)
      setColor(selectedCategory.color)
      setType(selectedCategory.type)
    }
  }

  return (
    <ScrollView style={estilo.container}>
      <TextInput style={estilo.input}
        onChangeText={title => setTitle(title)}
        placeholder="Nome"
        value={title}
      />
      <View style={estilo.colorContainer}>
        <ColorPicker
          color={color}
          swatches={false}
          onColorChange={selectedColor => setColor(selectedColor)}
        />
      </View>
      <View style={estilo.radioContainer}>
        <CategoryRadio type={type} name="expense" title="Despesa" setType={setType}/>
        <CategoryRadio type={type} name="revenue" title="Receita" setType={setType}/>
      </View>
      <TouchableOpacity onPress={() => categoryToUpdate ? updateCategory() : saveCategory()}>
        <Text style={estilo.btnSalvar}>Salvar</Text>
      </TouchableOpacity>
      { categoryToUpdate && <TouchableOpacity onPress={() => deleteCategory()}>
        <Text style={estilo.btnApagar}>Apagar Cartão</Text>
      </TouchableOpacity>}
    </ScrollView>
  );
}

const estilos = theme => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundContainer,
      flex: 1,
    },
    input: {
      backgroundColor: theme.backgroundContent,
      borderWidth: 1,
      borderColor: theme.border,
      color: theme.text,
    },
    colorContainer: {
      height: 250,
    },

    btnSalvar: {
      backgroundColor: theme.green,
      padding: 10,
      fontSize: 16,
      fontWeight: 'bold',
      lineHeight: 26,
      color: theme.btnText,
      textAlign: 'center',
    },
    btnApagar: {
      marginTop: 10,
      backgroundColor: theme.red,
      padding: 10,
      fontSize: 16,
      fontWeight: 'bold',
      lineHeight: 26,
      color: theme.btnText,
      textAlign: 'center',
    },
    radioContainer: {
      flexDirection: 'row',
      backgroundColor: theme.backgroundContent,
    },
  })
}
