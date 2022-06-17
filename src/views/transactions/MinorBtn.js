import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../../contexts/ThemeContext';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import { useNavigation } from '@react-navigation/native';

export default function MinorBtn(props) {
  const {chosenTheme} = useContext(ThemeContext);
  const navigation = useNavigation();
  const {color, label, icon, setShowMinorBtn} = {...props};
  const estilo = estilos(chosenTheme);

  const transactionsNavigate = () => {
    setShowMinorBtn(false)
    navigation.navigate(label, {selectedTransaction: {}})
  }

  function Icon(icon) {
    const {lib, name} = {...icon};

    switch (lib) {
      case 'Octicons':
        return <Octicons style={estilo.minorBtnIcon} name={name}/>
      case 'MaterialIcons':
        return <MaterialIcons style={estilo.minorBtnIcon} name={name}/>
      default:
        return false
    }
  }
  
  return (
    <View style={estilo.minorBtnContent}>
      <TouchableOpacity style={estilo.touchable} onPress={transactionsNavigate}>
        <Text style={estilo.minorBtnLabel}>{label}</Text>
        <View style={[estilo.minorBtnIconContainer, {backgroundColor: color}]}>
          <Icon {...icon} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const estilos = theme => {
  return StyleSheet.create({
    minorBtnContent: {
      width: 300,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginBottom: 10,
    },
    minorBtnIconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 40,
      height: 40,
      backgroundColor: '#888',
      borderRadius: 20,
    },
    minorBtnIcon: {
      color: theme.white,
      fontSize: 18,
    },
    minorBtnLabel: {
      backgroundColor: theme.tooltipBackground,
      color: theme.tooltipText,
      padding: 5,
      borderRadius: 8,
      alignSelf: 'center',
      marginRight: 8,
    },
    touchable: {
      flexDirection: 'row'
    }
  })
}
