import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from "../../contexts/ThemeContext";
import { getCategories, getCategoriesByType } from "../../services/Categories";
import Category from "./Category";

export default function CategoryList({type}) {
  const {chosenTheme} = useContext(ThemeContext);
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const route = useRoute()
  const estilo = estilos(chosenTheme);
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      showCategories();
    }
  }, [isFocused]);
  
  async function showCategories() {
    const filteredCategories = await getCategoriesByType({type: type});
    setSelectedCategory({})
    setCategories(filteredCategories);
  }

  const editorNavigate = () => {
    navigation.navigate('Editor de Categorias', {selectedCategory, tabType: type});
  }

  const renderItem = ({item}) => (
    <Category item={item}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      editorNavigate={editorNavigate}
      />
  );
  return <View style={estilo.container}>
    <FlatList
      data={categories}
      renderItem={ renderItem }
      keyExtractor={item => item.id} />

    <TouchableOpacity onPress={item => editorNavigate(item)} style={estilo.addBtn}>
      <MaterialIcons style={estilo.addBtnIcon} name="add"/>
    </TouchableOpacity>
  </View>
}
const estilos = theme => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundContainer,
      flex: 1,
    },
    addBtn: {
      position: 'absolute',
      bottom: 10,
      right: 10,
      backgroundColor: 'blue',
      width: 50,
      height: 50,
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: "center",
    },
    addBtnIcon: {
      color: theme.white,
      fontSize: 22,
    }
  })
}
