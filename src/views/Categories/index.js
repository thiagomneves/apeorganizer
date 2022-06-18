import React, { useContext } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import { ThemeContext } from "../../contexts/ThemeContext";
import Expenses from "./Expenses";
import Revenues from "./Revenues";

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const renderScene = SceneMap({
  expense: Expenses,
  revenue: Revenues,
});

export default function Categories() {
  const {chosenTheme} = useContext(ThemeContext);
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'expense', title: 'Despesas' },
    { key: 'revenue', title: 'Receitas' },
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: chosenTheme.headerIndicator }}
      style={{ backgroundColor: chosenTheme.headerBackground }}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
      initialLayout={{ width: layout.width }}
    />
  );
}
