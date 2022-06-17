import React, { useContext, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ThemeContext } from '../../contexts/ThemeContext';

export default function Category({item, selectedCategory, setSelectedCategory, editorNavigate}) {
  const {color, title } = {...item}
  const {chosenTheme} = useContext(ThemeContext);
  const windowWidth = Dimensions.get('window').width;
  const estilo = estilos({theme: chosenTheme, color, windowWidth});

  useEffect(() => {
    if (Object.keys(selectedCategory).length > 0) {
      editorNavigate()
    }
  }, [selectedCategory])

  return (
    <TouchableOpacity onPress={() => {
      setSelectedCategory(item);
    }} style={estilo.container}>
      <Text style={estilo.icon}></Text>
      <View style={estilo.content}>
        <Text style={estilo.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const estilos = ({theme, color, windowWidth}) => {
  const iconSize = 36;
  const containerPadding = 8;

  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundContent,
      padding: containerPadding,
      borderBottomWidth: 1,
      borderColor: theme.border,
      flexDirection: 'row',
    },
    icon: {
      backgroundColor: color,
      width: iconSize,
      height: iconSize,
      borderRadius: 50,
      borderWidth: color == theme.backgroundContent ? 1 : 0,
      borderColor: theme.border,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      width: windowWidth  -iconSize -containerPadding,
    },
    title: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.text
    },
  });
};
