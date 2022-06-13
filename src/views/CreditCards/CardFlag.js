import React from 'react';
import {Image, StyleSheet} from 'react-native';

import MasterCard from '../../assets/images/mastercard.png';
import Visa from '../../assets/images/visa.png';
// import Visa from '../../assets/images/g12.png';

import AmericanExpress from '../../assets/images/amex.png';
// import AmericanExpress from '../../assets/images/g1442.png';
import Elo from '../../assets/images/elo.png';
// import Elo from '../../assets/images/g1479.png';

export default function CardFlag({flag}) {
  const flags = {
    MasterCard: MasterCard,
    Visa,
    AmericanExpress,
    Elo
  };

  return <Image style={estilo.flag} source={flags[flag]} />;
}

const estilo = StyleSheet.create({
  flag: {
    width: '90%',
    height: '80%',
  },
})
