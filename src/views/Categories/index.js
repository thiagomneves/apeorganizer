import React, { useContext, useState } from 'react';
import { useWindowDimensions, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import { ThemeContext } from "../../contexts/ThemeContext";
import CategoryList from './CategoryList';
import AddCategoryBtn from './Components/AddCategoryBtn';

export default function Categories() {
  const {chosenTheme} = useContext(ThemeContext);
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState({});
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'expense', title: 'Despesas' },
    { key: 'revenue', title: 'Receitas' },
  ]);
  
  const renderScene = SceneMap({
    expense: Expenses,
    revenue: Revenues,
  });

  function Expenses() {
    return <CategoryList type={'expense'}/>
  }

  function Revenues() {
    return <CategoryList type={'revenue'}/>
  }

  const editorNavigate = () => {
    navigation.navigate('Editor de Categorias', {selectedCategory, tabType: routes[index].key});
  }

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: chosenTheme.headerIndicator }}
      style={{ backgroundColor: chosenTheme.headerBackground }}
    />
  );

  return (
    <>
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
      initialLayout={{ width: layout.width }}
    />
    <AddCategoryBtn onPress={item => editorNavigate(item)}/>
    </>
  );
}
