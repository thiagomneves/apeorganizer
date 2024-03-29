import React, { useContext, useState } from 'react';
import {Alert, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ColorPicker from 'react-native-wheel-color-picker';
import { ThemeContext } from '../contexts/ThemeContext';

const colors = [
  '#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff',
  '#8B1BD4', '#17C873', '#FFEE02', '#FF7A00', '#5CBC4C', '#FBAF2A', '#0CB598', '#195CB4',
  '#004F9F', '#01339B', '#FFFC04', '#EC7000', '#FF5592', '#303034', '#1C2147', '#01FF5F',
  '#25C5CF', '#1BAEE5', '#0F92FF', '#1374DE', '#F3F3F3', '#FA6300', '#0E0E0E', '#FFD900',
  '#377D63', '#CC0000', '#CD092F', '#F54868', '#161B39', '#CCCCCC',
]

export default function ColorSelector({color, setColor, size = 50, cardTextColor, setCardTextColor, calcColorText, style, children}) {
  const {chosenTheme} = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [advanced, setAdvanced] = useState(false);
  const estilo = estilos({theme: chosenTheme, size, color})


  function changeColor(cardColor) {
    setColor(cardColor)
    calcColorText(cardColor, cardTextColor)
  }

  function renderItem(item, key) {
    const estilo = estilos({theme: chosenTheme, size: 20, color: item, circleMargin: 5});
    return <TouchableOpacity key={key} onPress={() => changeColor(item)} style={[estilo.colorCircle, {backgroundColor: item}]}/>
  }
  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={style ? style : estilo.colorCircle}>
        {children}
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity onPress={() => setModalVisible(false)} activeOpacity={1} style={estilo.modalContainer}>
          <View style={estilo.modalContent}>
            <View style={estilo.colorsContainer}>
            {colors.length && colors.map((index, key) => renderItem(index, key))}
            </View>
            {advanced &&
            <ColorPicker
              color={color}
              swatches={false}
              noSnap={true}
              onColorChange={(color) => changeColor(color)}
            />}
            <View style={estilo.btnContainer}>
              <TouchableOpacity style={estilo.advancedBtn} onPress={() => setAdvanced(!advanced)}>
                <MaterialCommunityIcons style={estilo.advancedIcon} name="palette-advanced"/>
                <Text style={estilo.advancedText}>{!advanced ? 'Avançado' : 'Simples'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={estilo.advancedBtn} onPress={() => setModalVisible(false)}>
                <MaterialCommunityIcons style={estilo.advancedIcon} name="close"/>
                <Text style={estilo.advancedText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const estilos = ({theme, size, color = '#000', circleMargin = 10}) => {
  return StyleSheet.create({
    colorCircle: {
      backgroundColor: color,
      height: size,
      width: size,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: size/2,
      margin: circleMargin,
    },
    modalContainer: {
      backgroundColor: 'rgba(0,0,0,0.3)',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    modalContent: {
      backgroundColor: theme.backgroundContent,
      padding: 15,
      borderRadius: 6,
    },
    colorsContainer: {
      flexDirection: "row",
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    btnContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    advancedBtn: {
      backgroundColor: theme.tooltipBackground,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 8,
      borderRadius: 5,
      alignSelf: 'flex-start',
      marginTop: 20,
    },
    advancedIcon: {
      color: theme.tooltipText,
      fontSize: 16,
      paddingRight: 10,
    },
    advancedText: {
      color: theme.tooltipText,
      fontSize: 16,
    }
  })
}
