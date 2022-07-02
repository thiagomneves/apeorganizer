import React, { useContext } from 'react';
import {StyleSheet, Text, View} from 'react-native';

import { ThemeContext } from '../../contexts/ThemeContext';

import MasterCard from '../../assets/images/mastercard.svg';
import Visa from '../../assets/images/visa.svg';
import AmericanExpress from '../../assets/images/amex.svg';
import Elo from '../../assets/images/elo.svg';
import CreditCard from '../../assets/images/creditcard.svg';

export default function CardFlag({flag = 'Outro', width, noBg = false}) {
  const newWidth = width ? width : 50;
  const newHeight = (newWidth * 4) / 6;
  const {chosenTheme} = useContext(ThemeContext);
  const estilo = estilos({theme: chosenTheme,width: newWidth, height: newHeight, noBg});

  function FlagComponent({flag , width, height, noBg }) {

    switch (flag) {
      case 'MasterCard':
        return <MasterCard width={width} height={height} noBg={noBg}/>;
      case 'Visa':
        return <Visa width={width} height={height} noBg={noBg}/>;
      case 'AmericanExpress':
        return <AmericanExpress width={width} height={height} noBg={noBg}/>;
      case 'Elo':
        return <Elo width={width} height={height} noBg={noBg}/>;
      default:
        return <CreditCard width={width} height={height} noBg={noBg}/>;
    }
  }

  return (
    <View style={estilo.flag}>
      <FlagComponent flag={flag} width={newWidth} height={newHeight} noBg={noBg}/>
    </View>
  );
}

const estilos = ({theme, width, height, noBg}) => {

  return StyleSheet.create({
    flag: {
      width: width,
      height: height,
      backgroundColor: noBg ? false : theme.flag,
      borderRadius: 5,
    },
  });
};
