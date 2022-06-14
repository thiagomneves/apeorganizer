import React, {useContext} from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import {ThemeContext} from '../../contexts/ThemeContext';

export default function Config() {
  const {currentTheme, setCurrentTheme, chosenTheme } = useContext(ThemeContext);
  const estilo = estilos(chosenTheme)

  return (
    <View style={estilo.container}>
      <Text>{currentTheme}</Text>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={currentTheme === 'dark' ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() =>
          setCurrentTheme(currentTheme === 'dark' ? 'light' : 'dark')
        }
        value={currentTheme === 'dark'}
      />
    </View>
  );
}
const estilos = function(theme) {

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundContainer,
    }
  })
}
