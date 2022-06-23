import React, { useContext, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Modal, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from '../../../contexts/ThemeContext';

export default function DayPicker({day, setDay, title, icon}) {
  const {chosenTheme} = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  const estilo = estilos({theme: chosenTheme, windowWidth});
  useState(() => {
    console.log(modalVisible)
  }, [modalVisible])
  console.log(modalVisible)

  function DayTable() {
    var rows = [];
    for (let i = 1; i<= 30; i++) {
      rows.push(<TouchableOpacity onPress={() => chooseDay(i)} style={estilo.day} key={i}><Text style={estilo.dayText}>{i.toString()}</Text></TouchableOpacity>);
    }
    return rows
  }
  function chooseDay(day) {
    setDay(day);
    setModalVisible(false);
  }
  return (
    <>
    <TouchableOpacity onPress={() => setModalVisible(true)} style={estilo.container}>
      {typeof icon != 'undefined' && !! icon && <MaterialCommunityIcons style={estilo.icon} name={icon}/>}
      <View style={estilo.content}>
        {typeof title != 'undefined' && !! title &&
        <Text style={estilo.dayText}>{title}</Text>}
        <Text style={estilo.dayText}>{day.toString()}</Text>
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
            <DayTable />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const estilos = ({theme, windowWidth}) => {
  const modalContentWidth = windowWidth - 40
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
    dayText: {
      padding: 4,
      color: theme.text,
      fontSize: 16,
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
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    day: {
      flexGrow: 1,
      flexShrink: 0,
      flexBasis: '15%',
      backgroundColor: theme.backgroundContainer,
      padding: 8,
      margin: 7,
      borderRadius: 5,
    },
    dayText: {
      textAlign: 'center',
      fontSize: 16,
      color: theme.text,
    }
  })
}
