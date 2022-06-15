import React, {useContext} from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import {ThemeContext} from '../../contexts/ThemeContext';

export default function Config() {
  const {currentTheme, setCurrentTheme, chosenTheme } = useContext(ThemeContext);
  const estilo = estilos(chosenTheme)

  function capitalize(string) {
    const newString = string.charAt(0).toUpperCase() + string.slice(1);
    return newString
  }

  function tema(theme) {
    return theme === 'dark' ? 'Escuro' : 'Claro'
  }

  return (
    <View style={estilo.container}>
      <View style={estilo.content}>
        <Text style={estilo.title}>Tema: {tema(currentTheme)}</Text>
        <Switch
          // trackColor={{false: '#767577', true: '#81b0ff'}}
          // thumbColor={currentTheme === 'dark' ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() =>
            setCurrentTheme(currentTheme === 'dark' ? 'light' : 'dark')
          }
          value={currentTheme === 'dark'}
        />
      </View>
    </View>
  );
}
const estilos = function(theme) {

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundContainer,
    },
    content: {
      backgroundColor: theme.backgroundContent,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    title: {
      fontSize: 18,
      color: theme.text,
    }
  })
}

