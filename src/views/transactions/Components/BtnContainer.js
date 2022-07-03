import React, { useContext, useState } from "react";
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from "../../../contexts/ThemeContext";

import MinorBtn from './MinorBtn';
export default function BtnContainer({editorTransferNavigate, showMinorBtn, setShowMinorBtn}) {
  const {chosenTheme} = useContext(ThemeContext);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const estilo = estilos({theme: chosenTheme, showMinorBtn, windowWidth, windowHeight});
  return (
    <TouchableOpacity onPress={() => setShowMinorBtn(false)} activeOpacity={1} style={showMinorBtn ? estilo.btnContainerOpened : estilo.btnContainer}>
      <View style={estilo.btnContent}>
        <View style={estilo.minorBtnContainer}>
          <MinorBtn transactionsNavigate={editorTransferNavigate} label="Transferência" setShowMinorBtn={setShowMinorBtn} color={chosenTheme.purple} icon={{lib: 'Octicons', name: 'arrow-switch'}}/>
          <MinorBtn transactionsNavigate={() => console.log('Receita')} label="Receita" setShowMinorBtn={setShowMinorBtn} color={chosenTheme.green} icon={{lib: 'MaterialIcons', name: 'trending-up'}}/>
          <MinorBtn transactionsNavigate={() => console.log('Despesa')} label="Despesa" setShowMinorBtn={setShowMinorBtn} color={chosenTheme.red} icon={{lib: 'MaterialIcons', name: 'trending-down'}}/>
          <MinorBtn transactionsNavigate={() => console.log('Despesa no Crédito')} label="Despesa no Crédito" setShowMinorBtn={setShowMinorBtn} color={chosenTheme.orange} icon={{lib: 'MaterialCommunityIcons', name: 'credit-card-outline'}}/>
          <MinorBtn transactionsNavigate={() => console.log('Despesa no Voucher')} label="Despesa no Voucher" setShowMinorBtn={setShowMinorBtn} color={chosenTheme.teal} icon={{lib: 'MaterialCommunityIcons', name: 'card-outline'}}/>
        </View>
        <TouchableOpacity onPress={() => setShowMinorBtn(!showMinorBtn)} style={estilo.addBtnContainer}>
          <MaterialIcons style={estilo.addBtnIcon} name={showMinorBtn ? 'close' : 'add'}/>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

const estilos = ({theme, showMinorBtn, windowHeight, windowWidth}) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundContainer,
      flex: 1,
    },
    btnContainer: {
      right: 0,
      bottom: 0,
      position: 'relative',
      flex: 1,
    },
    btnContainerOpened: {
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      position: 'absolute',
      width: windowWidth,
      height: windowHeight,
    },
    btnContent: {
      right: 10,
      bottom: 10,
      position: 'absolute'
    },
    addBtnContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 50,
      height: 50,
      borderRadius: 50,
      backgroundColor: theme.blue,
      alignSelf: 'flex-end',
      backgroundColor: 'green',
    },
    addBtnIcon: {
      color: theme.white,
      fontSize: 22,
    },
    minorBtnContainer: {
      right: 6,
      marginBottom: 10,
      display: showMinorBtn ? 'flex' : 'none',
    },
  })
}
