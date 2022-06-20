import React, { useContext } from "react";
import { Dimensions, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemeContext } from "../../../contexts/ThemeContext";
import CardFlag from "./CardFlag";

export default function FlagPicker({setModalVisible, flag}) {
  const {chosenTheme} = useContext(ThemeContext);
  const estilo = estilos({theme: chosenTheme})

  return (
    <TouchableOpacity style={estilo.flagContent} onPress={() => setModalVisible(true)}>
      <CardFlag flag={flag}/>
      <Text style={estilo.flagTitle}>{flag}</Text>
    </TouchableOpacity>
  );
}

export function FlagModal({modalVisible, setModalVisible, setFlag}) {
  const flagList = ["MasterCard", "Visa", "AmericanExpress", "Elo", "Outro"]
  const {chosenTheme} = useContext(ThemeContext);
  const windowWidth = Dimensions.get('window').width;
  const estilo = estilos({theme: chosenTheme, windowWidth})

  function chooseFlag(item) {
    setFlag(item)
    setModalVisible(false)
  }

  function renderItem({item}) {
    return (
      <TouchableOpacity onPress={() => chooseFlag(item)} activeOpacity={1} style={estilo.flagContent}>
        <CardFlag width={40} flag={item}/>
        <Text style={estilo.flagTitle}>{item}</Text>
      </TouchableOpacity>
    )
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <TouchableOpacity onPress={() => setModalVisible(false)} style={estilo.modalContainer} activeOpacity={1}>
        <View style={estilo.modalContent}>
          <FlatList
            data={flagList}
            renderItem={renderItem}
            keyExtractor={(item, key) => key}
          />
        </View>    
      </TouchableOpacity>
    </Modal>
  );
}

const estilos = ({theme, windowWidth}) => {
  const modalContentWidth = windowWidth - 40
  return StyleSheet.create({
    flagContent: {
      backgroundColor: theme.backgroundContent,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 10,
    },
    flagTitle: {
      color: theme.text,
      fontSize: 18,
      paddingLeft: 15,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      backgroundColor: "rgba(0,0,0,0.3)",
    },
    modalContent: {
      position: 'absolute',
      backgroundColor: theme.backgroundContent,
      borderRadius: 6,
      padding: 10,
      width: modalContentWidth,
    }
  })
}
