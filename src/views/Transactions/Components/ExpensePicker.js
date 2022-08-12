import React, {useContext, useEffect, useState} from 'react';
import { Dimensions, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ThemeContext} from '../../../contexts/ThemeContext';
import { accountTypes, voucherTypes } from "../../../util/types";
import { calcColorText } from '../../../util/functions';
import { getAccountsByArchive } from '../../../services/Accounts';
import { getVouchersByArchive } from '../../../services/Vouchers';
import { getCardsByArchive } from '../../../services/Cards';
import CardFlag from '../../../components/shared/CardFlag';

export default function ExpensePicker({type, paymentMean, setPaymentMean}) {
  const {chosenTheme} = useContext(ThemeContext);
  const windowWidth = Dimensions.get('window').width;
  const [paymentMeanTitle, setPaymentMeanTitle] = useState('Selecione ' + (type == 'account' ? 'a conta' : (type == 'voucher' ? 'o voucher' : 'o cartão')));
  const [paymentMeans, setPaymentMeans] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [color, setColor] = useState();
  const [iconType, setIconType] = useState();
  const types = {
    ...accountTypes,
    ...voucherTypes
  };
  useEffect(() => {
    getData();
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

  async function getData() {
    if (type == 'account') {
      let allAccounts = await getAccountsByArchive(false);
      setPaymentMeans(allAccounts);
    } else if (type == 'voucher') {
      let allVouchers = await getVouchersByArchive(false);
      setPaymentMeans(allVouchers);
    } else {
      let allCards = await getCardsByArchive(false);
      setPaymentMeans(allCards);
    }
  }

  function updateItem(item) {
    setPaymentMeanTitle(item.title);
    setPaymentMean(item.id);
    setColor(item.color);
    setModalVisible(false);
    if (type != 'creditcard') {
      setIconType(item.type);
    } else {
      setIconType(item.flag)
    }
  }

  function renderItem({item}) {
    return (
      <TouchableOpacity style={estilo.typeContent} onPress={() => updateItem(item)}>
        <View style={estilo.typeIcon}></View>
        {(type == 'account' || type == 'voucher') && typeof item.type != 'undefined' && types[item.type].icon && (
          <View style={[estilo.typeIconContainer, {backgroundColor: item.color}]}>
            <Icon style={[estilo.typeIcon, {color: calcColorText(item.color, true)}]} item={types[item.type]}/>
          </View>
        )}
        {type == 'creditcard' && typeof item.type != 'undefined' &&
          <CardFlag flag={item.flag} width={40}/>
        }
        <Text style={estilo.typeTitle}>{item.title}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={estilo.typeContent}>
        {(type == 'account' || type == 'voucher') && typeof iconType != 'undefined' && types[iconType]?.icon && (
          <View style={[estilo.typeIconContainer, {backgroundColor: color}]}>
            <Icon style={[estilo.typeIcon, {color: calcColorText(color, true)}]} item={types[iconType]} />
          </View>
        )}
        {type == 'creditcard' && typeof iconType != 'undefined' &&
          <CardFlag flag={iconType} width={46}/>
        }
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
