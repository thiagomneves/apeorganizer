import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Modal, Dimensions } from "react-native";

import { ThemeContext } from "../../../contexts/ThemeContext";
import { voucherTypes } from "../../../util/voucherTypes";

export default function VoucherTypePicker({setType}) {
  const {chosenTheme} = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(false);
  const typeList = Object.keys(voucherTypes);
  const windowWidth = Dimensions.get('window').width;
  const estilo = estilos({theme: chosenTheme, windowWidth})

  function choseType(item) {
    setType(item);
    setModalVisible(false);
  }

  function renderItem({item}) {
    return (
      <TouchableOpacity onPress={() => choseType(item)} activeOpacity={1} style={estilo.voucherContent}>
        <Text style={estilo.voucherTitle}>{voucherTypes[item].title}</Text>
      </TouchableOpacity>
    );
  }
  return <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>Click me</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(false);
        }}>
        <TouchableOpacity onPress={() => setModalVisible(false)} style={estilo.modalContainer} activeOpacity={1}>
          <View style={estilo.modalContent}>
            <FlatList
              data={typeList}
              renderItem={renderItem}
              keyExtractor={(item, key) => key}
            />
          </View>    
        </TouchableOpacity>
      </Modal>
    </>
}

const estilos = ({theme, windowWidth}) => {
  const modalContentWidth = windowWidth - 40;
  return StyleSheet.create({
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
    },
    voucherContent: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      padding: 10,
    },
    voucherTitle: {
      color: theme.text,
      fontSize: 18,
      paddingLeft: 15,
    },
  })
}
