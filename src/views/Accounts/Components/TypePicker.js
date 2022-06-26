import React, { useContext, useState } from "react";
import { Dimensions, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from "../../../contexts/ThemeContext";
import ColorSelector from "../../../shared/ColorSelector";
import { calcColorText } from "../../../util/functions";
import { accountTypes } from "../../../util/types";

export default function TypePicker({type, setType, color, setColor}) {
  const typeList = Object.keys(accountTypes);
  const {chosenTheme} = useContext(ThemeContext);
  const windowWidth = Dimensions.get('window').width;
  const estilo = estilos({theme: chosenTheme, windowWidth, color})
  const [modalVisible, setModalVisible] = useState(false);

  function chooseType(item) {
    setType(item);
    setModalVisible(false)
  }

  function renderItem({item}) {
    return (
      <TouchableOpacity onPress={() => chooseType(item)} style={estilo.typeContent}>
        {accountTypes[item].icon && <MaterialCommunityIcons style={estilo.typeIcon} name={accountTypes[item].icon}/>}
        <Text style={estilo.typeTitle}>{accountTypes[item].title}</Text>
      </TouchableOpacity>
    )
  }
  
  return (
    <>
      <TouchableOpacity style={estilo.typeContent} onPress={() => setModalVisible(true)}>
        <ColorSelector style={estilo.accountIcon} color={color} setColor={setColor} calcColorText={calcColorText}>
          {accountTypes[type].icon && <MaterialCommunityIcons style={[estilo.typeIcon, {color: calcColorText(color, true)}]} name={accountTypes[type].icon}/>}
        </ColorSelector>
        <Text style={estilo.typeTitle}>{accountTypes[type].title}</Text>
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
  );
}

const estilos = ({theme, windowWidth, color}) => {
  const modalContentWidth = windowWidth - 40;
  const iconSize = 40;
  return StyleSheet.create({
    accountIcon: {
      backgroundColor: color,
      width: iconSize,
      height: iconSize,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: iconSize/2,
    },
    typeContent: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
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
    }
  })
}
