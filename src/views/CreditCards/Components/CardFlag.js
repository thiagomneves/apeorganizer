import React, { useContext } from 'react';
import {StyleSheet, Text, View} from 'react-native';

import { ThemeContext } from '../../../contexts/ThemeContext';

import MasterCard from '../../../assets/images/mastercard.svg';
import Visa from '../../../assets/images/visa.svg';
import AmericanExpress from '../../../assets/images/amex.svg';
import Elo from '../../../assets/images/elo.svg';
import CreditCard from '../../../assets/images/creditcard.svg';

export default function CardFlag({flag, width}) {
  const newWidth = width ? width : 50;
  const newHeight = (newWidth * 4) / 6;
  const {chosenTheme} = useContext(ThemeContext);
  const estilo = estilos({theme: chosenTheme,width: newWidth, height: newHeight});

  function FlagComponent({flag = 'Outro', width, height}) {

    switch (flag) {
      case 'MasterCard':
        return <MasterCard width={width} height={height} />;
      case 'Visa':
        return <Visa width={width} height={height} />;
      case 'AmericanExpress':
        return <AmericanExpress width={width} height={height} />;
      case 'Elo':
        return <Elo width={width} height={height} />;
      default:
        return <CreditCard width={width} height={height} />;
    }
  }

  return (
    <View style={estilo.flag}>
      <FlagComponent flag={flag} width={newWidth} height={newHeight}/>
    </View>
  );
}

const estilos = ({theme, width, height}) => {
  return StyleSheet.create({
    flag: {
      width: width,
      height: height,
      backgroundColor: theme.flag,
      borderRadius: 5,
    },
  });
};
