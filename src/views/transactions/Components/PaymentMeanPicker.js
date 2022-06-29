import React, {useContext, useState} from 'react';
import { Dimensions, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ThemeContext} from '../../../contexts/ThemeContext';
import { accountTypes, voucherTypes } from "../../../util/types";

export default function PaymentMeanPicker({color, paymentMeans, transaction, setTransaction, type, setType}) {
  const {chosenTheme} = useContext(ThemeContext);
  const windowWidth = Dimensions.get('window').width;
  const [paymentMeanTitle, setPaymentMeanTitle] = useState('Escolha o meio de pagamento');
  const [modalVisible, setModalVisible] = useState(false);
  const types = {
    ...accountTypes,
    ...voucherTypes
  };
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

  function updateItem(item) {
    setType(item.type);
    setPaymentMeanTitle(item.title);
    setTransaction(item.id);
    setModalVisible(false);
  }


  function renderItem({item}) {
    return (
      <TouchableOpacity style={estilo.typeContent} onPress={() => updateItem(item)}>
        <View style={estilo.typeIcon}></View>
        {types[item.type].icon && <Icon style={estilo.typeIcon} item={types[item.type]}/>}
        <Text style={estilo.typeTitle}>{item.title}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={estilo.typeContent}>
        {types[type]?.icon && <Icon style={estilo.typeIcon} item={types[type]} />}
        <Text style={estilo.typeTitle}>{paymentMeanTitle}</Text>
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
              data={paymentMeans}
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
      // flex: 1,
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
