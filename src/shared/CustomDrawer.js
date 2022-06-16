import React, { useContext } from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { ThemeContext } from '../contexts/ThemeContext';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function CustomDrawer(props) {
  const {chosenTheme} = useContext(ThemeContext);
  const estilo = estilos(chosenTheme)

  return (
    <View style={estilo.container}>
        <View style={estilo.header}>
        <Text style={estilo.headerText}>ApeOrganizer beta</Text>
      </View>
      <DrawerContentScrollView contentContainerStyle={estilo.drawlerContent} {...props}>
        <View style={estilo.profileContainer}>
          <Image style={estilo.profileImage} source={require('../assets/images/rafiki.png')} />
          <Text style={estilo.profileText}>Rafiki</Text>
        </View>
        <DrawerItemList {...props}/>
      </DrawerContentScrollView>
    </View>
  );
}

const estilos = theme => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.drawerBackground,
      flex: 1,
    },
    profileContainer: {
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    profileImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    profileText: {
      fontSize: 16,
      padding: 10,
      color: theme.text,
    },
    header: {
      padding: 14,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    headerText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.text,
    }
  })
}
