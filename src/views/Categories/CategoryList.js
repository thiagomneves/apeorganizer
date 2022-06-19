import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../../contexts/ThemeContext";
import { getCategoriesByType } from "../../services/Categories";
import Category from "./Components/Category";

export default function CategoryList(props) {
  const {type} = props;
  const {chosenTheme} = useContext(ThemeContext);
  const navigation = useNavigation();
  const [categories, setCategories] = useState();
  const [selectedCategory, setSelectedCategory] = useState({});
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

  const renderItem = (props) => (
    <Category 
      {...props}
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
  </View>
}
const estilos = theme => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundContainer,
      flex: 1,
    },
  })
}
