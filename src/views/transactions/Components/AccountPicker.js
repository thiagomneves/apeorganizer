import React, {useContext, useEffect, useState} from 'react';
import { Dimensions, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ThemeContext} from '../../../contexts/ThemeContext';
import { accountTypes } from "../../../util/types";
import { getAccountsByArchive } from '../../../services/Accounts';
import { calcColorText } from '../../../util/functions';

export default function AccountPicker({type, setType, account, setAccount}) {
  const {chosenTheme} = useContext(ThemeContext);
  const windowWidth = Dimensions.get('window').width;
  const [accountTitle, setAccountTitle] = useState('Selecione a Conta');
  const [accounts, setAccounts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [color, setColor] = useState();
  const types = {
    ...accountTypes
  };
  useEffect(() => {
    showAccounts();
  },[]);
  const estilo = estilos({theme: chosenTheme, windowWidth, color});

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

  async function showAccounts() {
    const newAccounts = await getAccountsByArchive(false);
    setAccounts(newAccounts);
  }

  function updateItem(item) {
    setType(item.type);
    setAccountTitle(item.title);
    setAccount(item.id);
    setColor(item.color);
    setModalVisible(false);
  }

  function renderItem({item}) {
    return (
      <TouchableOpacity style={estilo.typeContent} onPress={() => updateItem(item)}>
        <View style={estilo.typeIcon}></View>
        {types[item.type].icon && (
          <View style={[estilo.typeIconContainer, {backgroundColor: item.color}]}>
            <Icon style={[estilo.typeIcon, {color: calcColorText(item.color, true)}]} item={types[item.type]}/>
          </View>
        )}
        <Text style={estilo.typeTitle}>{item.title}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={estilo.typeContent}>
        {types[type]?.icon && (
          <View style={[estilo.typeIconContainer, {backgroundColor: color}]}>
            <Icon style={[estilo.typeIcon, {color: calcColorText(color, true)}]} item={types[type]} />
          </View>
        )}
        <Text style={estilo.typeTitle}>{accountTitle}</Text>
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
              data={accounts}
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
  const iconSize = 36;
  return StyleSheet.create({
    paymentIcon: {
      backgroundColor: color,
      width: iconSize,
      height: iconSize,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: iconSize / 2,
    },
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
    typeIconContainer: {
      width: iconSize,
      height: iconSize,
      borderRadius: iconSize/2,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
    },
    typeIcon: {
      color: theme.text,
      fontSize: 20,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalContent: {
      position: 'absolute',
      backgroundColor: theme.backgroundContent,
      borderRadius: 6,
      padding: 10,
      width: modalContentWidth,
    },
  });
};
