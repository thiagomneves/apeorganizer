import React, { useContext, useState } from 'react';
import {Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from '../../../contexts/ThemeContext';

export default function MonthYearPicker({icon, title, expirationDate, setExpirationDate}) {
  const {chosenTheme} = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  const [tempYear, setTempYear] = useState(new Date(Date.now()).getFullYear());
  const estilo = estilos({theme: chosenTheme, windowWidth});
  
  function MonthTable() {
    var rows = [];
    for (let i = 1; i<= 12; i++) {
      rows.push(<TouchableOpacity onPress={() => chooseMonth(i)} style={estilo.month} key={i}><Text style={estilo.monthText}>{i.toString()}</Text></TouchableOpacity>);
    }
    return rows
  }
  function chooseMonth(month) {
    setExpirationDate(month.toString().padStart(2, 0) +'/'+ tempYear);
    setTempYear(new Date(Date.now()).getFullYear());
    setModalVisible(false);
  }
  function Header() {
    return <View style={estilo.header}>
      <TouchableOpacity onPress={() => setTempYear(tempYear-1)}>
        <MaterialCommunityIcons style={estilo.headerIcon} name="chevron-left"/>
      </TouchableOpacity>
      <Text style={estilo.headerText}>{tempYear.toString()}</Text>
      <TouchableOpacity onPress={() => setTempYear(tempYear+1)}>
        <MaterialCommunityIcons style={estilo.headerIcon} name="chevron-right"/>
      </TouchableOpacity>
    </View>
  }
  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={estilo.container}>
        {typeof icon != 'undefined' && !! icon && <MaterialCommunityIcons style={estilo.icon} name={icon}/>}
        <View style={estilo.content}>
          {typeof title != 'undefined' && !! title &&
          <Text style={estilo.monthText}>{title}</Text>}
          <Text style={estilo.monthText}>{expirationDate}</Text>
        </View>
      </TouchableOpacity>
      <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(false);
      }}>
        <TouchableOpacity onPress={() => setModalVisible(false)} activeOpacity={1} style={estilo.modalContainer}>
          <View style={estilo.modalContent}>
            <Header />
            <View style={estilo.monthContainer}>
              <MonthTable />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const estilos = ({theme, windowWidth}) => {
  const modalContentWidth = windowWidth - 40;
  const borderRadius = 6;

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    icon: {
      color: theme.text,
      fontSize: 20,
      paddingHorizontal: 5,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 8,
      borderBottomWidth: 1,
      borderColor: theme.border,
    },
    header: {
      backgroundColor: theme.headerBackground,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
    },
    headerText: {
      color: theme.headerTitle,
      padding: 10,
      fontSize: 22,
    },
    headerIcon: {
      color: theme.headerTitle,
      padding: 10,
      fontSize: 32,
    },
    modalHeader: {
      backgroundColor: 'red',
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      backgroundColor: "rgba(0,0,0,0.3)",
    },
    modalContent: {
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    monthContainer: {
      backgroundColor: theme.backgroundContent,
      borderBottomLeftRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
      padding: 10,
      width: modalContentWidth,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    month: {
      flexGrow: 1,
      flexShrink: 0,
      flexBasis: '28%',
      backgroundColor: theme.backgroundContainer,
      padding: 8,
      margin: 7,
      borderRadius: 5,
    },
    monthText: {
      textAlign: 'center',
      fontSize: 16,
      color: theme.text,
      marginRight: 6,
    },
  })
}
