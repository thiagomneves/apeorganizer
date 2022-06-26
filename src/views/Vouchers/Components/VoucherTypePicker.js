import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Modal, Dimensions } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { ThemeContext } from "../../../contexts/ThemeContext";
import { voucherTypes } from "../../../util/voucherTypes";

export default function VoucherTypePicker({type, setType}) {
  const {chosenTheme} = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(false);
  const typeList = Object.keys(voucherTypes);
  const windowWidth = Dimensions.get('window').width;
  const estilo = estilos({theme: chosenTheme, windowWidth})

  function choseType(item) {
    setType(item);
    setModalVisible(false);
  }

  function Icon(props) {
    const item = props.item;

    switch (item.iconType) { 
    case "MaterialCommunityIcons":
      return <MaterialCommunityIcons name={item.icon} {...props}/>
    case 'MaterialIcons':
      return <MaterialIcons name={item.icon} {...props}/>
    default:
      return false
    }
  }

  function renderItem({item}) {
    return (
      <TouchableOpacity onPress={() => choseType(item)} activeOpacity={1} style={estilo.voucherContent}>
        <Icon style={estilo.typeIcon} item={voucherTypes[item]}/>
        <Text style={estilo.voucherTitle}>{voucherTypes[item].title}</Text>
      </TouchableOpacity>
    );
  }
  return <>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={estilo.typeContent}>
        <Icon style={estilo.typeIcon} item={voucherTypes[type]} />
        <Text style={estilo.typeTitle}>{voucherTypes[type].title}</Text>
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
    typeContent: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    typeTitle: {
      color: theme.text,
      fontSize: 18,
      paddingLeft: 15,
    },
    typeIcon: {
      color: theme.text,
      fontSize: 20,
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
