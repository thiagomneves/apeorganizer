import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { useRoute } from '@react-navigation/native';
import ColorPicker from 'react-native-wheel-color-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ThemeContext} from '../../contexts/ThemeContext';
import { addCategory, editCategory, removeCategory } from '../../services/Categories';

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
  function Radio(props) {
    const {type, setType, name, title} = props
    return (
        <TouchableOpacity style={estilo.radioContent} activeOpacity={1} onPress={() => setType(name)}>
          <MaterialIcons style={estilo.radioBtn} name={type == name ? 'radio-button-on' : 'radio-button-off'} />
          <Text style={estilo.radioLabel}>{title}</Text>
        </TouchableOpacity>
      )
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
        <Radio type={type} name="revenue" title="Receita" setType={setType}/>
        <Radio type={type} name="expense" title="Despesa" setType={setType}/>
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
    radioContainer: {
      flexDirection: 'row',
      backgroundColor: theme.backgroundContent,
    },
    radioContent: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    radioBtn: {
      color: theme.text,
      fontSize: 18,
      paddingRight: 5,
    },
    radioLabel: {
      color: theme.text,
      fontSize: 18,
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
  })
}
