import React, {useContext, useEffect, useState} from 'react';
import {Dimensions,FlatList,Modal,StyleSheet,Text,TouchableOpacity,View,} from 'react-native';

import {ThemeContext} from '../../../contexts/ThemeContext';
import {getCategoriesByType} from '../../../services/Categories';

export default function CategoryPicker({type, category, setCategory}) {
  const {chosenTheme} = useContext(ThemeContext);
  const [categories, setCategories] = useState([]);
  const windowWidth = Dimensions.get('window').width;
  const [categoryTitle, setCategoryTitle] = useState('Selecione a Categoria');
  const [modalVisible, setModalVisible] = useState(false);
  const [color, setColor] = useState(false);

  const estilo = estilos({theme: chosenTheme, windowWidth});
  useEffect(() => {
    showCategories();
  }, []);

  async function showCategories() {
    const revenueCategories = await getCategoriesByType({type});
    setCategories(revenueCategories);
  }
  function updateCategory(item) {
    setColor(item.color);
    setCategoryTitle(item.title);
    setCategory(item.id);
    setModalVisible(false);
  }
  function renderItem({item}) {
    return (
      <TouchableOpacity onPress={() => updateCategory(item)} activeOpacity={1} style={estilo.categoryContent}>
        <View style={[estilo.categoryIcon, {backgroundColor: item.color}]}></View>
        <Text style={estilo.categoryTitle}>{item.title}</Text>
      </TouchableOpacity>
    )
  }
  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)} activeOpacity={1} style={estilo.categoryContent}>
        {color && <View style={[estilo.categoryIcon, {backgroundColor: color}]}></View>}
        <Text style={estilo.categoryTitle}>{categoryTitle}</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(false);
        }}>
          <TouchableOpacity onPress={() => setModalVisible(false)} activeOpacity={1}  style={estilo.modalContainer}>
            <View style={estilo.modalContent}>
              <FlatList
                data={categories}
                renderItem={renderItem}
                keyExtractor={(item, key) => key}
              />
            </View>
          </TouchableOpacity>
        </Modal>
    </>
  );
}

const estilos = ({theme, windowWidth}) => {
  const modalContentWidth = windowWidth - 40;
  const iconSize = 36;
  return StyleSheet.create({
    categoryContent: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    categoryTitle: {
      color: theme.text,
      fontSize: 18,
      paddingLeft: 15,
    },
    categoryIcon: {
      width: iconSize,
      height: iconSize,
      borderRadius: iconSize/2,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalContent: {
      position: 'absolute',
      backgroundColor: theme.backgroundContent,
      borderRadius: 6,
      padding: 10,
      width: modalContentWidth,
    },
    categoryContent: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    categoryTitle: {
      color: theme.text,
      fontSize: 18,
      paddingLeft: 15,
    },
  });
};
