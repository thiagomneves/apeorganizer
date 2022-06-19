import React, {useContext, useEffect, useState} from 'react';
import {FlatList, Modal, ScrollView,StyleSheet,Text,TouchableOpacity,View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ThemeContext} from '../../contexts/ThemeContext';
import { getExpenseCategoriesWithoutBudget } from '../../services/Categories';
import { addBudget, editBudget, removeBudget } from '../../services/Budgets';

export default function BudgetEditor() {
  const {chosenTheme} = useContext(ThemeContext);
  const [value, setValue] = useState();
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const estilo = estilos({theme: chosenTheme});
  const route = useRoute();
  const selectedBudget = route.params.selectedBudget;
  const budgetToUpdate = Object.keys(selectedBudget).length > 0;
  const navigation = useNavigation()
  useEffect(() => {
    if (!categories) getCat();
    if ((typeof category == 'undefined') && (typeof categories != 'undefined' && categories.length != 0)) {
      setCategory(categories[0])
    }
    fillEditor();
  }, [categories])

  async function getCat() {
    const cat = await getExpenseCategoriesWithoutBudget();
    setCategories(cat);
  }
  async function saveBudget() {
    const newBudget = {
      category: category.id,
      value: value,
    }
    addBudget(newBudget);
    navigation.goBack();
  }
  async function updateBudget() {
    const newBudget = {
      value: value,
      id: selectedBudget.id
    }
    editBudget(newBudget);
    navigation.goBack();
  }
  async function deleteBudget() {
    const newBudget = {
      id: selectedBudget.id
    }
    removeBudget(newBudget);
    navigation.goBack();
  }

  function fillEditor() {
    if (budgetToUpdate) {
      setValue(selectedBudget.value.toString())
      setCategory(selectedBudget.category)
    }
  }

  function selectAndClose(item) {
    setCategory(item)
    setModalVisible(false)
  }
  function renderCategories({item}) {
    const modalItemContainer = {flexDirection: 'row', alignItems: 'center'};
    const modalItemThumb = {backgroundColor: item.color, width: 30, height: 30, borderRadius: 30, margin: 4};
    const modalItemTitle = {fontSize: 18};
    return <TouchableOpacity onPress={() => selectAndClose(item)} key={item.id} style={modalItemContainer}>
      <View style={modalItemThumb}></View>
      <Text style={modalItemTitle}>{item.title}</Text>
    </TouchableOpacity>
  }
  return (
    <>
      <ScrollView style={estilo.container}>
        <View style={estilo.label}>
          <Text style={estilo.labelText}>Qual é a sua meta? </Text>
          <Text style={[estilo.labelText, estilo.labelDate]}>Junho, 2022 </Text>
        </View>
        <TextInput
          style={estilo.input}
          onChangeText={value => setValue(value)}
          placeholder="Valor do Orçamento"
          value={value}
          keyboardType="numeric"
        />
        <View style={estilo.label}>
          <Text style={estilo.labelText}>Selecione uma categoria</Text>
        </View>
        <TouchableOpacity activeOpacity={budgetToUpdate ? 1 : 0} onPress={() => !budgetToUpdate && setModalVisible(true)} style={estilo.categoryContainer}>
          <View style={estilo.categoryContent}>
            <View style={[estilo.categoryThumb, {backgroundColor: budgetToUpdate? selectedBudget.color:category?.color, borderRadius: 30,}]}></View>
            <Text style={estilo.categoryTitle}>{budgetToUpdate ? selectedBudget.title : (typeof category != 'undefined' ? category?.title : 'Cadastre uma categoria')}</Text>
          </View>
          <MaterialCommunityIcons style={estilo.categoryCaret} name="menu-down"/>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => (budgetToUpdate ? updateBudget() : saveBudget())}>
          <Text style={estilo.btnSalvar}>Salvar</Text>
        </TouchableOpacity>
        {budgetToUpdate && (
          <TouchableOpacity onPress={() => deleteBudget()}>
            <Text style={estilo.btnApagar}>Apagar Orçamento</Text>
          </TouchableOpacity>
        )}

        
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        >
        
        <TouchableOpacity onPress={() => setModalVisible(false)} style={estilo.modalContainer}>
          <View style={estilo.modalContent}>
            <FlatList
              data={categories}
              renderItem={ renderCategories }
              keyExtractor={item => item.id} />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const estilos = ({theme}) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundContainer,
    },
    label: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
    },
    labelText: {
      flex: 1,
      color: theme.text,
      fontSize: 18,
      padding: 8,
      fontWeight: 'bold',
    },
    labelDate: {
      textAlign: 'right',
    },
    input: {
      color: theme.text,
      paddingHorizontal: 10,
    },
    categoryContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      marginBottom: 30,
    },
    categoryContent: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
    },
    categoryTitle: {
      color: theme.text,
      fontSize: 18,
      padding: 10,
    },
    categoryThumb: {
      width: 40,
      height: 40,
      backgroundColor: '#000',
      borderRadius: 30,
    },
    categoryCaret: {
      color: theme.text,
      fontSize: 30,
      alignSelf: 'center',
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
    modalContainer: {
      flex: 1, 
      justifyContent: 'center'
    },
    modalContent: {
      backgroundColor: '#fff', 
      margin: 10, 
      padding: 10, 
      borderRadius: 8
    },
  });
};
